const Joi   =   require('joi');
const { Employee_family, Nationality } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeefamily;

    [err, employeefamily] = await to(Employee_family.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeefamily.', employeefamily: employeefamily.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeefamily

    [err, employeefamily] = await to(Employee_family.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeefamily_json = []

    for (let i in employeefamily) {
        let details = employeefamily[i];
        let info = details.toWeb();
        employeefamily_json.push(info);
    }
    return ReS(res, { employeefamily: employeefamily_json });
}

module.exports.getAll = getAll;



const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeefamily
    let id = parseInt(req.params.id);
    [err, employeefamily] = await to(Employee_family.findAll({
        include: [{ model: Nationality }],
        where: {
            employee_id: id
        }
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in employeefamily) {
        let details = employeefamily[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeefamily: employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, employeefamilys, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeefamilys] = await to(Employee_family.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeefamily is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeefamily : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeefamilys, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeefamilys] = await to(Employee_family.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeefamily');

    return ReS(res, { message: 'Deleted employeefamily' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        name: Joi.optional(),
        relation: Joi.optional(),
        dateofbirth: Joi.optional(),
        blood_group: Joi.optional(),
        gender: Joi.optional(),
        profession: Joi.optional(),
        remarks: Joi.optional(),
        nationality_id: Joi.number().integer()
    };
 
    return Joi.validate(req, schema);
}