const Joi   =   require('joi');
const { Employee_address, Country, State } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employee_address;

    [err, employee_address] = await to(Employee_address.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employee_address.', employee_address: employee_address.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_address

    [err, employee_address] = await to(Employee_address.findAll({
        
    }));

    if (err) return ReE(res, err, 422)

    let employee_address_json = []

    for (let i in employee_address) {
        let details = employee_address[i];
        let info = details.toWeb();
        employee_address_json.push(info);
    }
    return ReS(res, { employee_address: employee_address_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_address
    let id = parseInt(req.params.id);
    [err, employee_address] = await to(Employee_address.findAll({
        where: {
            employee_id: id
        },
        include : [{model:State,include:{model:Country}}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employee_address) {
        let details = employee_address[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employee_address: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employee_addresss, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, employee_addresss] = await to(Employee_address.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employee_address is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employee_address : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employee_addresss, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employee_addresss] = await to(Employee_address.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employee_address');

    return ReS(res, { message: 'Deleted employee_address' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
          name: Joi.optional(),
          address_type: Joi.optional(),
          address1: Joi.optional(),
          address2: Joi.optional(),
          address3: Joi.optional(),
          city: Joi.optional(),
          state_id:Joi.optional(),
          country_id: Joi.optional(),
          pin: Joi.optional(),
          phone1:Joi.optional(),
          phone2: Joi.optional(),
          fax:Joi.optional(),
          mobile: Joi.optional(),
          email: Joi.optional(),
          extn_no: Joi.optional()
    };

    return Joi.validate(req, schema);
}