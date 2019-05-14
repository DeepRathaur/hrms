const fs = require('fs');
var env  = require('dotenv').config({path: __dirname + '/../.env'});  //instatiate environment variables


module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host:     process.env.DB_HOST,
        dialect:  'mysql',
        timezone: 'Asia/Kolkata',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
          },
    },
    test: {
        username: 'database_test',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
        timezone: 'Asia/Kolkata'
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host:     process.env.DB_HOST,
        dialect: 'mysql',
        timezone: 'Asia/Kolkata',
        dialectOptions: {
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
            // }
        }
    }
};
