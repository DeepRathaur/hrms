const Joi   =   require('joi');
const { location, construction_site } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, constructionsites;

    [err, constructionsites] = await to(construction_site.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new construction_site.', construction_site: constructionsites.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, constructionsites

    [err, constructionsites] = await to(construction_site.findAll({
        order: [['name', 'ASC']],
        include : [{model:location}]
    }));

    if (err) return ReE(res, err, 422)

    let construction_site_json = []

    for (let i in constructionsites) {
        let details = constructionsites[i];
        let info = details.toWeb();
        construction_site_json.push(info);
    }
    return ReS(res, { construction_site: construction_site_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, constructionsites, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, constructionsites] = await to(construction_site.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of construction_site is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated construction_site : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let constructionsites, err;
    let id = parseInt(req.params.id);

    [err, constructionsites] = await to(construction_site.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete constructionsites');

    return ReS(res, { message: 'Deleted constructionsites' }, 204);

}
module.exports.remove = remove;


function validate(req) {
    const schema = {
        name: Joi.string().required(),
        branch_id: Joi.optional()
    };

    return Joi.validate(req, schema);
}