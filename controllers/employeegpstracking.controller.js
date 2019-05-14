const Joi   =   require('joi');
const { employeegps_tracking,Employee, organization_tree } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const sequelize = require('sequelize');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    let err, employeegpstracking;

    [err, employeegpstracking] = await to(employeegps_tracking.create(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new employeegpstracking.', employeegpstracking: employeegpstracking.toWeb() }, 201);

};

module.exports.create = create;


const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeegpstracking;

    [err, employeegpstracking] = await to(employeegps_tracking.findAll({
        order: [['createdAt', 'DESC']],
        include:[{model:Employee,attributes:['id','first_name','last_name','is_enable_mobile']}]
    }));

    if (err) return ReE(res, err, 422);

    let employeegpstracking_json = [];
    let emIDs   =   [] ;
    //let location =  [] ;
    for (let i in employeegpstracking) {

        let details = employeegpstracking[i];
        let info = details.toWeb();
        employeegpstracking_json.push(info);
        // if (emIDs.includes(details.employee_id)) {
        // } else {
        //     emIDs.push(details.employee_id);
        //
        // }
    }

    return ReS(res, { employeegpstracking: employeegpstracking_json });
};
module.exports.getAll = getAll;


const getOne = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeegpstracking;
    let id = parseInt(req.params.id);
    [err, employeegpstracking] = await to(employeegps_tracking.findAll({
        where: {
            employee_id: id
        },
        order: [['createdAt', 'DESC']],
        include:[{model:Employee,attributes:['id','first_name','last_name','is_enable_mobile']}]
    }));

    if (err) return ReE(res, err, 422);

    let employee_json = [];

    for (let i in employeegpstracking) {
        let details = employeegpstracking[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeegpstracking: employee_json });
};

module.exports.getOne = getOne;

const getByDate = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeegpstracking;
    let id      =   parseInt(req.params.id);
    let date    =   (req.params.date);
    [err, employeegpstracking] = await to(employeegps_tracking.findAll({
    where: sequelize.and(sequelize.where(sequelize.fn('DATE', sequelize.col('employeegps_tracking.createdAt')), date),
                         sequelize.where(sequelize.col('employee_id'),id)),
        order: [['createdAt', 'DESC']],
        include:[{model:Employee,attributes:['id','first_name','last_name','is_enable_mobile']}]
    }));

    if (err) return ReE(res, err, 422);

    let employee_json = [];

    for (let i in employeegpstracking) {
        let details = employeegpstracking[i];
        let info = details.toWeb();
        employee_json.push(info);
    }
    return ReS(res, { employeegpstracking: employee_json });
};

module.exports.getByDate = getByDate;

const getByReporingM = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employeegpstracking,organisationtree;
    let id      =   parseInt(req.params.rmid);
    let date    =   (req.params.date);


    [err, organisationtree] = await to(organization_tree.findAll({
        where:{
            manager_employee_id:id
        }
    }));

    if (err) return ReE(res, err, 422);
    let employee_json = [];
    for (let i in organisationtree) {
        let empid = organisationtree[i].employee_id;
        [err, employeegpstracking] = await to(employeegps_tracking.findAll({
            where: sequelize.and(sequelize.where(sequelize.fn('DATE', sequelize.col('employeegps_tracking.createdAt')), date),
                sequelize.where(sequelize.col('employee_id'),empid)),
            order: [['createdAt', 'DESC']],
            include:[{model:Employee,attributes:['id','first_name','last_name','is_enable_mobile']}]
        }));

        if (err) return ReE(res, err, 422);

        for (let i in employeegpstracking) {
            let details = employeegpstracking[i];
            let info = details.toWeb();
            employee_json.push(info);
        }
    }
    return ReS(res, { employeegpstracking: employee_json });
};

module.exports.getByReporingM = getByReporingM;

const update = async function (req, res) {
    let err, employeegpstrackings, data;
    let id = parseInt(req.params.id);
    data = req.body;
    const { error } = (data);

    if (error) return ReE(res, error.details[0].message);

    [err, employeegpstrackings] = await to(employeegps_tracking.update(data, {
        where: { id: id }
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of employee-gps-tracking is already exist';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated employee-gps-tracking' });

};

module.exports.update = update;


const remove = async function (req, res) {
    let employeegpstrackings, err;
    let id = parseInt(req.params.id);
    data = req.body;
    [err, employeegpstrackings] = await to(employeegps_tracking.destroy({
        where: { id: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete employeegpstracking');

    return ReS(res, { message: 'Deleted employeegpstracking' }, 204);

};
module.exports.remove = remove;

function validate(req) {
    const schema = {
        employee_id: Joi.number().integer().required(),
        lattitude: Joi.optional(),
        longitude: Joi.optional()
    };

    return Joi.validate(req, schema);
}