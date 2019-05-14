const Joi   =   require('joi');
const { Hr_form } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, hrform;

    [err, hrform] = await to(Hr_form.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new hrform.', hrform: hrform.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, hrform

    [err, hrform] = await to(Hr_form.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let hrform_json = []

    for (let i in hrform) {
        let details = hrform[i];
        let info = details.toWeb();
        hrform_json.push(info);
    }
    return ReS(res, { hrform: hrform_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, hrforms, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, hrforms] = await to(Hr_form.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of hrform is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated hrform : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let hrforms, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, hrforms] = await to(Hr_form.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete hrform');

    return ReS(res, { message: 'Deleted hrform' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        serial: Joi.optional(),
        category: Joi.optional(),
        description: Joi.optional(),
        file_path: Joi.optional(),
        employee_filter: Joi.optional()
    };
 
    return Joi.validate(req, schema);
}