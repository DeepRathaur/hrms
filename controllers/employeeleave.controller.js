const Joi = require('joi');
const {Leave_scheme_leave_type, Leave_grant, Leave_schemes, Employee, Employee_leave, Leavegrant_employee, Leave_type, Weekend_policy} = require('../models');
const {to, ReE, ReS} = require('../services/util.service');

const getOne = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, leave_type, employees, leavegrant, leavegrantemployee, employeeleave
    let empid = parseInt(req.params.empid);
    let leavetypeid = parseInt(req.params.leavetype);

    [err, employees] = await to(Employee.findOne({
        limit: 1,
        where: {
            id: empid
        }
    }));

    if (err) return ReE(res, err, 422)

    let empemployementStatus = employees.employment_status;

    [err, leave_type] = await to(Leave_type.findOne({
        limit: 1,
        where: {
            id: leavetypeid
        },
        include: [{model: Leave_scheme_leave_type, include: [{model: Leave_schemes}]}]
    }));

    if (err) return ReE(res, err, 422);
    //console.log(leave_type.leave_granting_frequency);

    for (let i in leave_type.Leave_scheme_leave_types) {
        let employment_status_id = leave_type.Leave_scheme_leave_types[i].Leave_scheme.employment_status_id;
        // console.log(employment_status_id);
        // console.log(empemployementStatus);
        if (empemployementStatus == employment_status_id) {
            let leaveschemeid = leave_type.Leave_scheme_leave_types[i].leave_schemes_id;
            let d = new Date();
            let year = d.getFullYear();
            let condition ;
            if (leave_type.leave_granting_frequency == 'Annual') {
                condition = {
                    leavescheme_id: leaveschemeid,
                    month:0,
                    year: year
                }
            }else {
                condition = {
                    leavescheme_id: leaveschemeid,
                    month: {
                        $gt:0
                    },
                    year: year
                }
            }
            console.log(condition);
            [err, leavegrant] = await to(Leave_grant.findOne({
                limit: 1,
                order: [['createdAt', 'DESC']],
                where: condition
            }));

            if (err) return ReE(res, err, 422);

            // Check if leave granted to that employee
            [err, leavegrantemployee] = await to(Leavegrant_employee.findOne({
                limit: 1,
                where: {
                    leavegrant_id: leavegrant.id,
                    employee_id: empid
                }
            }));

            if (err) return ReE(res, err, 422);

            if (leavegrantemployee) {
                let leavegrantemployeeid = leavegrantemployee.id;
                console.log(leavegrantemployeeid);
                [err, employeeleave] = await to(Employee_leave.findOne({
                    limit: 1,
                    order: [['createdAt', 'DESC']],
                    where: {
                        leavegrantemployee_id: leavegrantemployeeid,
                        employee_id: empid,
                        leave_type_id: leavetypeid,
                        leave_year: year
                    }
                }));

                if (employeeleave) {
                    return ReS(res, {employeeleave: {balance: employeeleave.leave_balance}});
                } else {
                    return ReE(res, {message: "Leave not granted yet for this employee. Contact to HR."});
                }
            } else {
                if (err) return ReE(res, {message: "Leave not granted yet for this employee. Contact to HR."});
            }
        }
    }
};
module.exports.getOne = getOne;

