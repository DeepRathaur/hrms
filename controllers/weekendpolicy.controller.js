const Joi   =   require('joi');
const { Weekend_policy } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, weekendpolicy;

    [err, weekendpolicy] = await to(Weekend_policy.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new weekendpolicy.', weekendpolicy: weekendpolicy.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, weekendpolicy

    [err, weekendpolicy] = await to(Weekend_policy.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let weekendpolicy_json = []

    for (let i in weekendpolicy) {
        let details = weekendpolicy[i];
        let info = details.toWeb();
        weekendpolicy_json.push(info);
    }
    return ReS(res, { weekendpolicy: weekendpolicy_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, weekendpolicys, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, weekendpolicys] = await to(Weekend_policy.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of weekendpolicy is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated weekendpolicy : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let weekendpolicys, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, weekendpolicys] = await to(Weekend_policy.destroy({
        where: { id: id }
    }));
    if (err) return ReE(res, 'error occured trying to delete weekendpolicy');

    return ReS(res, { message: 'Deleted weekendpolicy' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        saturday_week1: Joi.optional(),
        saturday_week2: Joi.optional(),
        saturday_week3: Joi.optional(),
        saturday_week4: Joi.optional(),
        saturday_week5: Joi.optional(),
        sunday_week1: Joi.optional(),
        sunday_week2: Joi.optional(),
        sunday_week3: Joi.optional(),
        sunday_week4: Joi.optional(),
        sunday_week5: Joi.optional()
    };
    return Joi.validate(req, schema);
}