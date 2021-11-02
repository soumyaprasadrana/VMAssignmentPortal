/**
 * File Responsible for VM related API calls
 */
const tough = require('tough-cookie');
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
var request_promise = require('request-promise');
module.exports = {
    addTeam: function(req, res, next) {
        console.log(req.body);
        _client.post(_client.getHttpPostOptions(req, config.add_team_rest_path), req, res, next);

    },
    updateTeam: function(req, res, next) {
        console.log(req.body);
        var old_name = req.params['team'];
        req.body.params.old_name = old_name;
        req.body.params.update_data = true;
        console.log(req.body);
        _client.post(_client.getHttpPostOptions(req, config.update_team_rest_path), req, res, next);

    },
    updateProps: function(req, res, next) {

        _client.post(_client.getHttpPostOptions(req, config.update_props_rest_path), req, res, next);

    },
    createTeamLeader: function(req, res, next) {
        console.log(req.body);

        _client.post(_client.getHttpPostOptions(req, config.add_team_lead_rest_path), req, res, next);

    },
    getTeam: function(req, res, next) {
        var team_name = req.params['team']
        console.log(req.body);
        var _temp_qs = _client.getStaticQueryParam(req);
        _temp_qs.team_name = team_name;
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.get_team_path,
            headers: _client.getStaticHeaders(req),
            qs: _temp_qs,
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    getActivityLog: function(req, res, next) {
        var type = req.params['type']
        if (type == 'recent') {
            console.log(req.body);
            var _temp_qs = _client.getStaticQueryParam(req);
            var httpOptions = {
                uri: config.apiBase + '/' + config.apiContextRoot + config.get_recent_activitylogs,
                headers: _client.getStaticHeaders(req),
                qs: _temp_qs,
                jar: _client.getStaticCookieJar(req)
            }
            _client.get(httpOptions, req, res, next);
        } else if (type == 'next') {
            console.log(req.body);
            var _temp_qs = _client.getStaticQueryParam(req);
            var httpOptions = {
                uri: config.apiBase + '/' + config.apiContextRoot + config.get_next_activitylogs + '/' + req.params['activityId'],
                headers: _client.getStaticHeaders(req),
                qs: _temp_qs,
                jar: _client.getStaticCookieJar(req)
            }
            _client.get(httpOptions, req, res, next);

        } else if (type == 'prev') {
            console.log(req.body);
            var _temp_qs = _client.getStaticQueryParam(req);
            var httpOptions = {
                uri: config.apiBase + '/' + config.apiContextRoot + config.get_prev_activitylogs + '/' + req.params['activityId'],
                headers: _client.getStaticHeaders(req),
                qs: _temp_qs,
                jar: _client.getStaticCookieJar(req)
            }
            _client.get(httpOptions, req, res, next);

        }



    },
    updateTeamLead: function(req, res, next) {

        var temp = {
            is_teamLead: req.body.params.is_teamLead,
        };
        delete req.body.params.is_teamLead;
        req.body.params.authProtocol = temp;
        console.log(req.body);
        _client.post(_client.getHttpPostOptions(req, config.update_tl_rest_path), req, res, next);

    },
}