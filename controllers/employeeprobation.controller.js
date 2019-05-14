const Joi   =   require('joi');
const { Employee_probation } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeeprobation;

    [err, employeeprobation] = await to(Employee_probation.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeeprobation.', employeeprobation: employeeprobation.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeprobation

    [err, employeeprobation] = await to(Employee_probation.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeeprobation_json = []

    for (let i in employeeprobation) {
        let details = employeeprobation[i];
        let info = details.toWeb();
        employeeprobation_json.push(info);
    }
    return ReS(res, { employeeprobation: employeeprobation_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, employeeprobations, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeeprobations] = await to(Employee_probation.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeeprobation is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeeprobation : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeeprobations, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeeprobations] = await to(Employee_probation.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeeprobation');

    return ReS(res, { message: 'Deleted employeeprobation' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        extend_period: Joi.optional(),
        revised_confirm_date: Joi.optional(),
        reason_of_extension: Joi.optional()
    };
 
    return Joi.validate(req, schema);
}