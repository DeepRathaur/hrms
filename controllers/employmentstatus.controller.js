const Joi   =   require('joi');
const { Employment_status } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employment_status;

    [err, employment_status] = await to(Employment_status.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employment_status.', employment_status: employment_status.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employment_status

    [err, employment_status] = await to(Employment_status.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let employment_status_json = []

    for (let i in employment_status) {
        let details = employment_status[i];
        let info = details.toWeb();
        employment_status_json.push(info);
    }
    return ReS(res, { employment_status: employment_status_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, employment_statuss, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employment_statuss] = await to(Employment_status.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employment_status is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employment_status : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employment_statuss, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employment_statuss] = await to(Employment_status.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employment_status');

    return ReS(res, { message: 'Deleted employment_status' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}