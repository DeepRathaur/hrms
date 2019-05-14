const Joi   =   require('joi');
const { Employee_prev_employment } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeeprevemployment;

    [err, employeeprevemployment] = await to(Employee_prev_employment.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeeprevemployment.', employeeprevemployment: employeeprevemployment.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeprevemployment

    [err, employeeprevemployment] = await to(Employee_prev_employment.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeeprevemployment_json = []

    for (let i in employeeprevemployment) {
        let details = employeeprevemployment[i];
        let info = details.toWeb();
        employeeprevemployment_json.push(info);
    }
    return ReS(res, { employeeprevemployment: employeeprevemployment_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeprevemployment
    let id = parseInt(req.params.id);
    [err, employeeprevemployment] = await to(Employee_prev_employment.findAll({
        where: {
            employee_id: id
        }
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeeprevemployment) {
        let details = employeeprevemployment[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeeprevemployment: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeeprevemployments, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeeprevemployments] = await to(Employee_prev_employment.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeeprevemployment is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeeprevemployment : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeeprevemployments, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeeprevemployments] = await to(Employee_prev_employment.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeeprevemployment');

    return ReS(res, { message: 'Deleted employeeprevemployment' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        from_date: Joi.optional(),
        to_date: Joi.optional(),
        designation: Joi.optional(),
        company_name: Joi.optional(),
        company_address: Joi.optional(),
        nature_of_duties: Joi.optional(),
        leaving_reason: Joi.optional(),
        relevant_experience: Joi.optional(),
        pf_member_id: Joi.optional()
    };
 
    return Joi.validate(req, schema);
}