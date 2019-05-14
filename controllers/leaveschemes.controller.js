const Joi   =   require('joi');
const { Leave_schemes,Employment_status, Weekend_policy, Leave_scheme_leave_type, Leave_type } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let leave_type_id = body.leave_type_id;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, leaveschemes;

    [err, leaveschemes] = await to(Leave_schemes.create(body));

    if (err) return ReE(res, err, 422);

    if (leave_type_id.length > 0) {
        let leaveschemeleavetype;
        for (let i in leave_type_id) {
            let bodyLoc = { leave_schemes_id: leaveschemes.id, leave_type_id: leave_type_id[i] };
            [err, leaveschemeleavetype] = await to(Leave_scheme_leave_type.create(bodyLoc));
        }
    }
    return ReS(res, { message: 'Successfully created new leaveschemes.', leaveschemes: leaveschemes.toWeb() }, 201);
}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveschemes

    [err, leaveschemes] = await to(Leave_schemes.findAll({
        include:[{model:Employment_status}, {model:Weekend_policy}, {model:Leave_scheme_leave_type,include:{model:Leave_type}}]
    }));

    if (err) return ReE(res, err, 422)

    let leaveschemes_json = []

    for (let i in leaveschemes) {
        let details = leaveschemes[i];
        let info = details.toWeb();
        leaveschemes_json.push(info);
    }
    return ReS(res, { leaveschemes: leaveschemes_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, leaveschemess, data;
    let id = parseInt(req.params.id);
    data = req.body;
    let leave_type_id = data.leave_type_id;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, leaveschemess] = await to(Leave_schemes.update(data, {
            where: { id: id }
        }));
    if (err) {
        if (err.message == 'Validation error') err = 'The name of leaveschemes is already exist';
        return ReE(res, err);
    }
    if (leave_type_id.length > 0) {
        let leaveschemeleavetype;
        [err, leaveschemeleavetype] = await to(Leave_scheme_leave_type.destroy({
            where: { leave_schemes_id:id }
        }));
        for (let i in leave_type_id) {
            let bodyLoc = { leave_schemes_id: leaveschemes.id, leave_type_id: leave_type_id[i] };
            [err, leaveschemeleavetype] = await to(Leave_scheme_leave_type.create(bodyLoc));
        }
    }
    return ReS(res, { message: 'Updated leaveschemes : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let leaveschemess, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, leaveschemess] = await to(Leave_schemes.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete leaveschemes');

    return ReS(res, { message: 'Deleted leaveschemes' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.optional(),
        weekend_policy_id: Joi.optional(),
        employment_status_id: Joi.optional(),
        leave_type_id:Joi.optional()
    };
 
    return Joi.validate(req, schema);
}