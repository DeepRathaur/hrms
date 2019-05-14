const Joi = require('joi');
const { Leave_grant, Leave_schemes, Employee, Employee_leave, Leavegrant_employee, Leave_type } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

/*
*@grantfor_employee : 0 for all employee 1 for newly joined employee
*@periodicityType : 0 for monthly and 1 for yearly
*@if grantforemployee == 1 then employee id can not be null and if 0 then it will be null
*/

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    console.log(body);
    let leave_type_ids = body.leave_type_ids;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, leavegrant, leavescheme, employees, leavegrantemployee, employeeleave, leavetypes, lgrants,employeeleavedachk;

    if (body.grantfor_employee == 0) {
        if (leave_type_ids.length > 0) {
            [err, lgrants] = await to(isIdUnique(body));

            if (err) return ReE(res, err, 422);

            if (lgrants) return ReE(res, 'Sorry your leave not granted for this period,contact to HR department.');

            [err, leavescheme] = await to(Leave_schemes.findById(body.leavescheme_id));

            [err, leavegrant] = await to(Leave_grant.create(body));

            if (err) return ReE(res, err, 422);

            [err, employees] = await to(Employee.findAll({
                attributes: ['id'],
                where: {
                    employment_status: leavescheme.employment_status_id
                }
            }));
            for (let i in employees) {
                let data = { leavegrant_id: leavegrant.id, employee_id: employees[i].id };
                [err, leavegrantemployee] = await to(Leavegrant_employee.create(data));
                if (err) return ReE(res, err, 422);
                for (let j in leave_type_ids) {
                    [err, leavetypes] = await to(Leave_type.findById(leave_type_ids[j]));
                   
                    [err, employeeleavedachk] = await to(Employee_leave.findOne({
                        limit: 1,
                        attributes: ['id','leave_balance'],
                        order: [ [ 'createdAt', 'DESC' ]],
                        where: {
                            employee_id: employees[i].id,
                            leave_year:body.year,
                            leave_type_id:leave_type_ids[j]
                        }
                    }));

                    if (employeeleavedachk) {
                         leave_balance =  parseInt(leavetypes.max_leave_for_period) + parseInt(employeeleavedachk.leave_balance);
                    } else {
                         leave_balance =  leavetypes.max_leave_for_period ;
                    }

                    let dataemployeeleave = { leavegrantemployee_id: leavegrantemployee.id,employee_id:employees[i].id, leave_type_id: leave_type_ids[j], leave_year: body.year, leave_month: body.month, leave_credit: leavetypes.max_leave_for_period, leave_balance:leave_balance};
                    
                    [err, employeeleave] = await to(Employee_leave.create(dataemployeeleave));
                    if (err) return ReE(res, err, 422);
                }
            }
            return ReS(res, { message: 'Successfully leave granted to employee.', leavegrant: leavegrant.toWeb() }, 201);
        } else {
            return ReE(res, { message: 'Leave type is mandatory.' });
        }
    } else if (body.grantfor_employee == 1) {

        if (leave_type_ids.length > 0) {
            let lgemployee;
            [err, lgrants] = await to(isIdUnique(body));

            if (err) return ReE(res, err, 422);

            if (lgrants == '' || lgrants == null)  { return ReE(res, 'Sorry your leave not granted for this month,contact to HR department..'); }
            let data = { leavegrant_id: lgrants.id, employee_id: body.employee_id };
            [err, lgemployee] = await to(isEmployeeUnique(data));

            if (err) return ReE(res, err, 422);
            if (lgemployee) return ReE(res, 'Leave already granted to this employee.');

            [err, leavegrantemployee] = await to(Leavegrant_employee.create(data));
            if (err) return ReE(res, err, 422);
            for (let j in leave_type_ids) {
                [err, leavetypes] = await to(Leave_type.findById(leave_type_ids[j]));
                
                [err, employeeleavedachk] = await to(Employee_leave.findOne({
                    limit: 1,
                    attributes: ['id','leave_balance'],
                    order: [ [ 'createdAt', 'DESC' ]],
                    where: {
                        employee_id: body.employee_id,
                        leave_year:body.year,
                        leave_type_id:leave_type_ids[j]
                    }
                }));

                if (employeeleavedachk) {
                     leave_balance =  parseInt(leavetypes.max_leave_for_period) + parseInt(employeeleavedachk.leave_balance);
                } else {
                     leave_balance =  leavetypes.max_leave_for_period ;
                }

                let dataemployeeleave = { leavegrantemployee_id: leavegrantemployee.id,employee_id:body.employee_id ,leave_type_id: leave_type_ids[j], leave_year: body.year, leave_month: body.month, leave_credit: leavetypes.max_leave_for_period, leave_balance: leave_balance };
                [err, employeeleave] = await to(Employee_leave.create(dataemployeeleave));
                if (err) return ReE(res, err, 422);
            }
            return ReS(res, { message: 'Successfully leave granted to this employee.', leavegrantemployee: leavegrantemployee.toWeb() }, 201);
        } else {
            return ReE(res, { message: 'Leave type is mandatory.' });
        }
    }
};

