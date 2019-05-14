const Joi   =   require('joi');
const { employee_nominee, Employee_family } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeenominee;

    [err, employeenominee] = await to(employee_nominee.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeenominee.', employeenominee: employeenominee.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeenominee

    [err, employeenominee] = await to(employee_nominee.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeenominee_json = []

    for (let i in employeenominee) {
        let details = employeenominee[i];
        let info = details.toWeb();
        employeenominee_json.push(info);
    }
    return ReS(res, { employeenominee: employeenominee_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeenominee
    let id = parseInt(req.params.id);
    [err, employeenominee] = await to(employee_nominee.findAll({
        where: {
            employee_id: id
        },
        include: [{model:Employee_family}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeenominee) {
        let details = employeenominee[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeenominee: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeenominees, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeenominees] = await to(employee_nominee.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeenominee is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeenominee : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeenominees, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeenominees] = await to(employee_nominee.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeenominee');

    return ReS(res, { message: 'Deleted employeenominee' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        family_id: Joi.number().integer().required(),
        nominee_for: Joi.optional(),
        nomination_percent: Joi.optional(),
        is_mental_illness: Joi.optional(),
        is_minor: Joi.optional()
    };
 
    return Joi.validate(req, schema);
}