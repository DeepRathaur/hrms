const Joi = require('joi');
const { Employee, Users, Employment_status, Designation, Nationality, Religion, Employee_access_card, Employee_address, Employee_attendance, Employee_asset,
    Employee_background, Employee_bank, Employee_document, Employee_family, employee_generated_letter, employee_idenity, employee_nominee, employee_pf,
    employee_position, Employee_prev_employment, Employee_probation, Eloyee_qualification, Employee_resignation, organization_tree,Scheme } = require('../models');


const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;
    const { error } = validate(body);
    body.name = body.first_name;

    if (error) return ReE(res, error.details[0].message);

    let err, employee, user;

    [err, user] = await to(Users.create(body));

    if (err) return ReE(res, { message: 'Employee already exists. Please try another.' }, 422);

    if (user) {
        body.user_id = user.id;

        [err, employee] = await to(Employee.create(body));

        if (err) {
            Users.destroy({
                where: { id: user.id }
            });
            return ReE(res, { message: 'Employee already exists. Please try another.' }, 422);
        }

        return ReS(res, { message: 'Successfully created new employee.', employee: employee.toWeb() }, 201);
    } else {
        return ReE(res, { message: 'Employee registration failed.' }, 422);
    }
}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee
    /* { model: Employment_status }, { model: Nationality }, { model: Religion }, { model: Employee_access_card }, { model: Employee_address }
    ,{ model: Employee_attendance }, { model: Employee_asset }, { model: Employee_background }, { model: Employee_bank }, 
    { model: Employee_document },{ model: Employee_family }, { model: employee_generated_letter }, { model: employee_idenity }, 
    { model: employee_nominee }, { model: employee_pf },{ model: Employee_prev_employment },  { model: employee_position,  where: {employee_id:Employee.id }}
            { model: Employee_probation }, { model: Employee_qualification }, { model: Employee_resignation }, { model: organization_tree }  */
    [err, employee] = await to(Employee.findAll({
        where: {
            is_deleted:false,
            status:true
        },
        include: [
            { model: Employment_status }
        ]
    }));
    
    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employee) {
        let details = employee[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employee: employee_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee
    let id = parseInt(req.params.id);
    [err, employee] = await to(Employee.findAll({
        where: {
            id: id,
            status:true,
            is_deleted:false
        },
        include: [ { model: employee_position ,on: {
            "$employee_positions.employee_id$": { $col: "Employee.id" },
        },
            include :[{model: Designation},{model: Scheme}] },{ model: Employment_status }, { model: Nationality },
            { model: Religion },{ model: Employee_address },{ model: Employee_probation }]
    }));
    
    if (err) return ReE(res, err, 422);

    let employee_json = [];

    for (let i in employee) {
        let details = employee[i];
        let info = details.toWeb();
        //console.log(info);
        employee_json.push(info);
    }
    return ReS(res, { employee: employee_json });
};

module.exports.getOne = getOne;


const update = async function (req, res) {
    let err, employees, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, employees] = await to(Employee.update(data, {
        where: { id: id }
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employee is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employee : ' });

};

module.exports.update = update;


const remove = async function (req, res) {
    let employees, err;
    let id = parseInt(req.params.id);
    data = {is_deleted:1,status:0};
    
    [err, employees] = await to(Employee.update(data, {
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employee');

    if (employees) {
        [err, employees] = await to(Employee.findById(id));
        Users.update({is_active:false},{
            where: { id:employees.user_id }
        });
    }

    return ReS(res, { message: 'Employee deleted successfully.' });

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(128).required().email(),
        password: Joi.string().min(5).max(255).required(),
        first_name: Joi.string().required(),
        initials: Joi.optional(),
        nick_name: Joi.optional(),
        middle_name: Joi.optional(),
        last_name: Joi.optional(),
        dob: Joi.optional(),
        place_of_birth: Joi.optional(),
        birth_day: Joi.optional(),
        gender: Joi.optional(),
        joining_date: Joi.optional(),
        employment_status: Joi.optional(),
        probation_period: Joi.optional(),
        confirm_date: Joi.optional(),
        company_email: Joi.optional(),
        personal_email: Joi.optional(),
        marital_status: Joi.optional(),
        marriage_date: Joi.optional(),
        blood_group: Joi.optional(),
        notice_period: Joi.number().integer(),
        is_physical_challaged: Joi.number().integer(),
        mobile_number: Joi.optional(),
        emergency_contact_name: Joi.optional(),
        emergency_contact_number: Joi.optional(),
        father_name: Joi.optional(),
        spouse_name: Joi.optional(),
        salary_payment_mode: Joi.optional(),
        nationality: Joi.number().integer(),
        religion: Joi.number().integer()
    };

    return Joi.validate(req, schema);
}

function GetFormattedDate(date) {
    
    let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    let day = date.getDate();
    let monthIndex = date.getMonth()+1;
    let year = date.getFullYear();
    
    return day + '/' +monthIndex+ '/' + year;
}