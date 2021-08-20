/**
 * File is responsible for passport authentication service for node API
 */

var passport = require('passport');
var passportCustom = require('passport-custom');

module.exports = {
    custStrategyConfigure: function() {
        console.log("Portal strategy set ");
        passport.use('portal-auth', new passportCustom(
            function(req, callback) {
                console.log(req.method);
                console.log(req.headers.Authorization || req.headers.authorization);
                if (req.method !== "POST" || (!req.headers.Authorization && !req.headers.authorization)) {
                    console.log("Failed : No authorixation string found.")
                    callback(null, false);
                } else {
                    console.log("True")
                    require('./client').authenticateToAPI(req.headers.Authorization || req.headers.authorization, function(err, user) {
                        if (err) {
                            callback(err, user);
                            return;
                        }
                        if (user.authenticate) {
                            console.log("Successfully authenticated for the user :" + user.name)
                            callback(err, user);
                            return;
                        }
                    });
                }
            }))

        console.log("Portal strategy set Done ");
    },
    authenticate: function(req, res, next) {
        console.log("Authenticate called");
        passport.authenticate('portal-auth', function(error, user) {
            console.log("Error:" + error, "User:" + user)
            if (error) {
                console.log("Erro occured setting response code to unauthorized");
                res.status(400).json({ "statusCode": 200, "message": "Not Authenticated" });
                next(error);
                return;

            } else {
                console.log("No error going to seraize the user");
                req.login(user, function(error) {
                    if (error) return next(error);
                    res.status(200).json({ "statusCode": 200, "message": "Successfully LogedIn" });
                    next();
                });
            }
        })(req, res, next);
    },
    isAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        return res.status(400).json({ "statusCode": 400, "message": "not authenticated" })
    }

}