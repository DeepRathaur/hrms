/**
 * @Basic Module dependency
 */
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');
const helmet = require('helmet');

const v1 = require('./routes/v1');
const app = express();
const PRAMAS = require('./config/globalparams');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Helmet is a collection of middleware to help set some security headers.
app.use(helmet(
    {
        frameguard:false,
        hidePoweredBy:true
    }
));

//Passport
app.use(passport.initialize());

//Log Env
console.log("Environment:", PRAMAS.app)

//DATABASE
const models = require("./models");


models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', PRAMAS.db_name);
})
    .catch(err => {
        console.error('Unable to connect to SQL database:', PRAMAS.db_name, err);
    });


if(PRAMAS.app==='dev'){
    models.sequelize.sync();//creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}

//static files read
app.use(express.static(__dirname+'/public'));

// CORS

var corsOptions = {
    origin: PRAMAS.baseurl,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var whitelist = ['http://192.168.9.104', 'http://192.168.9.99']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(cors());

app.use('/v1', v1);

app.use('/working', function(req, res){
    res.statusCode = 200;//send the appropriate status code
    res.json({status:"success", message:"HRMS Pending API", data:{}})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // return next(createError(404, 'Not Found.'))
   var err = new Error('Not Found');
   err.status = 404 ;
   // render the error page
   res.status(err.status || 404);
   res.json({errorcode: err.status ,error: 'Oops! Nothing to see here. You found a broken link.' });
});

// error handler
app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
   console.error('Uncaught Error', pe(error));
});

module.exports = app;