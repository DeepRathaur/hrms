const Joi   =   require('joi');
const { Employee_resignation } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeeresignation;

    [err, employeeresignation] = await to(Employee_resignation.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeeresignation.', employeeresignation: employeeresignation.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeeresignation

    [err, employeeresignation] = await to(Employee_resignation.findAll({
    
    }));

    if (err) return ReE(res, err, 422)

    let employeeresignation_json = []

    for (let i in employeeresignation) {
        let details = employeeresignation[i];
        let info = details.toWeb();
        employeeresignation_json.push(info);
    }
    return ReS(res, { employeeresignation: employeeresignation_json });
}

module.exports.getAll = getAll;

const update = async function (req, res) {
    let err, employeeresignations, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeeresignations] = await to(Employee_resignation.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employeeresignation is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employeeresignation : ' });

}

module.exports.update = update;


const remove = async function (req, res) {
    let employeeresignations, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeeresignations] = await to(Employee_resignation.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeeresignation');

    return ReS(res, { message: 'Deleted employeeresignation' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        leaving_date: Joi.optional(),
        resignation_submission_date: Joi.optional(),
        date_of_releiving: Joi.optional(),
        reason_for_leaving: Joi.optional(),
        has_left_the_organization: Joi.optional(),
        is_deceased: Joi.optional(),
        date_of_death: Joi.optional(),
        is_fit_to_be_rehired: Joi.optional(),
        employee_feedback: Joi.optional(),
        final_settlement_date: Joi.optional(),
        exit_intview_cond_on: Joi.optional(),
        remarks: Joi.optional(),
        no_due_certificat_isuued: Joi.optional(),
        is_notice_required: Joi.optional(),
        is_notice_served: Joi.optional(),
        notice_period: Joi.optional(),
        pf_leaving_reason: Joi.optional(),
        separation_mode: Joi.optional(),
        retirement_date: Joi.optional(),
        exclude_from_final_settlement: Joi.optional()
    };
    return Joi.validate(req, schema);
}