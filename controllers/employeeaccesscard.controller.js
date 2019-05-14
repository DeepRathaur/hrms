const Joi   =   require('joi');
const { Employee_access_card } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);
    
    if (error) return ReE(res, error.details[0].message);

    let err, employeeaccesscard;

    [err, employeeaccesscard] = await to(Employee_access_card.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeeaccesscard.', employeeaccesscard: employeeaccesscard.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeaccesscard

    [err, employeeaccesscard] = await to(Employee_access_card.findAll({
        
    }));

    if (err) return ReE(res, err, 422)

    let employeeaccesscard_json = []

    for (let i in employeeaccesscard) {
        let details = employeeaccesscard[i];
        let info = details.toWeb();
        employeeaccesscard_json.push(info);
    }
    return ReS(res, { employeeaccesscard: employeeaccesscard_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeaccesscard
    let id = parseInt(req.params.id);
    [err, employeeaccesscard] = await to(Employee_access_card.findAll({
        where: {
            employee_id: id
        }
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeeaccesscard) {
        let details = employeeaccesscard[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeeaccesscard: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeeaccesscards, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeeaccesscards] = await to(Employee_access_card.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeeaccesscard is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeeaccesscard : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeeaccesscards, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeeaccesscards] = await to(Employee_access_card.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeeaccesscard');

    return ReS(res, { message: 'Deleted employeeaccesscard' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        card_number: Joi.string().alphanum().required(),
        employee_id: Joi.number().integer().required(),
        from_date: Joi.string().required(),
        to_date: Joi.string().required()
    };

    return Joi.validate(req, schema);
}