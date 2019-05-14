const Joi   =   require('joi');
const { Holiday_list, location } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, holidaylist;

    [err, holidaylist] = await to(Holiday_list.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new holidaylist.', holidaylist: holidaylist.toWeb() }, 201);

};

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, holidaylist

    [err, holidaylist] = await to(Holiday_list.findAll({
        include:[{model:location}]
    }));

    if (err) return ReE(res, err, 422)

    let holidaylist_json = []

    for (let i in holidaylist) {
        let details = holidaylist[i];
        let info = details.toWeb();
        holidaylist_json.push(info);
    }
    return ReS(res, { holidaylist: holidaylist_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, holidaylists, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, holidaylists] = await to(Holiday_list.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of holidaylist is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated holidaylist : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let holidaylists, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, holidaylists] = await to(Holiday_list.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete holidaylist');

    return ReS(res, { message: 'Deleted holidaylist' }, 204);

};
module.exports.remove = remove;

function validate(req) {
    const schema = {
        location_id: Joi.number().integer().required(),
        holiday_date: Joi.optional(),
        name: Joi.optional(),
        is_optional: Joi.optional()
    };
 
    return Joi.validate(req, schema);
}