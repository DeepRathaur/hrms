const Joi   =   require('joi');
const { Employee_qualification } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeequalification;

    [err, employeequalification] = await to(Employee_qualification.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeequalification.', employeequalification: employeequalification.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeequalification

    [err, employeequalification] = await to(Employee_qualification.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeequalification_json = []

    for (let i in employeequalification) {
        let details = employeequalification[i];
        let info = details.toWeb();
        employeequalification_json.push(info);
    }
    return ReS(res, { employeequalification: employeequalification_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeequalification
    let id = parseInt(req.params.id);
    [err, employeequalification] = await to(Employee_qualification.findAll({
        where: {
            employee_id: id
        }
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeequalification) {
        let details = employeequalification[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeequalification: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeequalifications, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeequalifications] = await to(Employee_qualification.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeequalification is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeequalification : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeeprevemployments, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeeprevemployments] = await to(Employee_qualification.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeeprevemployment');

    return ReS(res, { message: 'Deleted employeeprevemployment' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        from_year: Joi.optional(),
        to_year: Joi.optional(),
        qualification: Joi.optional(),
        duration: Joi.optional(),
        institute: Joi.optional(),
        university: Joi.optional(),
        qualification_level: Joi.optional(),
        qualification_area: Joi.optional(),
        grade: Joi.optional(),
        remarks: Joi.optional(),
    };
 
    return Joi.validate(req, schema);
}