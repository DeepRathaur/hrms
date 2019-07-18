const Joi   =   require('joi');
const { Employee_attendance, Employee, Shift, Employment_status, Leave_application, Holiday_list } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const sequelize = require('sequelize');
const json2xls = require('json2xls');
const path                      = require('path');
const fs                        = require('fs');
const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body; 
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employee_attendance;

    [err, employee_attendance] = await to(Employee_attendance.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employee_attendance.', employee_attendance: employee_attendance.toWeb() }, 201);

};

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance

    [err, employee_attendance] = await to(Employee_attendance.findAll({
        include: [{ model :Employee , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']},{model:Shift}]  
    }));

    if (err) return ReE(res, err, 422)

    let employee_attendance_json = []

    for (let i in employee_attendance) {
        let details = employee_attendance[i];
        let info = details.toWeb();
        employee_attendance_json.push(info);
    }
    return ReS(res, { employee_attendance: employee_attendance_json });
};

module.exports.getAll = getAll;

const getOne  = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance;
    let empid = parseInt(req.params.empid);
    let date = (req.params.date);
    [err, employee_attendance] = await to(Employee_attendance.findAll({
        where:{
            employee_id:empid,
            swipe_date:date
        },
        include: [{ model :Employee , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name'] ,include:[{model:Employment_status}]},{model:Shift}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_attendance_json = []

    for (let i in employee_attendance) {
        let details = employee_attendance[i];
        let info = details.toWeb();
       
        employee_attendance_json.push(info);
    }
    return ReS(res, { employee_attendance: employee_attendance_json });
};

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employee_attendances, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employee_attendances] = await to(Employee_attendance.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employee_attendance is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employee_attendance : ' });

};

module.exports.update = update;


const remove = async function (req, res) {
    let employee_attendances, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employee_attendances] = await to(Employee_attendance.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employee_attendance');

    return ReS(res, { message: 'Deleted employee_attendance' }, 204);

}
module.exports.remove = remove;


const whoIsIn = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance;
    let date = req.params.date;
    //console.log(date);

    [err, employee_attendance] = await to(Employee_attendance.findAndCountAll({
        where: {
          swipe_date:date
        },
        include: [{ model :Employee , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']},{model:Shift}]  
    }));

    if (err) return ReE(res, err, 422);

    let employee_attendance_json = [];
    let employee_attendance_ontime = [];
    let employee_attendance_latein = [];

    for (let i in employee_attendance.rows) {
        let details = employee_attendance.rows[i];
        let start_time  = details.Shift.start_time ;
        let punchintime = new Date(details.punch_in);
        let hour  = punchintime.getHours();
        let minute  = punchintime.getMinutes();
        let inTime =    hour+':'+minute ;
        let info = details.toWeb();
        if (start_time >= inTime) {
            //console.log('ontime');
            employee_attendance_ontime.push(info);
        } else {
            employee_attendance_latein.push(info);
        }
        employee_attendance_json.push(info);
    }
    let totalLateIn     =   employee_attendance_latein.length;
    let totalOnTime     =   employee_attendance_ontime.length;

    return ReS(res, { employee_attendance: employee_attendance_json, employee_ontime:employee_attendance_ontime,
        employee_latein:employee_attendance_latein ,totalWhoIsIn:employee_attendance.count,totalLateIn:totalLateIn,
        totalOnTime:totalOnTime});
}

module.exports.whoIsIn = whoIsIn;

const getEmpAttendanceByMonthByempId  = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance, chkemp, chkholiday;
    let employeeid = parseInt(req.params.empid);
    let month = (req.params.month);
    let year =  parseInt(req.params.year);

    let digit_countMonth =  Math.floor(Math.log(month) / Math.LN10 + 1);
    if (digit_countMonth == 1){
        month = '0'+month ;
    }

    [err, employee_attendance] = await to(Employee_attendance.findAll({
        // include: [{ model :Employee , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name'] ,include:[{model:Employment_status}]},{model:Shift}],
        where: sequelize.and(sequelize.where(sequelize.fn('YEAR', sequelize.col('swipe_date')), year),
            sequelize.where(sequelize.fn('MONTH', sequelize.col('swipe_date')), month),
            sequelize.where(sequelize.col('employee_id'), employeeid))
    }));



    if (err) return ReE(res, err, 422);

    if (employee_attendance.length>0) {

    let totalDays = daysInMonth(month,year);

    let data_json = [] ;
    for (let j = 1; j < totalDays+1; j++) {
        let day = j ;
        let digit_count =  Math.floor(Math.log(j) / Math.LN10 + 1);
        if (digit_count == 1){
            day = '0'+j ;
        }



        let string      =     year+'-'+month+'-'+day   ;
        let reqparam    =     {employee_id:employeeid,date:string} ;
        let d = new Date(string);
        let n = d.getDay();        //Get no of day in a week

        [err, chkemp] = await to (checkEmployeeisIn(reqparam));
        if (err) return ReE(res, err, 422);
        [err, chkempleave] = await to (checkEmployeeisInLeave(reqparam));
        if (err) return ReE(res, err, 422);
        [err, chkholiday] = await to (checkHoliday(reqparam));
        if (err) return ReE(res, err, 422);
        var holiday ='';
        if (chkholiday) {
            holiday = 'H'
        }
        if (!chkemp) {
            let rearrdata ;
            if (n==0 && chkempleave ==0 && holiday == '') {             // 0 is sunday 6 is saturday
                 rearrdata = {start:string,title:'WO'} ;
            } else if (n > 0 && chkempleave > 0 && holiday == ''){
                 rearrdata = {start:string,title:'L'} ;
            } else if (n > 0 && chkempleave == 0 && holiday != ''){
                 rearrdata = {start:string,title:'H'} ;
            } else {
                 rearrdata = {start:string,title:'A'} ;
            }
            data_json.push(rearrdata);
        } else {
            let rearrdata = {start:string,title:'P'} ;
            data_json.push(rearrdata);
        }
    }
    return ReS(res, { employee_attendance: data_json });
    } else{
        ReE(res, {message:'record not found'}, 200);
    }
};

module.exports.getEmpAttendanceByMonthByempId = getEmpAttendanceByMonthByempId;



const getEmpAttendanceByMonth  = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance, chkemp, chkholiday, employee;
    let month = (req.params.month);
    let year =  parseInt(req.params.year);

    [err, employee_attendance] = await to(Employee_attendance.findAll({
         //include: [{ model :Employee , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}],
        where: sequelize.and(sequelize.where(sequelize.fn('YEAR', sequelize.col('swipe_date')), year),
            sequelize.where(sequelize.fn('MONTH', sequelize.col('swipe_date')), month))
    }));

    if (err) return ReE(res, err, 422);

    if (employee_attendance.length>0) {
        empIds = [];
        for (let {employee_id: id, ...rest} of employee_attendance)  {
            empIds.push(id);
        }
        const uniqueValues = [...new Set(empIds)];
        let emparray = [];
        for (k=0 ; k<uniqueValues.length;k++){
            let employeeID = uniqueValues[k];

            [err, employee] = await to(Employee.findOne({
                attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name'],
                where: {
                    id:employeeID
                }
            }));

            let totalDays = daysInMonth(month,year);
            let data_json = [] ;
            for (let j = 1; j < totalDays+1; j++) {
                let day = j ;
                let digit_count =  Math.floor(Math.log(j) / Math.LN10 + 1);
                if (digit_count == 1){
                    day = '0'+j ;
                }
                let string      =     year+'-'+month+'-'+day   ;
                let reqparam    =     {employee_id:employeeID,date:string} ;
                let d = new Date(string);
                let n = d.getDay();        //Get no of day in a week

                [err, chkemp] = await to (checkEmployeeisIn(reqparam));
                if (err) return ReE(res, err, 422);
                [err, chkempleave] = await to (checkEmployeeisInLeave(reqparam));
                if (err) return ReE(res, err, 422);
                [err, chkholiday] = await to (checkHoliday(reqparam));
                if (err) return ReE(res, err, 422);
                var holiday ='';
                if (chkholiday) {
                    holiday = 'H'
                }
                if (!chkemp) {
                    let rearrdata ;
                    if (n==0 && chkempleave ==0 && holiday == '') {             // 0 is sunday 6 is saturday
                        rearrdata = {start:string,title:'WO'} ;
                    } else if (n > 0 && chkempleave > 0 && holiday == ''){
                        rearrdata = {start:string,title:'L'} ;
                    } else if (n > 0 && chkempleave == 0 && holiday != ''){
                        rearrdata = {start:string,title:'H'} ;
                    } else {
                        rearrdata = {start:string,title:'A'} ;
                    }
                    data_json.push(rearrdata);
                } else {
                    let rearrdata = {start:string,title:'P'} ;
                    data_json.push(rearrdata);
                }
            }

            let darray  =   {employee_id:employeeID,empployee_name:employee.first_name,attendance:data_json};
            emparray.push(darray);
        }
        return ReS(res, { employee_attendance: emparray });
    } else{
        ReE(res, {message:'record not found'}, 200);
    }
};

module.exports.getEmpAttendanceByMonth = getEmpAttendanceByMonth;



function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        shift_id: Joi.number().integer().required(),
        swipe_date: Joi.optional(),
        punch_in: Joi.optional(),
        punch_out: Joi.optional(),
        door: Joi.optional(),
        late: Joi.optional(),
        early_leaving: Joi.optional(),
        overtime: Joi.optional(),
        lattitude: Joi.optional(),
        longitude: Joi.optional(),
        image: Joi.optional()
    };

    return Joi.validate(req, schema);
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

const checkEmployeeisIn =   async (req,res) => {
    let err, employeeattendance;
    [err, employeeattendance] = await to(Employee_attendance.findOne({
        where: {
            employee_id:req.employee_id,
            swipe_date:req.date
        }
    }));
    return employeeattendance ;
};

const checkEmployeeisInLeave =   async (req,res) => {
    let err, leaveapplicationcheck;
    [err, leaveapplicationcheck] = await to(Leave_application.findAndCountAll({
        where: {
            leave_from: {
                $lte: req.date
            },
            leave_to: {
                $gte: req.date
            },
            employee_id: req.employee_id,
            is_approved:true,
            status:true
        }
    }));

    if (err) return ReE(res, err, 422);
    return leaveapplicationcheck.count ;
};

const checkHoliday =   async (req,res) => {
    let err, holiday;
    [err, holiday] = await to(Holiday_list.findOne({
        where: {
            holiday_date:req.date
        }
    }));
    return holiday ;
};
