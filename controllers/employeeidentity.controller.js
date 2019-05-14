const Joi   =   require('joi');
const { employee_idenity } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeeidentity;

    [err, employeeidentity] = await to(employee_idenity.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeeidentity.', employeeidentity: employeeidentity.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeidentity

    [err, employeeidentity] = await to(employee_idenity.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeeidentity_json = []

    for (let i in employeeidentity) {
        let details = employeeidentity[i];
        let info = details.toWeb();
        employeeidentity_json.push(info);
    }
    return ReS(res, { employeeidentity: employeeidentity_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, employeeidentitys, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeeidentitys] = await to(employee_idenity.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeeidentity is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeeidentity : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeeidentitys, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeeidentitys] = await to(employee_idenity.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeeidentity');

    return ReS(res, { message: 'Deleted employeeidentity' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        doc_type: Joi.optional(),
        doc_number: Joi.optional(),
        name_as_per_document: Joi.optional(),
        expiray_date: Joi.optional(),
        aadhar_enrolment_no: Joi.optional(),
        is_verified: Joi.optional()
    };
 
    return Joi.validate(req, schema);
}