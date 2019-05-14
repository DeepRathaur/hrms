const Joi   =   require('joi');
const { Attendance_scheme } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, attendancescheme;

    [err, attendancescheme] = await to(Attendance_scheme.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new attendancescheme.', attendancescheme: attendancescheme.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, attendancescheme

    [err, attendancescheme] = await to(Attendance_scheme.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let attendancescheme_json = []

    for (let i in attendancescheme) {
        let details = attendancescheme[i];
        let info = details.toWeb();
        attendancescheme_json.push(info);
    }
    return ReS(res, { attendancescheme: attendancescheme_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, attendanceschemes, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, attendanceschemes] = await to(Attendance_scheme.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of attendancescheme is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated attendancescheme : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let attendanceschemes, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, attendanceschemes] = await to(Attendance_scheme.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete attendancescheme');

    return ReS(res, { message: 'Deleted attendancescheme' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name:Joi.string().required(),
        shift_rotation_policy_id:Joi.optional(),
        weekend_policy_id:Joi.optional(),
        status:Joi.optional()
    };
 
    return Joi.validate(req, schema);
}