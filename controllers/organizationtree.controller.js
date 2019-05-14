const Joi   =   require('joi');
const { organization_tree, Employee } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, organizationtree;

    [err, organizationtree] = await to(organization_tree.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new organizationtree.', organizationtree: organizationtree.toWeb() }, 201);

}

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, organizationtree

    [err, organizationtree] = await to(organization_tree.findAll({
       // order: [['name', 'ASC']],
    }));

    if (err) return ReE(res, err, 422)

    let organizationtree_json = []

    for (let i in organizationtree) {
        let details = organizationtree[i];
        let info = details.toWeb();
        organizationtree_json.push(info);
    }
    return ReS(res, { organizationtree: organizationtree_json });
}

module.exports.getAll = getAll;

const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, organizationtree
    let empid = parseInt(req.params.empid);
    
    [err, organizationtree] = await to(organization_tree.findAll({
        where: {
            employee_id: empid
        }, 
        include :[{model: Employee,as:'ManagerId',attributes: ['id', 'initials','nick_name','first_name','middle_name','last_name']}]
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in organizationtree) {
        let details = organizationtree[i];
        let info = details.toWeb();
        employee_json.push(info);
    }

    
    return ReS(res, { organizationtree: employee_json });
};

module.exports.getOne = getOne;

const update = async function (req, res) {
    let err, organizationtrees, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = validate(data);

    if (error) return ReE(res, error.details[0].message);

    [err, organizationtrees] = await to(organization_tree.update(data, {
            where: { id: id }
        }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of organizationtree is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated organizationtree : ' + data.name });

}

module.exports.update = update;


const remove = async function (req, res) {
    let organizationtrees, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, organizationtrees] = await to(organization_tree.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete organizationtree');

    return ReS(res, { message: 'Deleted organizationtree' }, 204);

}
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        manager_employee_id: Joi.number().integer().required(),
        reporting_from: Joi.optional()
    };

    return Joi.validate(req, schema);
}

const isReportingManager = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, organizationtree
    let empid = parseInt(req.params.empid);

    [err, organizationtree] = await to(organization_tree.findAll({
        include: [{ model :Employee , attributes: ['id', 'initials', 'nick_name', 'first_name', 'middle_name', 'last_name']}],
        where: {
            manager_employee_id: empid
        }
    }));

    if (err) return ReE(res, err, 422)

    let employee_json = []

    for (let i in organizationtree) {
        let details = organizationtree[i];
        let info = details.toWeb();
        employee_json.push(info);
    }


    return ReS(res, { organizationtree: employee_json });
}

module.exports.isReportingManager = isReportingManager;