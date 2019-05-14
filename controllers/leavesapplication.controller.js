const Joi = require('joi');
const {Leave_application, Employee, Employee_leave, Leavegrant_employee, Leave_type} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');
const sequelize = require('sequelize');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    console.log(body);
    const {error} = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, leaveapplication, leavegrantemployee, eployeeleave, leaveapplicationcheck;

    [err, leaveapplicationcheck] = await to(Leave_application.findAndCountAll({
        where: {
            leave_from: {
                $lte: body.leave_from
            },
            leave_to: {
                $gte: body.leave_to,
            },
            employee_id: body.employee_id,
            is_withdraw:false,
            status:true
        }
    }));

    if (err) return ReE(res, err, 422);

    if (leaveapplicationcheck.count > 0) {
        return ReE(res, {message: 'You have already applied on the same date.'});
    } else {
        [err, leavegrantemployee] = await to(Leavegrant_employee.findAndCountAll({
            where: {
                employee_id: body.employee_id
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: Employee_leave, where: {
                    leave_type_id: body.leave_type_id
                }
            }]
        }));

        if (err) return ReE(res, err, 422);

        if (leavegrantemployee.count > 0) {
            let data = leavegrantemployee.rows;
            for (let i in data) {
                let details = data[i];
                let Empl = details.Employee_leaves;
                if (Empl != '') {
                    for (let j in Empl) {
                        let empinfo = Empl[j];
                        console.log(empinfo.leave_balance);
                        if (empinfo.leave_balance >= body.total_leave_days) {
                            if (empinfo.leave_credit >= body.total_leave_days) {
                                body.employee_leave_id = empinfo.id;
                                [err, leaveapplication] = await to(Leave_application.create(body));

                                if (err) return ReE(res, err, 422);

                                let totalremleavebalance = empinfo.leave_balance - body.total_leave_days;
                                console.log(totalremleavebalance);
                                let totalremleaveavailed = (parseFloat(empinfo.leave_availed) + parseFloat(body.total_leave_days));
                                console.log(totalremleaveavailed);
                                let dataempl = {
                                    leave_balance: totalremleavebalance,
                                    leave_availed: totalremleaveavailed
                                };
                                console.log(dataempl);
                                [err, eployeeleave] = await to(Employee_leave.update(dataempl, {
                                    where: {id: empinfo.id}
                                }));

                                if (err) return ReE(res, err, 422);

                                return ReS(res, {
                                    message: 'Successfully created new leaveapplication.',
                                    leaveapplication: leaveapplication.toWeb()
                                }, 201);

                            } else {
                                return ReE(res, {message: 'Sorry your credit leave is smaller then you have applied.'});
                            }
                        } else {
                            return ReE(res, {message: 'Sorry your leave balance is smaller then you have applied.'});
                        }
                    }
                }
            }
        } else {
            return ReE(res, {message: 'Sorry your leave not granted yet,contact to HR department.'});
        }


    }
    console.log(leaveapplicationcheck.count);


    /*  */

};

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveapplication

    [err, leaveapplication] = await to(Leave_application.findAll({}));

    if (err) return ReE(res, err, 422)

    let leaveapplication_json = []

    for (let i in leaveapplication) {
        let details = leaveapplication[i];
        let info = details.toWeb();
        leaveapplication_json.push(info);
    }
    return ReS(res, {leaveapplication: leaveapplication_json});
};

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveapplication
    let empid = parseInt(req.params.empid);

    [err, leaveapplication] = await to(Leave_application.findAll({
        where: {
            employee_id: empid
        },
        include: {model: Leave_type}
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in leaveapplication) {
        let details = leaveapplication[i];
        let info = details.toWeb();
        employee_json.push(info);
    }


    return ReS(res, {leaveapplication: employee_json});
};

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, leaveapplications, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const {error} = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, leaveapplications] = await to(Leave_application.update(data, {
        where: {id: id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of leaveapplication is already exist';
        return ReE(res, err);
    }
    return ReS(res, {message: 'Updated leaveapplication : '});

};

module.exports.update = update;


const remove = async function (req, res) {
    let leaveapplications, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, leaveapplications] = await to(Leave_application.destroy({
        where: {id: id}
    }));

    if (err) return ReE(res, 'error occured trying to delete leaveapplication');

    return ReS(res, {message: 'Deleted leaveapplication'}, 204);

};
module.exports.remove = remove;

/**
 * @Track Leave
 * @ rm id  Reporting Manager ID
 */
const trackLeave = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveapplication
    let empid = parseInt(req.params.empid);
    [err, leaveapplication] = await to(Leave_application.findAll({
        where: {
            employee_id: empid,
            status: true
        },
        include: [{model: Leave_type}, {
            model: Employee,
            as: 'EmployeeId',
            attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']
        }]
    }));

    if (err) return ReE(res, err, 422)

    let leaveapplication_json = []

    for (let i in leaveapplication) {
        let details = leaveapplication[i];
        let info = details.toWeb();
        leaveapplication_json.push(info);
    }
    return ReS(res, {leaveapplication: leaveapplication_json});
};

