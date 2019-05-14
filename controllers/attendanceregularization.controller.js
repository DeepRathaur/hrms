const Joi   =   require('joi');
const { attendance_regularization, Employee, Employee_attendance } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employee_attendance_regularization;

    [err, employee_attendance_regularization] = await to(attendance_regularization.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employee attendance regularization.', employee_attendance_regularization: employee_attendance_regularization.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance_regularization

    [err, employee_attendance_regularization] = await to(attendance_regularization.findAll({
        include: [{ model :Employee, as: 'rmEmpid' , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_attendance_regularization_json = []

    for (let i in employee_attendance_regularization) {
        let details = employee_attendance_regularization[i];
        let info = details.toWeb();
        employee_attendance_regularization_json.push(info);
    }
    return ReS(res, { employee_attendance: employee_attendance_regularization_json });
}

module.exports.getAll = getAll;

const getOne  = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance_regularization
    let empid = parseInt(req.params.empid);
   // let date = (req.params.date);
    [err, employee_attendance_regularization] = await to(attendance_regularization.findAll({
        where:{
            employee_id:empid,
            // swipe_date:date
        },
        include: [{ model :Employee, as: 'rmEmpid' , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_attendance_regularization_json = []

    for (let i in employee_attendance_regularization) {
        let details = employee_attendance_regularization[i];
        let info = details.toWeb();

        employee_attendance_regularization_json.push(info);
    }
    return ReS(res, { employee_attendance_regularization: employee_attendance_regularization_json });
}

module.exports.getOne = getOne;


const getReview  = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance_regularization
    let empid = parseInt(req.params.rmempid);
   // let date = (req.params.date);
    [err, employee_attendance_regularization] = await to(attendance_regularization.findAll({
        where:{
            apply_to:empid,
           // swipe_date:date
        },
        include: [{ model :Employee, attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_attendance_regularization_json = []

    for (let i in employee_attendance_regularization) {
        let details = employee_attendance_regularization[i];
        let info = details.toWeb();

        employee_attendance_regularization_json.push(info);
    }
    return ReS(res, { employee_attendance_regularization: employee_attendance_regularization_json });
}

module.exports.getReview = getReview;

const update = async function (req, res) {
    let err, employee_attendance_regularization, data,ea;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);
    if (data.is_accepted==true && data.is_accepted==1){
        [err, employee_attendance_regularization] = await to(attendance_regularization.findOne({
            where: { id: id }
        }));

        let datatoins   =   {	employee_id:employee_attendance_regularization.employee_id,shift_id:1,swipe_date:employee_attendance_regularization.swipe_date,
            punch_in:employee_attendance_regularization.punch_in,punch_out:employee_attendance_regularization.punch_out};
        [err, ea] = await to(Employee_attendance.create(datatoins));


    }
    [err, employee_attendance_regularization] = await to(attendance_regularization.update(data, {
        where: { id: id }
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The  employee attendance regularization is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated attendance regularization : ' });
};

module.exports.update = update;


const remove = async function (req, res) {
    let employee_attendance_regularization, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employee_attendance_regularization] = await to(attendance_regularization.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employee_attendance_regularization');

    return ReS(res, { message: 'Deleted employee_attendance_regularization' }, 204);

};
module.exports.remove = remove;


const whoIsIn = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_attendance
    let date = req.params.date;
    console.log(date);

    [err, employee_attendance] = await to(Employee_attendance.findAndCountAll({
        where: {
            swipe_date:date
        },
        include: [{ model :Employee , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']},{model:Shift}]
    }));

    if (err) return ReE(res, err, 422)

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
            console.log('ontime');
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


function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        apply_to: Joi.number().integer().required(),
        swipe_date: Joi.optional(),
        punch_in: Joi.optional(),
        punch_out: Joi.optional(),
       reason:Joi.optional()
    };

    return Joi.validate(req, schema);
}