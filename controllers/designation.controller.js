const Joi   =   require('joi');
const { Designation } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, designations;

    [err, designations] = await to(Designation.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new Designation.', designation: designations.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, designations

    [err, designations] = await to(Designation.findAll({
        order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let Designation_json = []

    for (let i in designations) {
        let details = designations[i];
        let info = details.toWeb();
        Designation_json.push(info);
    }
    return ReS(res, { designation: Designation_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, designations, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, designations] = await to(Designation.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of Designation is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated Designation : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let designations, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, designations] = await to(Designation.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete Designation');

    return ReS(res, { message: 'Deleted Designation' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}