module.exports.trackLeave = trackLeave;

const leaveWithdraw = async (req, res) => {
    let err, leaveapplication, leaveapplications, data, employeeleave;
    let id = parseInt(req.params.id);
    data = req.body;
    const {error} = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, leaveapplication] = await to(Leave_application.findById(id));
    if (err) return ReE(res, {error: 'No record found'});

    if (leaveapplication.is_approved) {
        return ReE(res, {error: 'The leave has been approved.You can not withdraw your leave either you cancel  leave or contact to Reporting manager.'});
    }

    let employeeLeaveId = leaveapplication.employee_leave_id;

    [err, employeeleave] = await to(Employee_leave.findById(employeeLeaveId));

    if (employeeleave.leave_availed > 0) {
        let leaveBalance = parseFloat(employeeleave.leave_balance) + parseFloat(leaveapplication.total_leave_days);
        let leaveAvailed = parseFloat(employeeleave.leave_availed) - parseFloat(leaveapplication.total_leave_days);

        let dataemployeeleave = {leave_balance: leaveBalance, leave_availed: leaveAvailed};

        [err, employeeleave] = await to(Employee_leave.update(dataemployeeleave, {
            where: {id: employeeLeaveId}
        }));


        [err, leaveapplications] = await to(Leave_application.update(data, {
            where: {id: id}
        }));

        if (err) {
            if (err.message == 'Validation error') err = 'Leaveapplication facing some problem.';
            return ReE(res, err);
        }
        return ReS(res, {message: 'You have successfully withdraw your leave'});
    } else {
        return ReE(res, {error: 'You did not availed any type of leave'});
    }
};
module.exports.leaveWithdraw = leaveWithdraw;


