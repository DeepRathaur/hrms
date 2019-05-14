const Joi   =   require('joi');
const { location, Country } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, locations;

    [err, locations] = await to(location.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new location.', location: locations.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, locations

    [err, locations] = await to(location.findAll({
        order: [['name', 'ASC']],
        include : [{model:Country}]
    }));

    if (err) return ReE(res, err, 422)

    let location_json = []

    for (let i in locations) {
        let details = locations[i];
        let info = details.toWeb();
        location_json.push(info);
    }
    return ReS(res, { location: location_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, locations, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, locations] = await to(location.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of location is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated location : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let locations, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, locations] = await to(location.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete Country');

    return ReS(res, { message: 'Deleted Country' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        address: Joi.optional(),
        contact: Joi.optional(),
        country_id: Joi.optional()
    };

    return Joi.validate(req, schema);
}