const Joi   =   require('joi');
const { construction_site, construction_site_employee, Employee } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, constructionsiteemployee;

    [err, constructionsiteemployee] = await to(construction_site_employee.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new construction_site_employee.', construction_site_employee: constructionsiteemployee.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, constructionsiteemployee

    [err, constructionsiteemployee] = await to(construction_site_employee.findAll({
        include : [{model:construction_site},{model:Employee}]
    }));

    if (err) return ReE(res, err, 422)

    let construction_site_employee_json = []

    for (let i in constructionsiteemployee) {
        let details = constructionsiteemployee[i];
        let info = details.toWeb();
        construction_site_employee_json.push(info);
    }
    return ReS(res, { construction_site_employee: construction_site_employee_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, constructionsiteemployee
    let id = parseInt(req.params.id);
    [err, constructionsiteemployee] = await to(construction_site_employee.findAll({
        where:{
            constructionsite_id:id
        },
        include : [{model:construction_site}]
    }));

    if (err) return ReE(res, err, 422)

    let construction_site_employee_json = []

    for (let i in constructionsiteemployee) {
        let details = constructionsiteemployee[i];
        let info = details.toWeb();
        construction_site_employee_json.push(info);
    }
    return ReS(res, { construction_site_employee: construction_site_employee_json });
}

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, constructionsiteemployee, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, constructionsiteemployee] = await to(construction_site_employee.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of construction_site_employee is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated construction_site_employee : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let constructionsiteemployee, err;
    let id = parseInt(req.params.id);

    [err, constructionsiteemployee] = await to(construction_site_employee.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete constructionsiteemployee');

    return ReS(res, { message: 'Deleted constructionsiteemployee' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        constructionsite_id: Joi.string().required(),
        employee_id: Joi.optional()
    };

    return Joi.validate(req, schema);
}