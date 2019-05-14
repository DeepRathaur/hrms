const Joi = require('joi');
const { Leave_scheme_leave_type, Leave_type } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, leaveschemeleavetype;

    [err, leaveschemeleavetype] = await to(Leave_scheme_leave_type.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new leaveschemeleavetype.', leaveschemeleavetype: leaveschemeleavetype.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveschemeleavetype

    [err, leaveschemeleavetype] = await to(Leave_scheme_leave_type.findAll({
    }));

    if (err) return ReE(res, err, 422)

    let leaveschemeleavetype_json = []

    for (let i in leaveschemeleavetype) {
        let details = leaveschemeleavetype[i];
        let info = details.toWeb();
        leaveschemeleavetype_json.push(info);
    }
    return ReS(res, { leaveschemeleavetype: leaveschemeleavetype_json });
}

module.exports.getAll = getAll;

/* Get All leave types by leave schemes id */
const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, leaveschemeleavetype
    let leaveschemeid = parseInt(req.params.leaveschemeid);
    let periodicity = parseInt(req.params.periodicity);

    if (periodicity == 0) {
        leave_granting_frequency    =   'Monthly' ;
    } else {
        leave_granting_frequency    =   'Annual' ;
    }
    
    [err, leaveschemeleavetype] = await to(Leave_scheme_leave_type.findAll({
        where:{
            leave_schemes_id:leaveschemeid
        },
        include:[{model:Leave_type, where:{leave_granting_frequency:leave_granting_frequency,allow_emp_to_apply:true}}]
    }));

    if (err) return ReE(res, err, 422)

    let leaveschemeleavetype_json = []

    for (let i in leaveschemeleavetype) {
        let details = leaveschemeleavetype[i];
        let info = details.toWeb();
        leaveschemeleavetype_json.push(info);
    }
    return ReS(res, { leaveschemeleavetype: leaveschemeleavetype_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, leaveschemeleavetypes, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, leaveschemeleavetypes] = await to(Leave_scheme_leave_type.update(data, {
        where: { id: id }
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of leaveschemeleavetype is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated leaveschemeleavetype : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let leaveschemeleavetypes, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, leaveschemeleavetypes] = await to(Leave_scheme_leave_type.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete leaveschemeleavetype');

    return ReS(res, { message: 'Deleted leaveschemeleavetype' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        leave_schemes_id: Joi.number().integer(),
        leave_type_id: Joi.number().integer()
    };

    return Joi.validate(req, schema);
}