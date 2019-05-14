const Joi   =   require('joi');
const { Leave_type,Leave_scheme_leave_type,Leave_schemes } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, leave_type;

    [err, leave_type] = await to(Leave_type.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new Leave_type.', leave_type: leave_type.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leave_type

    [err, leave_type] = await to(Leave_type.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let Leave_type_json = []

    for (let i in leave_type) {
        let details = leave_type[i];
        let info = details.toWeb();
        Leave_type_json.push(info);
    }
    return ReS(res, { leave_type: Leave_type_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, Leave_types, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, Leave_types] = await to(Leave_type.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of Leave_type is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated Leave_type : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let Leave_types, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, Leave_types] = await to(Leave_type.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete Leave_type');

    return ReS(res, { message: 'Deleted Leave_type' }, 204);

}
module.exports.remove = remove;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leave_type
    let id = parseInt(req.params.id);

    [err, leave_type] = await to(Leave_type.findAll({
        where: {
            id : id
        },
        include : [{model:Leave_scheme_leave_type, include:[{model:Leave_schemes}]}]
    }));

    if (err) return ReE(res, err, 422)

    let Leave_type_json = []

    for (let i in leave_type) {
        let details = leave_type[i];
        let info = details.toWeb();
        Leave_type_json.push(info);
    }
    return ReS(res, { leave_type: Leave_type_json });
}

module.exports.getOne = getOne;


function validate(req) {
    const schema = {
        name: Joi.string().required(),
        allow_emp_to_apply: Joi.number().integer(),
        sort_order: Joi.number().integer(),
        description: Joi.string(),
        leave_granting_frequency: Joi.string(),
        max_leave_for_period: Joi.number().integer(),
        expires_after_days: Joi.number().integer()
    };

    return Joi.validate(req, schema);
}