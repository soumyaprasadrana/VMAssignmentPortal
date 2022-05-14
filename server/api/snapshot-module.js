// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-05-13 17:55:02
 * @modify date 2022-05-13 17:55:02
 * @desc File Responsible for VM snapshot related API calls
 */
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
var percentage=0;
module.exports = {
    getSnapshots:function(req,res,next){
        const fn = "snapshot-module.js :-: getSnapshots -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        var hostname=req.params.hostname;
        logger.debug(fn+ "hostname=",hostname);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.vm_snapshots_rest_path,
            headers: _client.getStaticHeaders(req),
            qs: {
                AUTH: req.user.auth,
                JSESSIONID: req.user.jsession,
                hostname:hostname
            },
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    takeSnapshot:function(req,res,next){
        logger.info("takeSnapshot: ");
        _client.post(_client.getHttpPostOptions(req, config.vm_take_snapshot_rest_path), req, res, next);
    },
    revertSnapshot:function(req,res,next){
        logger.info("revertSnapshot: ");
        _client.post(_client.getHttpPostOptions(req, config.vm_revert_snapshot_rest_path), req, res, next);
    },
    getTaskStatus: function(req,res,next){
        logger.info("getTaskStatus :: ");
        logger.debug(req.body);
        var taskID = req.params['taskID'];
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.stream_task_status_output + '/' + taskID ,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
        
    }

}