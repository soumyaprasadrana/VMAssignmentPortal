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
    createTeamLeader: function(req, res, next) {
        console.log(req.body);

        _client.post(_client.getHttpPostOptions(req, config.add_team_lead_rest_path), req, res, next);

    }
}