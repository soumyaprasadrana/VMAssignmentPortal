/**
 * Client to communicate with JAVA Rest API
 */
var http = require('http');
const { CONSOLE_APPENDER } = require('karma/lib/constants');
const { cookie } = require('request');
const tough = require('tough-cookie');
var request = require('request');
var request_promise = require('request-promise');
const { logger } = require('../config');
var config = require('../config')
module.exports = {
    authenticateToAPI: function(authString, userAgent, callback) {
        const fun = "client.js :-: authenticateToAPI";

        console.log("inside authenticateToAPI:" + authString);

        // verify auth credentials
        var extServerOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + '/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'text/html',
                'Authorization': authString,
                'User-Agent': userAgent
            }
        };
        try {
            request_promise(extServerOptions, function(error, response, body) {
                if (error) {
                    console.log("Error Occurred!");
                    err = {};
                    if (error.code == "ECONNREFUSED")
                        err.message = "Unable to connect VM Management Portal API , Contact System Administrator.";
                    else
                        err.message = error.code
                    callback(err, null);
                    return;
                }
                logger.info(fun + "- Authenticating to " + extServerOptions.uri);
                logger.debug(fun + "- Response Status:" + JSON.stringify(response));
                logger.debug(fun + "- Response headers:" + JSON.stringify(response.headers));

                body = JSON.parse(body);
                headers = JSON.parse(JSON.stringify(response.headers));


                if (body.status) {
                    permissions = JSON.parse(JSON.stringify(body.permissions))
                    logger.info(permissions)
                    logger.debug(fun + "- Authenticated successfully calling callback");
                    user = {};
                    user.name = body.user;
                    user.message = body.message;
                    user.auth = getCookie(headers['set-cookie'], "AUTH");
                    user.jsession = getCookie(headers['set-cookie'], "JSESSIONID");
                    user.authenticate = body.status;
                    var tempUser = {};
                    tempUser.name = body.user;
                    tempUser.permissions = permissions;
                    user.activeUser = tempUser;
                    callback(null, user)
                } else {
                    console.log("failed'");
                    err = {};
                    err.message = body.message;
                    callback(err, null);
                }
            })
        } catch (e) {
            err = {};
            err.message = "Internal Server Error occurred!";
            callback(err, null);
        }

        function getCookie(ckList, key) {
            // console.log("getCookie : " + ckList)
            for (var i = 0; i < ckList.length; i++) {
                // console.log("Inside for");
                // console.log(ckList[i]);
                cookieSplit = ckList[i].split(";");

                //  console.log("cookie" + cookieSplit);
                ck = cookieSplit[0].split("=");
                //   console.log(ck[0]);
                if (ck[0] == key) {
                    return cookieSplit[0].replace(ck[0] + '=', '');
                }

            }
        }


    },
    checkSession: function(req, res, next) {
        try {
            const fun = "client.js :-: checkSession";
            var session = req.session;
            console.log(typeof(session.passport));
            if (session.passport == null || typeof(session.passport) == 'undefined') {
                res.status(401).json({ "status": false });
                next();
                return;
            }

            // verify auth credentials
            var extServerOptions = {

                uri: config.apiBase + '/' + config.apiContextRoot + '/auth/ensureAuth/' + req.session.passport.user.jsession + '/' + req.session.passport.user.auth,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': req.headers['user-agent'] || req.headers['User-Agent']
                }

            };

            request_promise(extServerOptions, function(error, response, body) {
                logger.info(fun + "- Authenticating to " + extServerOptions.uri);
                logger.debug(fun + "- Response body:" + body);
                logger.debug(fun + "- Response headers:" + JSON.stringify(response.headers));
                if (body != '') {
                    body = JSON.parse(body);
                    headers = JSON.parse(JSON.stringify(response.headers));

                    if (body.status) {

                        res.status(200).json({ "status": true });

                        next();
                    } else {
                        req.session = null;
                        res.status(401).json({ "status": false });
                        next();
                    }
                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }

    },
    logout: function(req, res, next) {
        try {
            const fun = "client.js :-: logout";
            var session = req.session;
            console.log(typeof(session.passport));
            if (session.passport == null || typeof(session.passport) == 'undefined') {
                res.status(200).json({ "status": true });
                next();
                return;
            }

            // verify auth credentials
            var extServerOptions = {

                uri: config.apiBase + '/' + config.apiContextRoot + '/auth/signOut/' + req.session.passport.user.auth,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': req.headers['user-agent'] || req.headers['User-Agent']
                }

            };

            request_promise(extServerOptions, function(error, response, body) {
                logger.info(fun + "- Authenticating to " + extServerOptions.uri);
                logger.debug(fun + "- Response body:" + body);
                logger.debug(fun + "- Response headers:" + JSON.stringify(response.headers));
                if (body != '') {
                    body = JSON.parse(body);
                    headers = JSON.parse(JSON.stringify(response.headers));

                    if (body.status) {
                        req.session = null;
                        res.clearCookie('activeUser');
                        res.status(200).json({ "status": true });

                        next();
                    } else {
                        req.session = null;
                        res.cookie('user', '', { maxAge: 0 })
                        res.status(200).json({ "status": true });
                        next();
                    }
                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }

    },
    getCookie: function(ckList, key) {
        for (var i = 0; i < ckList.length; i++) {
            console.log(ckList[i]);
        }
    },
    get: function(httpOptions, req, res, next) {
        try {
            const fun = "client.js :-: get";
            var session = req.session;

            if (session.passport == null || typeof(session.passport) == 'undefined') {
                res.status(401).json({ "status": false });
                next();
                return;
            }

            request_promise.get(httpOptions, function(error, response, body) {

                logger.info(fun + "- GET request to " + httpOptions.uri);
                // logger.debug(fun + "- Response body:" + body);
                logger.debug(fun + "- Response headers:" + JSON.stringify(response));
                if (body) {
                    res.status(200).json(body);
                    next();

                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            }, function(error) {
                logger.info(fn + JSON.stringify(error));
                res.status(500).json({ "status": false });
                next();
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
    },
    post: function(httpOptions, req, res, next) {
        try {
            const fun = "client.js :-: post";
            var session = req.session;

            if (session.passport == null || typeof(session.passport) == 'undefined') {
                res.status(401).json({ "status": false });
                next();
                return;
            }

            request_promise.post(httpOptions.uri, httpOptions).then(function(body) {

                logger.info(fun + "- POST request to " + httpOptions.uri);

                logger.debug(fun + "- Response error:" + JSON.stringify(body));

                if (body) {
                    res.status(200).json(body);
                    next();

                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            }).catch(function(error) {
                logger.info(fun + JSON.stringify(error));
                res.status(500).json({ "status": false });
                next();
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
    },
    post_callback: function(httpOptions, req, res, next, callback) {
        try {
            const fun = "client.js :-: post";
            var session = req.session;

            if (session.passport == null || typeof(session.passport) == 'undefined') {
                res.status(401).json({ "status": false });
                next();
                return;
            }

            request_promise.post(httpOptions.uri, httpOptions).then(function(body) {

                logger.info(fun + "- POST request to " + httpOptions.uri);

                logger.debug(fun + "- Response error:" + JSON.stringify(body));

                if (body) {
                    callback(body);
                    next();

                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            }).catch(function(error) {
                logger.info(fn + JSON.stringify(error));
                res.status(500).json({ "status": false });
                next();
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
    },
    getStaticHeaders: function(req) {
        return {
            'Content-Type': 'application/json',
            'User-Agent': req.headers['user-agent'] || req.headers['User-Agent']
        };
    },
    getStaticQueryParam(req) {
        return {
            AUTH: req.user.auth,
            JSESSIONID: req.user.jsession

        };
    },
    getStaticCookieJar: function(req) {
        let cookie = new tough.Cookie({
            key: "AUTH",
            value: req.user.auth,
            httpOnly: true,

        });
        let cookie2 = new tough.Cookie({
            key: "JSESSIONID",
            value: req.user.jsession,
            httpOnly: true,

        });
        var cookiejar = request_promise.jar();
        cookiejar.setCookie(cookie, config.apiBase);
        cookiejar.setCookie(cookie2, config.apiBase);
        return cookiejar;
    },
    getHttpPostOptions: function(req, apiPath) {
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + apiPath,
            headers: this.getStaticHeaders(req),
            qs: this.getStaticQueryParam(req),
            jar: this.getStaticCookieJar(req),
            json: false,
            body: JSON.stringify(req.body.params)
        }
        return httpOptions;
    }

}