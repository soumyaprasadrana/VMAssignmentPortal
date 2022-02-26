// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:00:59
 * @modify date 2022-02-26 18:00:59
 * @desc File Responsible for Technotes related API calls
 */
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
module.exports = {
    getAll: function(req, res, next) {
        const fn = "technotesmodule.js :-: getAll -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.technotes_rest_path,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    addTechnote: function(req, res, next) {
        if (req.body.params.ngxteam) {
            req.body.params.team = req.body.params.ngxteam;
            delete req.body.params.ngxteam;
        }
        if (req.body.params.is_global) {
            req.body.params.is_global = (req.body.params.is_global == 'Yes') ? true : false;
        }
        logger.info(req.body);
        _client.post(_client.getHttpPostOptions(req, config.technotes_add_rest_path), req, res, next);
    },
    updateTechnote: function(req, res, next) {
        req.body.params.id = req.params.id;
        if (req.body.params.ngxteam) {
            req.body.params.team = req.body.params.ngxteam;
            delete req.body.params.ngxteam;
        }
        if (req.body.params.is_global) {
            req.body.params.is_global = (req.body.params.is_global == 'Yes') ? true : false;
        }
        logger.info(req.body);
        _client.post(_client.getHttpPostOptions(req, config.technotes_update_rest_path), req, res, next);
    },
    deleteTechnote: function(req, res, next) {
        var technote = req.params['id']
        req.body.params = {};
        req.body.params.id = technote;
        req.body.params.description = technote;
        logger.info(req.body);
        _client.post(_client.getHttpPostOptions(req, config.technotes_remove_rest_path), req, res, next);
    },
}