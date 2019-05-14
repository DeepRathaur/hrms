const Joi   =   require('joi');
const { Employee_background } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employee_background;

    [err, employee_background] = await to(Employee_background.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employee_background.', employee_background: employee_background.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employee_background

    [err, employee_background] = await to(Employee_background.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employee_background_json = []

    for (let i in employee_background) {
        let details = employee_background[i];
        let info = details.toWeb();
        employee_background_json.push(info);
    }
    return ReS(res, { employee_background: employee_background_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, employee_backgrounds, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employee_backgrounds] = await to(Employee_background.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employee_background is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employee_background : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employee_backgrounds, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employee_backgrounds] = await to(Employee_background.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employee_background');

    return ReS(res, { message: 'Deleted employee_background' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        background_check_status: Joi.optional(),
        varification_completed_on: Joi.optional(),
        agency_name: Joi.optional(),
        remarks: Joi.optional()
    };

    return Joi.validate(req, schema);
}