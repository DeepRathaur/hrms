const Joi   =   require('joi');
const { State, Country } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, state;

    [err, state] = await to(State.create(body));

    if (err) return ReE(res, {message:"Duplicate Entry not allowed"}, 422);

    return ReS(res, { message: 'Successfully created new state.', state: state.toWeb() }, 201);

};

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, state
    [err, state] = await to(State.findAll({
        order: [['name', 'ASC']],
        include: [{model:Country}]
    }));

    if (err) return ReE(res, err, 422);

    let state_json = [];

    for (let i in state) {
        let details = state[i];
        let info = details.toWeb();
        state_json.push(info);
    }
    return ReS(res, { state: state_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, states, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, states] = await to(State.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of state is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated state : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let states, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, states] = await to(State.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete state');

    return ReS(res, { message: 'Deleted state' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        country_id: Joi.number().integer().required()
    };

    return Joi.validate(req, schema);
}