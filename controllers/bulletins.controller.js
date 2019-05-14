const Joi   =   require('joi');
const { Bulletin } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, bulletins;

    [err, bulletins] = await to(Bulletin.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new bulletins.', bulletins: bulletins.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, bulletins

    [err, bulletins] = await to(Bulletin.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let bulletins_json = []

    for (let i in bulletins) {
        let details = bulletins[i];
        let info = details.toWeb();
        bulletins_json.push(info);
    }
    return ReS(res, { bulletins: bulletins_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, bulletinss, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, bulletinss] = await to(Bulletin.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of bulletins is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated bulletins : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let bulletinss, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, bulletinss] = await to(Bulletin.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete bulletins');

    return ReS(res, { message: 'Deleted bulletins' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        category:Joi.optional(),
        rank:Joi.optional(),
        start_date:Joi.optional(),
        title:Joi.optional(),
        description:Joi.optional(),
        file_path:Joi.optional(),
        employee_filter:Joi.optional()
    };
 
    return Joi.validate(req, schema);
}