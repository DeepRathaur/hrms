const Joi   =   require('joi');
const { Department }    =   require('../models');
const { to, ReE, ReS }  =   require('../services/util.service');

const create    =   async (req, res)    =>  {
    res.setHeader('Content-Type', 'application/json');
    let err, department;
    let body    =   req.body;

    const { error } = validate(body);

    if (error) return ReE(res, error.details[0].message);

    [err, department]       =   await to(Department.create(body));

    if(err) return ReE(res,err, 422);

    return ReS(res,{message: 'Successfully created new Department.', department: department.toWeb()}, 201);

}
module.exports.create   =   create;

function validate(req) {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}


const getAll    =   async (req, res)    => {
    res.setHeader('Content-Type', 'application/json');
    let err, department;

    [err, department]     =   await to (Department.findAll({
        order:[['name','ASC']]
    }));

    if (err)    return ReE(res, err, 422);

    let department_json = [];
    for (let i in department) {
        let details =   department[i];
        let info    =   details.toWeb();
        department_json.push(info);
    }
    return ReS(res, {departments:department_json});
}
module.exports.getAll   =   getAll;

const update    =   async (req, res)    => {
    res.setHeader('Content-Type','application/json');
    let err, department, data;
    let department_id = req.params.id;
    data = req.body;
    [err, department] = await to(Department.update(data, {
        where: {id: department_id}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The name of department is already exist';
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated department : '});
}

module.exports.update   =   update;

const remove        =   async   (req, res)  => {
    res.setHeader('Content-Type', 'application/json');
    let department, err ;
    let department_id = req.params.id;
    data    =   req.body;
    [err, department] = await to(Department.destroy({
        where: {id:department_id}
    }));

    if(err) return ReE(res, 'error occured trying to delete department');

    return ReS(res, {message:'Deleted Department'}, 204);
}

module.exports.remove   =   remove;