const cancelLeave = async (req, res) => {
    let err, leaveapplications, data, leaveapplication;
    let id = parseInt(req.params.id);
    data = req.body;
    const {error} = (data);
    data.is_cancelled = 1;

    if (error) return ReE(res, error.details[0].message);

    [err, leaveapplication] = await to(Leave_application.findOne({
        where: {
            id: id
        }
    }));
    if (err) return ReE(res, {error: 'No record found'});

    if (leaveapplication.is_cancelled) {
        return ReE(res, {error: 'Leave application already cancelled by you.'});
    }

    [err, leaveapplications] = await to(Leave_application.update(data, {
        where: {id: id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'Leave application facing some problem.';
        return ReE(res, err);
    }
    return ReS(res, {message: 'You have successfully requested to cancel leave.'});
};
module.exports.cancelLeave = cancelLeave;

const RmcancelLeave = async (req, res) => {
    let err, leaveapplication, leaveapplications, data, employeeleave;
    let id = parseInt(req.params.id);
    data = req.body;
    const {error} = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, leaveapplication] = await to(Leave_application.findById(id));
    if (err) return ReE(res, {error: 'No record found'});

    if (leaveapplication.is_cancelled) {
        let employeeLeaveId = leaveapplication.employee_leave_id;

        [err, employeeleave] = await to(Employee_leave.findById(employeeLeaveId));

        if (employeeleave.leave_availed > 0) {
            let leaveBalance = parseFloat(employeeleave.leave_balance) + parseFloat(leaveapplication.total_leave_days);
            let leaveAvailed = parseFloat(employeeleave.leave_availed) - parseFloat(leaveapplication.total_leave_days);

            let dataemployeeleave = {leave_balance: leaveBalance, leave_availed: leaveAvailed};

            [err, employeeleave] = await to(Employee_leave.update(dataemployeeleave, {
                where: {id: employeeLeaveId}
            }));

            data.status = 0;
            data.is_approved = 0;
            [err, leaveapplications] = await to(Leave_application.update(data, {
                where: {id: id}
            }));

            if (err) {
                if (err.message == 'Validation error') err = 'Leaveapplication facing some problem.';
                return ReE(res, err);
            }
            return ReS(res, {message: 'You successfully canclled leave'});
        } else {
            return ReE(res, {error: 'You did not availed any type of leave'});
        }
    } else {
        return ReE(res, {error: 'You can not cancel.'});
    }
};
module.exports.RmcancelLeave = RmcancelLeave;

const reviewLeave = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveapplication;
    let empid = parseInt(req.params.rmid);
    [err, leaveapplication] = await to(Leave_application.findAll({
        where: {
            apply_to: empid,
            status: true
        },
        include: [{model: Leave_type}, {
            model: Employee,
            as: 'EmployeeId',
            attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']
        }]
    }));

    if (err) return ReE(res, err, 422)

    let leaveapplication_json = []

    for (let i in leaveapplication) {
        let details = leaveapplication[i];
        let info = details.toWeb();
        leaveapplication_json.push(info);
    }
    return ReS(res, {leaveapplication: leaveapplication_json});
};
module.exports.reviewLeave = reviewLeave;

const LeaveAccept = async (req, res) => {
    let err, leaveapplication, leaveapplications, data, employeeleave;
    let id = parseInt(req.params.id);
    data = req.body;
    const {error} = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, leaveapplication] = await to(Leave_application.findById(id));
    if (err) return ReE(res, {error: 'No record found'});

    let employeeLeaveId = leaveapplication.employee_leave_id;
    [err, employeeleave] = await to(Employee_leave.findById(employeeLeaveId));

    if (data.is_approved) {
        if (leaveapplication.is_rejected) {
            return ReE(res, {error: 'You already rejected this leave, need to reapply leave application.'});
        }
        [err, leaveapplications] = await to(Leave_application.update(data, {
            where: {id: id}
        }));

        if (err) {
            if (err.message == 'Validation error') err = 'Leaveapplication facing some problem.';
            return ReE(res, err);
        }
        return ReS(res, {message: 'Successfully approved leave application.'});
    } else if (data.is_rejected) {
        if (employeeleave.leave_availed > 0) {
            let leaveBalance = parseFloat(employeeleave.leave_balance) + parseFloat(leaveapplication.total_leave_days);
            let leaveAvailed = parseFloat(employeeleave.leave_availed) - parseFloat(leaveapplication.total_leave_days);

            let dataemployeeleave = {leave_balance: leaveBalance, leave_availed: leaveAvailed};

            [err, employeeleave] = await to(Employee_leave.update(dataemployeeleave, {
                where: {id: employeeLeaveId}
            }));

            data.status = 0;
            [err, leaveapplications] = await to(Leave_application.update(data, {
                where: {id: id}
            }));

            if (err) {
                if (err.message == 'Validation error') err = 'Leaveapplication facing some problem.';
                return ReE(res, err);
            }
            return ReS(res, {message: 'Successfully rejected leave application.'});
        } else {
            return ReE(res, {error: 'You did not availed any type of leave.'});
        }
    } else {
        return ReE(res, {error: 'You need to approved or rejected the leave application.'});
    }
};
module.exports.LeaveAccept = LeaveAccept;

const leaveCalender = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveapplication
    let month = parseInt(req.params.month);
    let year = parseInt(req.params.year);
    if (month == '' && year == '') {
        return ReE(res, {message: 'Please select month and year.'},)
    }
    [err, leaveapplication] = await to(Leave_application.findAndCountAll({
        include: [{model: Leave_type}, {
            model: Employee,
            as: 'EmployeeId',
            attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']
        }],
        where: sequelize.and(sequelize.where(sequelize.fn('YEAR', sequelize.col('leave_from')), year),
            sequelize.where(sequelize.fn('MONTH', sequelize.col('leave_from')), month))
    }));
    // [err, leaveapplication] = await to(Leave_application.findAndCountAll({
    //     attributes: [
    //         [sequelize.fn('YEAR', sequelize.col('leave_from')), 'year_val'],
    //         [sequelize.fn('MONTH', sequelize.col('leave_from')), 'month_val'],
    //         [sequelize.fn('COUNT', sequelize.col('id')), 'total']
    //     ],
    //     where: sequelize.and(sequelize.where(sequelize.fn('YEAR', sequelize.col('leave_from')), year),
    //         sequelize.where(sequelize.fn('MONTH', sequelize.col('leave_from')), month)),
    //     group: [sequelize.fn('YEAR', sequelize.col('leave_from')), sequelize.fn('MONTH', sequelize.col('leave_from'))]
    // }));

    if (err) return ReE(res, err, 422)

    let leaveapplication_json = []

    for (let i in leaveapplication.rows) {
        let details = leaveapplication.rows[i];
        let info = details.toWeb();

        info.monthName = monthNames(info.month_val);
        leaveapplication_json.push(info);
    }
    return ReS(res, {totalemployeeonleave: leaveapplication_json});

};
module.exports.leaveCalender = leaveCalender;

