/* Node Express Server Setup  */

const express = require('express');
var Q = require('Q');

var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')


var app = express();
app.disable('x-powered-by');
app.use(cookieParser());
app.use(cookieSession({
    secret: 'portal1234',
    key: 'portal',
    httpOny: true,
    secure: true,
    maxAge: null,
    sameSite: "None"
}))
app.use(express.static(__dirname));

/* Passport Authentication Setup */
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
var portalAuth = require('./api/portal-auth');

portalAuth.custStrategyConfigure();

passport.serializeUser(function(user, callback) {
    console.log("serializing " + JSON.stringify(user));
    callback(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log("deserializing " + obj);
    callback(null, obj);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.session.error = 'Please sign in!';
    res.redirect('/signin');
}


const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
/*Routes*/
app.get("/login", (req, res, next) => {
    res.send("<h1>Login Page</h1>");
});
app.post('/login', portalAuth.authenticate);
app.get("/success", (req, res, next) => {
    res.send("<h1>Success Page/h1>");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));