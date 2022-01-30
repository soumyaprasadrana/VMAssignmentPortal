/**
 * File Responsible for VM related API calls
 */
const tough = require('tough-cookie');
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
var request_promise = require('request-promise');
var sshMetadata = require('./sshMetadata');
module.exports = {
    getSSHMetadata: function(req, res, next) {
        res.status(200).json(sshMetadata);
        next();
    },
    getProps: function(req, res, next) {
        logger.debug(req.body);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.props_path,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);

    },
    streamExec: function(req, res, next) {
        _client.post(_client.getHttpPostOptions(req, config.stream_exec), req, res, next);
    },
    getStreamOutput: function(req, res, next) {
        logger.debug(req.body);
        var file = req.params['file'];
        var threadID = req.params['threadID']
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.stream_output + '/' + file + '/' + threadID,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    }

}