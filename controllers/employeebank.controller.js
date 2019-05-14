const Joi   =   require('joi');
const { Employee_bank,Bank } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeebank;

    [err, employeebank] = await to(Employee_bank.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeebank.', employeebank: employeebank.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeebank

    [err, employeebank] = await to(Employee_bank.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeebank_json = []

    for (let i in employeebank) {
        let details = employeebank[i];
        let info = details.toWeb();
        employeebank_json.push(info);
    }
    return ReS(res, { employeebank: employeebank_json });
}

module.exports.getAll = getAll;


const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeebank
    let id = parseInt(req.params.id);
    [err, employeebank] = await to(Employee_bank.findAll({
        where: {
            employee_id: id
        },
        include:[{model:Bank}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeebank) {
        let details = employeebank[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeebank: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeebanks, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeebanks] = await to(Employee_bank.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeebank is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeebank : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeebanks, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeebanks] = await to(Employee_bank.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeebank');

    return ReS(res, { message: 'Deleted employeebank' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        bank_id: Joi.number().integer().required(),
        account_number: Joi.optional(),
        account_type: Joi.optional(),
        name_as_per_bank: Joi.optional()
    };

    return Joi.validate(req, schema);
}