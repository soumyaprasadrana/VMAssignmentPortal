// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create [date 2022-02-26 17:45:53]
 * @modify [date 2022-02-26 17:45:53]
 * @desc File Responsible for Admin features API calls
 */
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
module.exports = {
    /*
     * Function for creating teams
     */
    addTeam: function(req, res, next) {
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.add_team_rest_path), req, res, next);
    },
    /*
     * Function for updating teams
     */
    updateTeam: function(req, res, next) {
        logger.debug(req.body);
        var old_name = req.params['team'];
        req.body.params.old_name = old_name;
        req.body.params.update_data = true;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.update_team_rest_path), req, res, next);
    },
    /*
     * Function for updating system properties
     */
    updateProps: function(req, res, next) {
        _client.post(_client.getHttpPostOptions(req, config.update_props_rest_path), req, res, next);
    },
    /*
     * Function to promote a normal user to team lead
     */
    promteUser: function(req, res, next) {
        var user = req.params['user']
        req.body.params = {}
        req.body.params.user_name = user;
        req.body.params.user_id = user;
        req.body.params.authProtocol = {};
        req.body.params.authProtocol.is_teamLead = "Yes";
        _client.post(_client.getHttpPostOptions(req, config.promote_user), req, res, next);
    },
    /*
     * Function for creating team leader
     */
    createTeamLeader: function(req, res, next) {
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.add_team_lead_rest_path), req, res, next);
    },
    /*
     * Function helps deleting a team
     */
    deleteTeam: function(req, res, next) {
        var team_name = req.params['team']
        req.body.params = {}
        req.body.params.team_name = team_name;
        req.body.params.remove_data = true;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.delete_team_path), req, res, next);
    },
    /*
     * Return team metadata
     */
    getTeam: function(req, res, next) {
        var team_name = req.params['team']
        logger.debug(req.body);
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
    /*
     * Return Activity Logs
     */
    getActivityLog: function(req, res, next) {
        var type = req.params['type']
        if (type == 'recent') {
            logger.debug(req.body);
            var _temp_qs = _client.getStaticQueryParam(req);
            var httpOptions = {
                uri: config.apiBase + '/' + config.apiContextRoot + config.get_recent_activitylogs,
                headers: _client.getStaticHeaders(req),
                qs: _temp_qs,
                jar: _client.getStaticCookieJar(req)
            }
            _client.get(httpOptions, req, res, next);
        } else if (type == 'next') {
            logger.debug(req.body);
            var _temp_qs = _client.getStaticQueryParam(req);
            var httpOptions = {
                uri: config.apiBase + '/' + config.apiContextRoot + config.get_next_activitylogs + '/' + req.params['activityId'],
                headers: _client.getStaticHeaders(req),
                qs: _temp_qs,
                jar: _client.getStaticCookieJar(req)
            }
            _client.get(httpOptions, req, res, next);

        } else if (type == 'prev') {
            logger.debug(req.body);
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
    /*
     * Function helps updating a team lead user
     */
    updateTeamLead: function(req, res, next) {
        var temp = {
            is_teamLead: req.body.params.is_teamLead,
        };
        delete req.body.params.is_teamLead;
        req.body.params.authProtocol = temp;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.update_tl_rest_path), req, res, next);
    },
}