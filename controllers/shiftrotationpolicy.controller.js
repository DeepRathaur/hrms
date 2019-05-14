const Joi   =   require('joi');
const { shift_rotation_policy } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, shiftrotationpolicy;

    [err, shiftrotationpolicy] = await to(shift_rotation_policy.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new shiftrotationpolicy.', shiftrotationpolicy: shiftrotationpolicy.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, shiftrotationpolicy

    [err, shiftrotationpolicy] = await to(shift_rotation_policy.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let shiftrotationpolicy_json = []

    for (let i in shiftrotationpolicy) {
        let details = shiftrotationpolicy[i];
        let info = details.toWeb();
        shiftrotationpolicy_json.push(info);
    }
    return ReS(res, { shiftrotationpolicy: shiftrotationpolicy_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, shiftrotationpolicys, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, shiftrotationpolicys] = await to(shift_rotation_policy.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of shiftrotationpolicy is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated shiftrotationpolicy : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let shiftrotationpolicys, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, shiftrotationpolicys] = await to(shift_rotation_policy.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete shiftrotationpolicy');

    return ReS(res, { message: 'Deleted shiftrotationpolicy' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        frequency: Joi.optional()
    };
    return Joi.validate(req, schema);
}