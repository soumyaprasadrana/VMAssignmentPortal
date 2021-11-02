/**
 * File is responsible for passport authentication service for node API
 */


var passport = require('passport');
var passportCustom = require('passport-custom');
const { logger } = require('../config');

module.exports = {
    custStrategyConfigure: function() {
        logger.debug("Portal strategy set ");
        passport.use('portal-auth', new passportCustom(
            function(req, callback) {
                const fun = "portal-auth.js :-: custStrategyConfigure";
                logger.debug(fun + "-" + req.method);
                logger.debug(fun + "-" + JSON.stringify(req.body));
                // console.log(fun +"-"+req.headers.Authorization || req.headers.authorization);
                if (req.method !== "POST" || (!req.headers.Authorization && !req.headers.authorization)) {
                    logger.info(fun + "- Failed : No authorization header found.")
                    err = {}
                    err.message = "No authorization header found !"
                    callback(err, null);
                } else {

                    require('./client').authenticateToAPI(req.headers.Authorization || req.headers.authorization, req.headers['user-agent'] || req.headers['User-Agent'], function(err, user) {
                        logger.debug(fun + "- callback for authenticateToAPI");
                        callback(err, user);
                    });
                }
            }))
        passport.serializeUser(function(user, callback) {
            logger.info("serializing " + JSON.stringify(user.name));
            callback(null, user);
        });

        passport.deserializeUser(function(obj, callback) {
            logger.info("deserializing " + JSON.stringify(obj.name));
            callback(null, obj);
        });
        logger.debug("Portal strategy set Done ");
    },
    authenticate: function(req, res, next) {
        const fun = "portal-auth.js :-: Authenticate";
        logger.debug(fun);


        passport.authenticate('portal-auth', function(error, user) {
            logger.debug("Error:" + JSON.stringify(error) + "User:" + JSON.stringify(user))

            if (error) {
                logger.debug(fun + "- Error found while authenticating");
                res.status(200).json({ "status": false, "message": error.message });
                next(error);
                return;

            } else {
                logger.debug(fun + "- No error going to serialize the user");
                req.login(user, function(error) {
                    if (error) return next(error);
                    res.cookie('activeUser', JSON.stringify(user.activeUser));
                    res.status(200).json({ "status": true, "message": "Authentication Successfull", "permissons": user.permissons });
                    next();
                });

            }
        })

        (req, res, next);
    },
    checkSession: function(req, res, next) {
        require('./client').checkSession(req, res, next);
    },
    isAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {

            return res.status(200).json({ "status": true, "message": "Authenticated" });
        }
        return res.status(401).json({ "status": false, "message": "Unauthoized" })
    },
    ensureAuthenticated: function(req, res, next) {
        logger.debug("ensureAuthenticated:" + req.isAuthenticated());
        if (req.isAuthenticated()) {

            next();
            return;
        }
        res.redirect('/portal/login')
        next();
        return;
    },
    logOut: function(req, res, next) {
        require('./client').logout(req, res, next);
    }

}