const { Users, Employee } = require('../models');
const validator = require('validator');
const { to, TE, ReE } = require('../services/util.service');

const createUser = async (userInfo) => {
    let unique_key, auth_info, err;

    auth_info = {};
    auth_info.status = 'create';

    unique_key = (userInfo.email);

    if (!unique_key) TE('An email  was not entered.');

    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';
        userInfo.email = unique_key;
        [err, user] = await to(Users.create(userInfo));
        if (err) TE('user already exists with that email');
        return user;
    } else {
        TE('A valid email  was not entered.');
    }
}
module.exports.createUser = createUser;


const authUser = async function (userInfo) {          //returns token
    let unique_key;
    unique_key = (userInfo.email);

    if (!unique_key) TE('Please enter an email to login');

    if (!userInfo.password) TE('Please enter a password to login');

    let user;
    if (validator.isEmail(unique_key)) {
        
        [err, user] = await to(Users.findOne({
            attributes: ['id', 'name', 'uuid', 'password', 'lognum'],
            where: {
                email: unique_key
            },
            include: [{model:Employee, attributes:['id','first_name']}]
        }));

        if (err) TE(err.message);

    } else {
        TE('A valid email  was not entered');
    }

    if (!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return user;

};
module.exports.authUser = authUser;