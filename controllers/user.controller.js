const Joi = require('joi');
const { Users, Roles, Employee } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const authService = require('../services/auth.service');



const create = async function (req, res) {
    const body = req.body;
    const { error } = validate(body);
    if (error) return ReE(res, error.details[0].message);

    let err, user;
    [err, user] = await to(authService.createUser(body));

    if (err) return ReE(res, err, 422);

    return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);

}

module.exports.create = create;

const login = async function (req, res) {
    const body = req.body;
    let err, user;
    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);

    if (user) {
        let lognum = user.lognum += 1;
        Users.update({
            logdate: new Date().toISOString(),
            lognum: lognum,
        }, {
                where: {
                    id: user.id,
                }
            });
    }
    return ReS(res, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.login = login;



function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(128).required().email(),
        password: Joi.string().min(5).max(255).required(),
        name: Joi.string().required()
    };

    return Joi.validate(req, schema);
}

const  getAll   =   async (req,res)  => {
    res.setHeader('Content-Type', 'application/json');
    let err, users;

    [err, users] = await to(Users.findAll({
        order: [['name', 'ASC']],
        include: [{model:Employee, attributes:['id']}]
    }));

    if (err) ReE(res, err, 422)

    let user_json = []

    for (let i in users) {
        let details = users[i];
        let info = details.toWeb();
        user_json.push(info);
    }

    return ReS(res, { users: user_json });
}
module.exports.getAll   =   getAll;

const  getOne   =   async (req,res)  => {
    res.setHeader('Content-Type', 'application/json');
    let err, users;
    let id = req.params.uuid;
    
    [err, users] = await to(Users.findAll({
        where: {
            uuid: id,
            is_active: 1
        },
        include: [
            { model: Roles }
        ]
    }));

    if (err) ReE(res, err, 422)

    let user_json = []

    for (let i in users) {
        let details = users[i];
        let userinfo = details.toWeb();
        user_json.push(userinfo);
    }

    return ReS(res, { users: user_json });
}
module.exports.getOne   =   getOne;

const update = async function (req, res) {
    let err, user, data
    let uuid    =   req.params.uuid;
    data = req.body;
    
    [err, user] = await to(Users.update(data, {
        where: {uuid: uuid}
    }));

    if (err) {
        if (err.message == 'Validation error') err = 'The email address  is already in use';
        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated User' });
}
module.exports.update = update;

const remove = async function (req, res) {
    let user, err;
    let id = req.params.uuid;
    [err, user] = await to(Users.destroy({
        where: { uuid: id }
    }));

    if (err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, { message: 'Deleted User' }, 204);

}
module.exports.remove = remove;