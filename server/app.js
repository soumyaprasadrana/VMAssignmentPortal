const express = require('express');
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var expressPino = require('express-pino-logger');
var session = require('express-session')
const passport = require('passport');
var path = require('path');
var config = require('./config');
var logger = config.logger;
var cors = require('cors');
const bodyParser = require('body-parser');
const expressLogger = expressPino({ logger });
logger.info("Initializing node server");
logger.info("Checking node version ..." + global.process.version);

var app = express();
app.disable('x-powered-by');




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
    /*const oneDay = 1000 * 60 * 60 * 24;
    app.use(session({
        secret: 'portal1234',
        key: 'portal.sid',
        httpOnly: true,
        resave: false,
        cookie: { maxAge: oneDay },
        saveUninitialized: true
    }))


    */

//app.use(express.static(__dirname));
app.use(express.static('../dist/VMPORTAL'))
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
app.get('/portal', getRoot);
app.get('/portal/login', getRoot);
app.get('/portal/home/*', portalAuth.ensureAuthenticated, getUndefined);

const port = config.PORT;
app.listen(port, () => logger.info('App listening on port ' + port));