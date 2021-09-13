/**
 * File Responsible for VM related API calls
 */
const tough = require('tough-cookie');
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
var request_promise = require('request-promise');
module.exports = {
    getAll: function(req, res, next) {
        const fn = "vm-module.js :-: getAll -"
        logger.debug(fn + "JSESSIONID:" + req.user.jsession);
        logger.debug(fn + "AUTH:" + req.user.auth);

        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.vm_rest_path,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    addVM: function(req, res, next) {
        req.body.params.hostname = req.body.params.host;
        req.body.params.os = req.body.params.ngxos.split(" ")[0];
        req.body.params.os_ver = req.body.params.ngxos.replace(req.body.params.ngxos.split(" ")[0], "");
        req.body.params.team = req.body.params.ngxteam;
        req.body.params.vm_owner_lab = req.body.params.owner || '';
        req.body.params.ram = req.body.params.ram || 0;
        req.body.params.group = req.body.params.group || '';


        console.log(req.body);
        _client.post(_client.getHttpPostOptions(req, config.add_vm_rest_path), req, res, next);
    },
    updateVM: function(req, res, next) {
        req.body.params.hostname = req.body.params.host;
        req.body.params.os = req.body.params.ngxos.split(" ")[0];
        req.body.params.os_ver = req.body.params.ngxos.replace(req.body.params.ngxos.split(" ")[0], "");
        req.body.params.team = req.body.params.ngxteam;
        req.body.params.vm_owner_lab = req.body.params.owner || '';
        req.body.params.ram = req.body.params.ram || 0;
        req.body.params.group = req.body.params.group || '';


        console.log(req.body);
        _client.post(_client.getHttpPostOptions(req, config.update_vm_rest_path), req, res, next);
    }
}