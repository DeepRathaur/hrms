const Joi   =   require('joi');
const { Nationality } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, nationality;

    [err, nationality] = await to(Nationality.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new Nationality.', nationality: nationality.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, nationality

    [err, nationality] = await to(Nationality.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let Nationality_json = []

    for (let i in nationality) {
        let details = nationality[i];
        let info = details.toWeb();
        Nationality_json.push(info);
    }
    return ReS(res, { nationality: Nationality_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, Nationalitys, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, Nationalitys] = await to(Nationality.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of Nationality is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated Nationality : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let Nationalitys, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, Nationalitys] = await to(Nationality.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete Nationality');

    return ReS(res, { message: 'Deleted Nationality' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}