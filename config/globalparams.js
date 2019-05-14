var env = require('dotenv').config({path: __dirname + '/../.env'});//instatiate environment variables

let PRAMAS = {} ;//Make this global to use all over the application

PRAMAS.app          = process.env.APP   || 'dev';
PRAMAS.port         = process.env.PORT  || '9000';
PRAMAS.baseurl      = process.env.BASEURL   ||  'http://192.168.9.99:9000';

PRAMAS.db_dialect   = process.env.DB_DIALECT    || 'mysql';
PRAMAS.db_host      = process.env.DB_HOST       || 'localhost';
PRAMAS.db_port      = process.env.DB_PORT       || '3306';
PRAMAS.db_name      = process.env.DB_NAME       || 'hrms20102018';
PRAMAS.db_user      = process.env.DB_USER       || 'deepak';
PRAMAS.db_password  = process.env.DB_PASSWORD   || '';

PRAMAS.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
PRAMAS.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

var userRoles = PRAMAS.userRoles = {
    guest: 1,     // ...001 32bit conversion 
    user:  2,     // ...010
    admin: 4      // ...100
};

PRAMAS.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,    // ...111
    user:  userRoles.user | userRoles.admin,                       // ...110
    admin: userRoles.admin                                        // ...100
};

module.exports = PRAMAS;