module.exports.create = create;



Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function () {
    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
    return this.getMonthName().substr(0, 3);
};


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    let dateObj = new Date();
    let year = dateObj.getUTCFullYear();

    let err, leavegrant, leavegrantemployee

    [err, leavegrant] = await to(Leave_grant.findAll({
        where: {
            year: year
        },
        include: [{ model: Leave_schemes }]
    }));

    if (err) return ReE(res, err, 422)

    let leavegrant_json = []

    for (let i in leavegrant) {
        let details = leavegrant[i];

        [err, leavegrantemployee] = await to(Leavegrant_employee.findAndCountAll({
            where: {
                leavegrant_id: details.id
            }
        }));

        let monthId =  details.month - 1 ;
        let month = monthNames[monthId];
        //console.log(month);

        let info = details.toWeb();
        info.headCount = leavegrantemployee.count;
        info.grantedOn = info.createdAt.getFullYear() + '-' +
            (info.createdAt.getMonth() < 9 ? '0' : '') +
            (info.createdAt.getMonth() + 1) + '-' + info.createdAt.getDate();
        leavegrant_json.push(info);
        d = new Date(info.createdAt);
        if (info.month != 0) {
            info.frequency = 'Monthly';
            info.monthName = month;//d.getMonthName();
            info.period = month + '  - ' + details.year;
        } else {
            info.frequency = 'Annual';
            info.monthName = '';//d.getMonthName();
            info.period = 'For - ' +details.year;
        }
        //console.log(info);
    }
    return ReS(res, { leavegrant: leavegrant_json });
};

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, leaveapplications, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, leaveapplications] = await to(Leave_application.update(data, {
        where: { id: id }
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of leaveapplication is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated leaveapplication : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let leavegrant, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, leavegrant] = await to(Leave_grant.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete leave grant');

    return ReS(res, { message: 'Deleted leave grant' }, 204);

};
module.exports.remove = remove;

let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];
const period = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let dateObj = new Date();
    let year = dateObj.getUTCFullYear();
    let period = [];
    for (let i = 0; i <= 11; i++) {
        let body = { startMonth: i + 1, startYear: year, description: monthNames[i] + ' - ' + year };
        period.push(body);
    }
    return ReS(res, { period: period });
};
module.exports.period = period;

function validate(req) {
    const schema = {
        grantfor_employee: Joi.number().integer(),
        periodicityType: Joi.number().integer(),
        leavescheme_id: Joi.optional(),
        month: Joi.optional(),
        year: Joi.optional(),
        leave_type_ids: Joi.optional(),
        employee_id: Joi.optional()
    };

    return Joi.validate(req, schema);
}
/* Check unique leave grant  */
const isIdUnique = async (req, res) => {
    let condition
    if (req.periodicityType == 0) {
        condition = {
            leavescheme_id: req.leavescheme_id,
            year: req.year,
            month: req.month
        }
    } else {
        condition = {
            leavescheme_id: req.leavescheme_id,
            year: req.year,
            month:0
        }
    }
    let err, lgrants;
    
    [err, lgrants] = await to(Leave_grant.findOne({
        where: condition
    }));

    if (err) return ReE(res, err, 422);
    //console.log(lgrants);
    return lgrants;
};
/* Check employee id in leave grant employee */
const isEmployeeUnique = async (req, res) => {
    let err, leavegrantemployee;
    [err, leavegrantemployee] = await to(Leavegrant_employee.findOne({
        where: {
            leavegrant_id: req.leavegrant_id,
            employee_id: req.employee_id
        }
    }));

    if (err) return ReE(res, err, 422);

    return leavegrantemployee;
};