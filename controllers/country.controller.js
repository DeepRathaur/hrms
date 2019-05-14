const Joi   =   require('joi');
const { Country } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, countries;

    [err, countries] = await to(Country.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new Country.', country: countries.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, countries

    [err, countries] = await to(Country.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let country_json = []

    for (let i in countries) {
        let details = countries[i];
        let info = details.toWeb();
        country_json.push(info);
    }
    return ReS(res, { country: country_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, countries, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, countries] = await to(Country.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of Country is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated Country : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let countries, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, countries] = await to(Country.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete Country');

    return ReS(res, { message: 'Deleted Country' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required(),
        code: Joi.string(),
        dial_code: Joi.string(),
    };

    return Joi.validate(req, schema);
}