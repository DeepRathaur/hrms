const Joi   =   require('joi');
const { Employee_asset, Asset } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employee_asset;

    [err, employee_asset] = await to(Employee_asset.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employee_asset.', employee_asset: employee_asset.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_asset

    [err, employee_asset] = await to(Employee_asset.findAll({
        include: [
            { model: Asset }
        ]
    }));

    if (err) return ReE(res, err, 422)

    let employee_asset_json = []

    for (let i in employee_asset) {
        let details = employee_asset[i];
        let info = details.toWeb();
        employee_asset_json.push(info);
    }
    return ReS(res, { employee_asset: employee_asset_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_asset
    let id = parseInt(req.params.id);
    [err, employee_asset] = await to(Employee_asset.findAll({
        where: {
            employee_id: id
        },
        include : [{model:Asset}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employee_asset) {
        let details = employee_asset[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employee_asset: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employee_assets, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employee_assets] = await to(Employee_asset.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employee_asset is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employee_asset : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employee_assets, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employee_assets] = await to(Employee_asset.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employee_asset');

    return ReS(res, { message: 'Deleted employee_asset' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        asset_id: Joi.number().integer().required(),
        received_date: Joi.optional(),
        valid_till: Joi.optional(),
        returned_on: Joi.optional(),
        remarks: Joi.optional()
    };

    return Joi.validate(req, schema);
}