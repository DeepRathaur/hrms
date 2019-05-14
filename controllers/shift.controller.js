const Joi   =   require('joi');
const { Shift } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, shift;

    [err, shift] = await to(Shift.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new shift.', shift: shift.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, shift

    [err, shift] = await to(Shift.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let shift_json = []

    for (let i in shift) {
        let details = shift[i];
        let info = details.toWeb();
        shift_json.push(info);
    }
    return ReS(res, { shift: shift_json });
};

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    //res.setHeader('Content-Type', 'application/json');
    let err, shift;
    let id = parseInt(req);
    [err, shift] = await to(Shift.findOne({
        where: {
            id : id
        }
    }));
    if (err) return ReE(res, err, 422);
    return shift;
};

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, shifts, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, shifts] = await to(Shift.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of shift is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated shift : ' + data.name });

};

module.exports.update = update;


const remove = async function (req, res) {
    let shifts, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, shifts] = await to(Shift.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete shift');

    return ReS(res, { message: 'Deleted shift' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        start_time: Joi.string().required(),
        end_time: Joi.string().required(),
    };

    return Joi.validate(req, schema);
}