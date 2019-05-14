const Joi   =   require('joi');
const { employee_position, Designation, Department, Grade, location, Attendance_scheme,Scheme, Employee} = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeeposition;

    [err, employeeposition] = await to(employee_position.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeeposition.', employeeposition: employeeposition.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeposition

    [err, employeeposition] = await to(employee_position.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeeposition_json = []

    for (let i in employeeposition) {
        let details = employeeposition[i];
        let info = details.toWeb();
        employeeposition_json.push(info);
    }
    return ReS(res, { employeeposition: employeeposition_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeposition
    let id = parseInt(req.params.id);
    [err, employeeposition] = await to(employee_position.findAll({
        where: {
            employee_id: id
        },
        include:[{model: Designation}, {model: Department}, {model: Grade}, {model: location}, {model: Attendance_scheme}, {model:Scheme},{model:Employee}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeeposition) {
        let details = employeeposition[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeeposition: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeepositions, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeepositions] = await to(employee_position.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeeposition is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeeposition : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeepositions, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeepositions] = await to(employee_position.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeeposition');

    return ReS(res, { message: 'Deleted employeeposition' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        department_id: Joi.number().integer().required(),
        designation_id: Joi.number().integer().required(),
        grade_id: Joi.number().integer().required(),
        location_id: Joi.number().integer().required(),
        attendance_scheme_id: Joi.number().integer().required(),
        reporting_to: Joi.optional(),
        effective_from: Joi.optional(),
        effective_to: Joi.optional(),
        reason: Joi.optional(),
        is_current: Joi.optional(),
        scheme_id: Joi.optional()
    };
 
    return Joi.validate(req, schema);
}