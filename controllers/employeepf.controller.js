const Joi   =   require('joi');
const { employee_pf } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    //console.log(body);
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeepf;

    [err, employeepf] = await to(employee_pf.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeepf.', employeepf: employeepf.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeepf

    [err, employeepf] = await to(employee_pf.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeepf_json = []

    for (let i in employeepf) {
        let details = employeepf[i];
        let info = details.toWeb();
        employeepf_json.push(info);
    }
    return ReS(res, { employeepf: employeepf_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeepf
    let id = parseInt(req.params.id);
    [err, employeepf] = await to(employee_pf.findAll({
        where: {
            employee_id: id
        }
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeepf) {
        let details = employeepf[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeepf: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeepfs, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeepfs] = await to(employee_pf.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeepf is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeepf : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeepfs, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeepfs] = await to(employee_pf.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeepf');

    return ReS(res, { message: 'Deleted employeepf' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        is_employee_eligible_for_pf: Joi.optional(),
        is_employee_eligible_for_excess_epf_contribution: Joi.optional(),
        is_employee_eligible_for_excess_eps_contribution: Joi.optional(),
        is_employee_eligible_for_esi: Joi.optional(),
        is_existing_member_of_pf: Joi.optional(),
        universal_account_number: Joi.optional(),
        pf_number: Joi.optional(),
        pf_scheme: Joi.optional(),
        pf_joining_date: Joi.optional(),
        family_pf_number: Joi.optional(),
        esi_number: Joi.optional(),
    };
 
    return Joi.validate(req, schema);
}