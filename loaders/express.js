    // var newrelic = require('newrelic');
require('express-async-errors');
const winston =  require('winston');
const https = require('https');
const express = require('express');
const redis = require("redis");
const cookieSession = require('express-session');
const redisStore = require('connect-redis')(cookieSession);
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression'); 
const csrf = require('csurf');
const bodyParser = require('body-parser');


module.exports = async (app) => {
    // const config = require('config');
    // console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

    app.use(helmet.noCache());
    app.use(compression());
    app.use(express.static(path.join(__dirname, '../public')));
    app.enable('trust proxy');
    csrfProtection = csrf({ cookie: true })
    
    app.use(require('express-domain-middleware'));
    app.use(cors());
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
    app.use(cookieParser('cookiecnx'));
    app.use(cookieSession({
        secret: '1234567890TESTINTSRIKANTH', 
        cookie:{maxAge:60000000},
        resave: true,
        saveUninitialized: true
    }));

    process.on('uncaughtException', function (err, res) {
        console.log("exception error==" + err);
        winston.error(err.message, err)
        process.exit(1)
    }).on('unhandledRejection', function (err, res) {
        console.log("rejection error==" + err);
        winston.error(err.message, err)
        process.exit(1)
    });

    return app;
};
