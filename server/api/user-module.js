/**
 * File Responsible for VM related API calls
 */
const tough = require('tough-cookie');
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
var request_promise = require('request-promise');
module.exports = {
    addUser: function(req, res, next) {

        var temp = {
            create_user: req.body.params.addUser,
            delete_user: req.body.params.removeUser,
            delete_vm: req.body.params.removeVM,
            update_user: req.body.params.editUser
        };
        req.body.params.authProtocol = temp;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.add_user_rest_path), req, res, next);

    },
    updateUser: function(req, res, next) {

        var temp = {
            create_user: req.body.params.addUser,
            delete_user: req.body.params.removeUser,
            delete_vm: req.body.params.removeVM,
            update_user: req.body.params.editUser
        };
        req.body.params.authProtocol = temp;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.update_user_rest_path), req, res, next);

    },
    changePassword: function(req, res, next) {
        logger.debug(req.body);
        if (req.body.params.user_pass != req.body.params.conf_pass) {
            res.status(402).json({ "status": false, "message": "Password and confirm password doesn't match !" });
            next();
            return;
        }
        _client.post(_client.getHttpPostOptions(req, config.user_pass_change), req, res, next);
    },
    getUsers: function(req, res, next) {
        logger.debug(req.body);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.users_path,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);

    },
    deleteUser: function(req, res, next) {
        //req.body.params.user_id = req.body.params.user;
        // delete req.body.params.user;
        var user_id = req.params['id']
        req.body.params = {}
        req.body.params.user_id = user_id;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.delete_uesr_path), req, res, next);

    },
    getUsersWithProtocols: function(req, res, next) {
        logger.debug(req.body);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.team_stats_path,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);

    },
    getTL: function(req, res, next) {
        logger.debug(req.body);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.teamLeads_path,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);

    },
    getUser: function(req, res, next) {
        var user_id = req.params['id']
        logger.debug(req.body);
        var _temp_qs = _client.getStaticQueryParam(req);
        _temp_qs.user_id = user_id;
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.user_path,
            headers: _client.getStaticHeaders(req),
            qs: _temp_qs,
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);

    }
}