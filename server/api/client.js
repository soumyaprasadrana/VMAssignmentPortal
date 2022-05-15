// Copyright (c) 2022 soumy
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 17:54:18
 * @modify date 2022-04-19 17:54:18
 * @desc Client to communicate with JAVA Rest API
 */
const tough = require('tough-cookie');
var request_promise = require('request-promise');
const { logger } = require('../config');
var config = require('../config')
module.exports = {
    /*
     * Authenticate a user to JAVA Rest API
     */
    authenticateToAPI: function(authString, userAgent, callback) {
        const fun = "client.js :-: authenticateToAPI";
        logger.debug("inside authenticateToAPI:" + authString);
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
                    logger.debug("Error Occurred!");
                    err = {};
                    if (error.code == "ECONNREFUSED")
                        err.message = "Unable to connect VM Assignment Portal API , Contact System Administrator.";
                    else
                        err.message = error.code
                    callback(err, null);
                    return;
                }
                try{
                logger.info(fun + "- Authenticating to " + extServerOptions.uri);
                logger.debug(fun + "- Response Status:" + JSON.stringify(response));
                logger.debug(fun + "- Response headers:" + JSON.stringify(response.headers));
                logger.debug(fun + "- Response body:" + body)
                body = JSON.parse(body);
                headers = JSON.parse(JSON.stringify(response.headers))
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
                    tempUser.useToast=config.useToast;
                    tempUser.hideOwner=config.hideOwner;
                    tempUser.enableSnapshotManagements=config.enableSnapshotManagements;
                    tempUser.enableRichTextForVMComment=config.enableRichTextForVMComment;
                    tempUser.enableBadgeForSnapWarning=config.enableBadgeForSnapWarning;
                    user.activeUser = tempUser; 
                    callback(null, user)
                } else {
                    logger.debug("failed'");
                    err = {};
                    err.message = body.message;
                    callback(err, null);
                }}
                catch (e) {
                    err = {};
                    err.message = "Internal Server Error occurred!";
                    callback(err, null);
                }
            }).catch(function(error) {
                logger.info(fun + JSON.stringify(error));
                callback(error, null);
            });
        } catch (e) {
            err = {};
            err.message = "Internal Server Error occurred!";
            callback(err, null);
        }

        function getCookie(ckList, key) {
            for (var i = 0; i < ckList.length; i++) {
                cookieSplit = ckList[i].split(";");
                ck = cookieSplit[0].split("=");
                if (ck[0] == key) {
                    return cookieSplit[0].replace(ck[0] + '=', '');
                }

            }
        }
    },
    /*
     * Check if session is valid
     */
    checkSession: function(req, res, next) {
        try {
            const fun = "client.js :-: checkSession";
            var session = req.session;
            logger.debug(typeof(session.passport));
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
                if (error) {
                    logger.debug("Error Occurred!");
                    err = {};
                    if (error.code == "ECONNREFUSED")
                        err.message = "Unable to connect VM Assignment Portal API , Contact System Administrator.";
                    else
                        err.message = error.code
                    res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                    next();
                    return;
                }
                if (typeof response.headers == 'undefined') {
                    res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                    next();
                }
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
            }).catch(function(error) {
                logger.info(fun + JSON.stringify(error));
                res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                next();
            });
        } catch (e) {
            logger.debug(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
    },
    /*
     * Signout a user from Rest API
     */
    logout: function(req, res, next) {
        logger.debug("Inside logout")
        try {
            const fun = "client.js :-: logout";
            var session = req.session;
            logger.debug(typeof(session.passport));
            if (session.passport == null || typeof(session.passport) == 'undefined') {
                logger.debug("iniside if");
                res.status(200).json({ "status": true });
                next();
                return;
            }
            logger.debug("outside if");
            // verify auth credentials
            var extServerOptions = {
                uri: config.apiBase + '/' + config.apiContextRoot + '/auth/signOut/' + req.session.passport.user.auth,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/html',
                    'User-Agent': req.headers['user-agent'] || req.headers['User-Agent']
                }
            };
            logger.debug("before promise");
            request_promise(extServerOptions, function(error, response, body) {
                if (error) {
                    logger.debug("Error Occurred!");
                    err = {};
                    if (error.code == "ECONNREFUSED")
                        err.message = "Unable to connect VM Assignment Portal API , Contact System Administrator.";
                    else
                        err.message = error.code
                    res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                    next();
                    return;
                }
                if (typeof response.headers == 'undefined') {
                    res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                    next();
                }
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
            }).catch(function(error) {
                logger.info(fun + JSON.stringify(error));
                res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                next();
            });
        } catch (e) {
            logger.debug(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
        logger.debug("after promise");
    },
    /*
     * Return cookie from list
     */
    getCookie: function(ckList, key) {
        for (var i = 0; i < ckList.length; i++) {
            logger.debug(ckList[i]);
        }
    },
    /*
     * Get Call to Rest API
     * @httpOptions
     * @req
     * @res
     * @next
     */
    get: function(httpOptions, req, res, next) {
        try {
            const fun = "client.js :-: get";
            var session = req.session;
            if (session.passport == null || typeof(session.passport) == 'undefined') {
                res.status(401).json({ "status": false });
                next();
                return;
            }
            request_promise.get(httpOptions).then(function(body) {
                logger.info(fun + "- GET request to " + httpOptions.uri);
                logger.debug(fun + "- Response body:" + body);

                if (body) {
                    res.status(200).json(body);
                    next();
                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            }).catch(function(error) {
                logger.info(fun + JSON.stringify(error));
                res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                next();
            });
        } catch (e) {
            logger.debug(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
    },
    /*
     * POST Call to Rest API
     * @httpOptions
     * @req
     * @res
     * @next
     */
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
                logger.debug(fun + "- POST request httpOptions ", httpOptions);
                logger.debug(fun + "- Response body:" + JSON.stringify(body));
                if (body) {
                    res.status(200).json(body);
                    next();
                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            }).catch(function(error) {
                logger.info(fun + "- POST request to " + httpOptions.uri);
                logger.debug(fun + "- POST request httpOptions: " + JSON.stringify(httpOptions));
                logger.info(fun + "- Catch Block :" + JSON.stringify(error));
                res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                next();
            })
        } catch (e) {
            logger.debug(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
    },
    /*
     * Get Call to Rest API with custom callback
     * @httpOptions
     * @req
     * @res
     * @next
     * @callback
     */
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
                logger.debug(fun + "- Response :" + JSON.stringify(body));
                if (body) {
                    callback(body);
                    next();
                } else {
                    res.status(401).json({ "status": false });
                    next();
                }
            }).catch(function(error) {
                logger.info(fn + JSON.stringify(error));
                res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
                next();
            })
        } catch (e) {
            logger.debug(e);
            res.status(500).json({ "status": false, "message": "Inernal Server Error occurred." });
            next();
        }
    },
    /*
     * Get static headers for a Rest API call
     * @req
     */
    getStaticHeaders: function(req) {
        return {
            'Content-Type': 'application/json',
            'User-Agent': req.headers['user-agent'] || req.headers['User-Agent']
        };
    },
    /*
     * Get static query params for a Rest API call
     * @req
     */
    getStaticQueryParam(req) {
        return {
            AUTH: req.user.auth,
            JSESSIONID: req.user.jsession

        };
    },
    /*
     * Get static cookie jar for a Rest API call
     * @req
     */
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
    /*
     * Get static http post options for a Rest API call
     * @req
     */
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
    },
    /*
     * Get static http post options with custom query parameters for a Rest API call
     * @req
     */
    getHttpPostOptionsWithCustomQS: function(req, apiPath, qs) {
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + apiPath,
            headers: this.getStaticHeaders(req),
            qs: qs,
            jar: this.getStaticCookieJar(req),
            json: false,
            body: JSON.stringify(req.body.params)
        }
        return httpOptions;
    }
}