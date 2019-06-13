const Joi   =   require('joi');
const { employeetask, Employee } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeetaskdata;

    [err, employeetaskdata] = await to(employeetask.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeetaskdata.', employeetaskdata: employeetaskdata.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeetaskdata

    [err, employeetaskdata] = await to(employeetask.findAll({
       // order: [['name', 'ASC']],
        include :[{model: Employee,as:'EmployeeId',attributes: ['id', 'initials','nick_name','first_name','middle_name','last_name']}]
    }));

    if (err) return ReE(res, err, 422)

    let employeetaskdata_json = []

    for (let i in employeetaskdata) {
        let details = employeetaskdata[i];
        let info = details.toWeb();
        employeetaskdata_json.push(info);
    }
    return ReS(res, { employeetaskdata: employeetaskdata_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeetaskdata
    let empid = parseInt(req.params.id);
    
    [err, employeetaskdata] = await to(employeetask.findAll({
        where: {
            review_by: empid
        }, 
        include :[{model: Employee,as:'EmployeeId',attributes: ['id', 'initials','nick_name','first_name','middle_name','last_name']}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeetaskdata) {
        let details = employeetaskdata[i];
        let info = details.toWeb();
        employee_json.push(info);
    }

    
    return ReS(res, { employeetaskdata: employee_json });
};

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeetaskdatas, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeetaskdatas] = await to(employeetask.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeetaskdata is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeetaskdata : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeetaskdatas, err;
    let id = parseInt(req.params.id);
    [err, employeetaskdatas] = await to(employeetask.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeetaskdata');

    return ReS(res, { message: 'Deleted employeetaskdata' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        name: Joi.optional(),
        allotedto: Joi.number().integer().required(),
        review_by: Joi.optional(),
        review_remarks: Joi.optional(),
        remarks: Joi.optional(),
        review_status: Joi.optional(),
    };

    return Joi.validate(req, schema);
}