const leaveCalenderByRm = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveapplication
    let employeeid = parseInt(req.params.empid);
    let month = parseInt(req.params.month);
    let year = parseInt(req.params.year);
    if (month == '' && year == '') {
        return ReE(res, {message: 'Please select month and year.'},)
    }
    [err, leaveapplication] = await to(Leave_application.findAndCountAll({
        include: [{model: Leave_type}, {
            model: Employee,
            as: 'EmployeeId',
            attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']
        }],
        where: sequelize.and(sequelize.where(sequelize.fn('YEAR', sequelize.col('leave_from')), year),
            sequelize.where(sequelize.fn('MONTH', sequelize.col('leave_from')), month),
            sequelize.where(sequelize.col('apply_to'), employeeid)),
    }));
    // [err, leaveapplication] = await to(Leave_application.findAndCountAll({
    //     attributes: [
    //         [sequelize.fn('YEAR', sequelize.col('leave_from')), 'year_val'],
    //         [sequelize.fn('MONTH', sequelize.col('leave_from')), 'month_val'],
    //         [sequelize.fn('COUNT', sequelize.col('id')), 'total']
    //     ],
    //     where: sequelize.and(sequelize.where(sequelize.fn('YEAR', sequelize.col('leave_from')), year),
    //         sequelize.where(sequelize.fn('MONTH', sequelize.col('leave_from')), month)),
    //     group: [sequelize.fn('YEAR', sequelize.col('leave_from')), sequelize.fn('MONTH', sequelize.col('leave_from'))]
    // }));

    if (err) return ReE(res, err, 422)

    let leaveapplication_json = []

    for (let i in leaveapplication.rows) {
        let details = leaveapplication.rows[i];
        let info = details.toWeb();

        info.monthName = monthNames(info.month_val);
        leaveapplication_json.push(info);
    }
    return ReS(res, {totalemployeeonleave: leaveapplication_json});

};
module.exports.leaveCalenderByRm = leaveCalenderByRm;


const leaveCalenderDatewise = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveapplication
    let date = (req.params.date);

    [err, leaveapplication] = await to(Leave_application.findAndCountAll({
        include: [{model: Leave_type}, {
            model: Employee,
            as: 'EmployeeId',
            attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']
        }],
        where: {
            leave_from: {
                $lte: date
            },
            leave_to: {
                $gte: date,
            },
        }
    }));

    if (err) return ReE(res, err, 422)

    let leaveapplication_json = []

    for (let i in leaveapplication.rows) {
        let details = leaveapplication.rows[i];
        let info = details.toWeb();
        leaveapplication_json.push(info);
    }
    return ReS(res, {leaveapplication: leaveapplication_json, total: leaveapplication.count});
};
module.exports.leaveCalenderDatewise = leaveCalenderDatewise;


function validate(req) {
    const schema = {
        employee_id: Joi.number().integer(),
        apply_to: Joi.number().integer(),
        apply_date: Joi.string(),
        leave_type_id: Joi.number().integer(),
        emergency_address: Joi.optional(),
        leave_from: Joi.optional(),
        leave_to: Joi.optional(),
        total_leave_days: Joi.number(),
        reason: Joi.optional(),
        approved_by: Joi.optional(),
        edited_by: Joi.optional(),
        status: Joi.optional(),
    };

    return Joi.validate(req, schema);
}

let allMonth = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

function monthNames(req) {
    let monthint = req - 1;
    return allMonth[monthint];
};