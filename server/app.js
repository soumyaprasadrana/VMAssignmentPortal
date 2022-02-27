// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:08:48
 * @modify date 2022-02-26 18:08:48
 * @desc Entrypoint for the application
 */
const express = require('express');
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var expressPino = require('express-pino-logger');
const fileUpload = require('express-fileupload');
const passport = require('passport');
var path = require('path');
var config = require('./config');
var logger = config.logger;
var cors = require('cors');
const bodyParser = require('body-parser');
var compression = require('compression');
const gzipAll = require('gzip-all')
const fs = require("fs");

logger.info("Initializing node server");
logger.info("Checking node version ..." + global.process.version);

var app = express();
app.disable('x-powered-by');

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
if (config.useGzip) {
    // enable compression
    logger.info("Creating gzip files ...");
    gzipAll('../dist/VMPORTAL/*.js').then(newFiles => {
        logger.info('Created compressed files for javascript:');
        logger.info(newFiles);
    })
    gzipAll('../dist/VMPORTAL/*.css').then(newFiles => {
        logger.info('Created compressed files for css:');
        logger.info(newFiles);
    })
    app.use(compression());
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (config.useCORS) {
    app.use(cors());
}
const oneDay = 1000 * 60 * 60 * 24;
const twoHour = 1000 * 60 * 60 * 2;
app.use(cookieParser());
app.use(cookieSession({
        secret: 'portal1234',
        name: 'portal.session',
        keys: ['portal.sid'],
        httpOny: true,
        secure: false,
        maxAge: twoHour,
        site: 'None',
        saveUninitialized: true

    }))
    //app.use(express.static(__dirname));
app.use(express.static('../dist/VMPORTAL'));
app.use(express.static(__dirname + '/spa'));
app.set('view engine', 'pug');

/* Passport Authentication Setup */

app.use(passport.initialize());
app.use(passport.session());
var portalAuth = require('./api/portal-auth');
portalAuth.custStrategyConfigure();

/*Routes*/

require('./api/api-route')(app)
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
});

function getRoot(request, response) {
    response.sendFile(path.resolve('../dist/VMPORTAL/index.html'));
}

function getUndefined(request, response) {
    response.sendFile(path.resolve('../dist/VMPORTAL/index.html'));
}

function loadSPA(req, res) {
    const fun = "app.js :: loadSPA :: ";
    const app = req.params.app;
    if (!config.includedSPA.includes(app)) {
        logger.info(fun + app + "not found in included list.");
        res.status(200).send(app + " is not available please contact your system administrtor!");
    } else {
        const app_path = './spa/' + app + '/index.html';
        logger.debug("Resolved path :" + path.resolve(app_path));
        try {
            if (fs.existsSync(app_path)) {
                // path exists
                logger.info(fun + "Found single page application " + app + ". Resolving the application.");
                res.sendFile(path.resolve(app_path));
                //res.status(200).send(path.resolve(app_path));
            } else {
                logger.info(fun + app + " found in single page application list but unable to find application resotce inside spa .");
                res.status(200).send("Unable to find resource for " + app + " , please contact your system administrtor!");
            }
        } catch (e) {
            logger.debug(e);
            console.log(e);
            res.status(500).send("Internal Server Error!");
        }
    }
}

function loadSPAAsset(req, res) {
    const fun = "app.js :: loadSPAAsset :: ";
    const app = req.params.app;
    const reqUrl = req.url;
    var requestPath = reqUrl.replace('/portal/spa/' + app, '');
    if (requestPath.includes(app)) {
        requestPath = requestPath.replace('/' + app + '/', '');
    }
    logger.info("Asset requested :" + requestPath);
    if (!config.includedSPA.includes(app)) {
        logger.info(fun + app + "not found in included list.");
        res.status(200).send(app + " is not available please contact your system administrtor!");
    } else {
        const app_path = './spa/' + app + '/' + requestPath;
        logger.debug("Resolved path :" + path.resolve(app_path));
        try {
            if (fs.existsSync(app_path)) {
                // path exists
                logger.info(fun + "Asset found : " + requestPath + ' for app' + app + ". Resolving the file.");
                res.sendFile(path.resolve(app_path));
                //res.status(200).send(path.resolve(app_path));
            } else {
                logger.info(fun + app + " found in single page application list but unable to find application resotce inside spa .");
                res.status(200).send("Unable to find resource for " + app + " , please contact your system administrtor!");
            }
        } catch (e) {
            logger.debug(e);
            console.log(e);
            res.status(500).send("Internal Server Error!");
        }
    }
}
app.get('/portal', getRoot);
app.get('/portal/spa/:app', loadSPA);
app.get('/portal/spa/:app/*', loadSPAAsset);
app.get('/portal/login', getRoot);
app.get('/portal/home/*', getUndefined);
const port = config.PORT;
app.listen(port, () => logger.info('App listening on port ' + port));