const employeeLeaveDays = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    let leavetype_id = body.leave_type_id;
    let empid = body.employee_id;
    //console.log(body);
    [err, employees] = await to(Employee.findOne({
        limit: 1,
        where: {
            id: empid
        }
    }));

    if (err) return ReE(res, err, 422)

    let empemployementStatus = employees.employment_status;
    //console.log(empemployementStatus);
    [err, leave_type] = await to(Leave_type.findOne({
        where: {
            id: leavetype_id
        },
        include: [{
            model: Leave_scheme_leave_type,
            include: [{model: Leave_schemes, include: [{model: Weekend_policy}]}]
        }]
    }));

    if (err) return ReE(res, err, 422)

    //console.log(leave_type);
    for (let i in leave_type.Leave_scheme_leave_types) {
        let employment_status_id = leave_type.Leave_scheme_leave_types[i].Leave_scheme.employment_status_id;
        if (empemployementStatus == employment_status_id) {
            leaveschemeid = leave_type.Leave_scheme_leave_types[i].leave_schemes_id;
            let WeekendPolicy = leave_type.Leave_scheme_leave_types[i].Leave_scheme.Weekend_policy.id;
            // Usage
            dates = getDates(new Date(body.leave_from), new Date(body.leave_to));
            let calTotal;
            let diffDays;
            date1 = new Date(body.leave_from);
            date2 = new Date(body.leave_to);
            let timeDiff = Math.abs(date2.getTime() - date1.getTime());
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            dates.forEach(function (date) {

                let d = new Date(date);
                let n = d.getDay();        //Get no of day in a week

                let weekOfmonth = new Date(date).getMonthWeek();

                let working_days = [1, 2, 3, 4, 5];

                // console.log(n);
                if (n == 6) {       // Check if day is saturday
                    let satday = 'saturday_week' + weekOfmonth;
                    let WeekendPolicySatcheck = leave_type.Leave_scheme_leave_types[i].Leave_scheme.Weekend_policy[satday];
                    if (WeekendPolicySatcheck) {
                        working_days.push(6);
                    } else {
                        diffDays = diffDays - 1;
                    }
                }
                if (n == 0) {
                    //console.log(n);
                    diffDays = diffDays - 1;
                    console.log(diffDays);
                }
            });
            if (body.from_session == 2 && body.to_session == 1) {
                letsessionT = 0;
            } else if (body.from_session == body.to_session) {
                letsessionT = 0.5;
            } else if (body.from_session != body.to_session) {
                letsessionT = 1;
            }
            //console.log(letsessionT);
            //console.log(diffDays);
            calTotal = diffDays + letsessionT;
            // console.log(calTotal);
            return ReS(res, {employeeleavedays: calTotal});
        }
    }
};
module.exports.employeeLeaveDays = employeeLeaveDays;

const leaveDeatails = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let err, leave_scheme, employees, leavegrant, leavegrantemployee, employeeleave;

    let empid = parseInt(req.params.empid);
    console.log(empid);
    [err, employees] = await to(Employee.findOne({
        limit: 1,
        where: {
            id: empid
        }
    }));

    if (err) return ReE(res, err, 422);

    let empemployementStatus = employees.employment_status;
    [err, leave_scheme] = await to(Leave_schemes.findOne({
        limit: 1,
        where: {
            employment_status_id: empemployementStatus
        },
        include: [{model: Weekend_policy}]
    }));
    if (err) return ReE(res, err, 422)
    leaveschemeid = leave_scheme.id;

    let d = new Date();
    let year = d.getFullYear();
    let getMonth = d.getMonth() + 1;
    [err, leavegrant] = await to(Leave_grant.findOne({
        limit: 1,
        order: [['createdAt', 'DESC']],
        where: {
            leavescheme_id: leaveschemeid,
            year: year,
            month: getMonth
        }
    }));

    if (err) return ReE(res, err, 422);
    if (!leavegrant) return ReE(res, {message: "No record found"}, 422);
    // Check if leave granted to that employee
    [err, leavegrantemployee] = await to(Leavegrant_employee.findOne({
        limit: 1,
        where: {
            leavegrant_id: leavegrant.id,
            employee_id: empid
        }
    }));

    if (err) return ReE(res, err, 422);
    if (leavegrantemployee) {
        let leavegrantemployeeid = leavegrantemployee.id;

        [err, employeeleave] = await to(Employee_leave.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                leavegrantemployee_id: leavegrantemployeeid,
                employee_id: empid,
                leave_year: year
            },
            include: [{model: Leave_type}]
        }));

        if (employeeleave) {
            let employee_leave_json = []
            for (let i in employeeleave) {
                let details = employeeleave[i];
                let info = details.toWeb();
                employee_leave_json.push(info);
            }
            return ReS(res, {employeeleave: employee_leave_json});
        } else {
            return ReE(res, {employeeleave: {message: "No record found"}});
        }
    }
};
module.exports.leaveDeatails = leaveDeatails;

Date.prototype.getMonthWeek = function () {
    let firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    return Math.ceil((this.getDate() + firstDay) / 7);
};
const getDates = function (startDate, endDate) {
    let dates = [],
        currentDate = startDate,
        addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
};