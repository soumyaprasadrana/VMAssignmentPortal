// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:00:59
 * @modify date 2022-04-19 18:00:59
 * @desc File Responsible for dynamicobjects related API calls
 */
const { logger } = require('../config');
var config = require('../config');
const _client = require('./client');
module.exports = {
    getAll: function(req, res, next) {
        const fn = "dynamicobjectsmodule.js :-: getAll -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.dynamicobjects_rest_path,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    getObject: function(req, res, next) {
        var id = req.params.id;
        const fn = "dynamicobjectsmodule.js :-: getObject -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.dynamicobjects_get_single_object_rest_path + '/' + id,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    getObjectRecords: function(req, res, next) {
        var id = req.params.app;
        const fn = "dynamicobjectsmodule.js :-: getObjectRecords -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.dynamicobjects_get_object_records_rest_path + '/' + id,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    getObjectAttributes: function(req, res, next) {
        var id = req.params.app;
        const fn = "dynamicobjectsmodule.js :-: getObjectAttributes -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        var httpOptions = {
            uri: config.apiBase + '/' + config.apiContextRoot + config.dynamicobjects_get_object_attributes_rest_path + '/' + id,
            headers: _client.getStaticHeaders(req),
            qs: _client.getStaticQueryParam(req),
            jar: _client.getStaticCookieJar(req)
        }
        _client.get(httpOptions, req, res, next);
    },
    addObjectRecord: function(req, res, next) {
        var id = req.params.app;
        const fn = "dynamicobjectsmodule.js :-: addObjectRecord -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        _client.post(_client.getHttpPostOptions(req, config.dynamicobjects_add_object_record_rest_path + '/' + id), req, res, next);
    },
    updateObjectRecord: function(req, res, next) {
        var id = req.params.app;
        const fn = "dynamicobjectsmodule.js :-: updateObjectRecord -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        _client.post(_client.getHttpPostOptions(req, config.dynamicobjects_update_object_record_rest_path + '/' + id), req, res, next);
    },
    deleteObjectRecord: function(req, res, next) {
        var id = req.params.app;
        const fn = "dynamicobjectsmodule.js :-: deleteObjectRecord -"
            //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
            //logger.debug(fn + "AUTH:" + req.user.auth);
        _client.post(_client.getHttpPostOptions(req, config.dynamicobjects_delete_object_record_rest_path + '/' + id), req, res, next);
    },

    addObject: function(req, res, next) {
        function validateRequest(req) {
            var params = req.body.params;
            if (params.length <= 0) {
                return { status: false, message: 'Params Missing!' }
            }
            if (params['properties'] == null || params['attributes'] == null || params['functions'] == null || typeof params['properties'] == 'undefined' || typeof params['attributes'] == 'undefined' || typeof params['functions'] == 'undefined')
                return { status: false, message: 'Params Missing!' }
            var attributes = params['attributes'];
            if (attributes.length === 0) {
                return { status: false, message: 'Minimum one attribute required to create an object.' };
            }
            for (var i = 0; i < attributes.length; i++) {
                if (attributes[i].type == 'number' && isNaN(attributes[i].defaultValue)) {
                    return { status: false, message: 'Type and Default Value Type Missmatch for attribute : ' + attributes[i].name + "! Default value should be a number." }
                }
                if ((attributes[i].isPrimaryKey == 'true' || attributes[i].isPrimaryKey == true) && (attributes[i].isNullable == 'true' || attributes[i].isNullable == true)) {
                    return { status: false, message: 'Primary Key can not be declared null please check isNullable field for : ' + attributes[i].name }
                }
                if (attributes[i].isNullable == false && (!attributes[i].defaultValue || attributes[i].defaultValue == null || attributes[i].defaultValue == '') && (attributes[i].validators == null || (attributes[i].validators != null && !attributes[i].validators.includes("required")))) {
                    return { status: false, message: 'An attribute which is not nullable must have a default value or a required validator please check configuration for attribute : ' + attributes[i].name }
                }
            }
            return { status: true };
        };
        console.log(req.body.params);
        var result = validateRequest(req);
        if (!result.status) {
            return res.status(200).json(result);
        }
        req.body.params.object = {};
        req.body.params.object.name = req.body.params.properties.name;
        req.body.params.object.description = req.body.params.properties.desc;
        req.body.params.object.scope = req.body.params.properties.scope;
        req.body.params.object.status = req.body.params.properties.status;
        req.body.params.object.attributes = req.body.params.attributes;
        req.body.params.object.functions = req.body.params.functions;
        delete req.body.params.attributes;
        delete req.body.params.functions;
        delete req.body.params.properties;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.dynamicobjects_add_rest_path), req, res, next);
    },
    updateObject: function(req, res, next) {
        function validateRequest(req) {
            var params = req.body.params;
            if (params.length <= 0) {
                return { status: false, message: 'Params Missing!' }
            }
            if (params['properties'] == null || params['attributes'] == null || params['functions'] == null || typeof params['properties'] == 'undefined' || typeof params['attributes'] == 'undefined' || typeof params['functions'] == 'undefined')
                return { status: false, message: 'Params Missing!' }
            var attributes = params['attributes'];
            if (attributes.length === 0) {
                return { status: false, message: 'Minimum one attribute required to create an object.' };
            }
            for (var i = 0; i < attributes.length; i++) {
                if (attributes[i].type == 'number' && isNaN(attributes[i].defaultValue)) {
                    return { status: false, message: 'Type and Default Value Type Missmatch for attribute : ' + attributes[i].name + "! Default value should be a number." }
                }
                if ((attributes[i].isPrimaryKey == 'true' || attributes[i].isPrimaryKey == true) && (attributes[i].isNullable == 'true' || attributes[i].isNullable == true)) {
                    return { status: false, message: 'Primary Key can not be declared null please check isNullable field for : ' + attributes[i].name }
                }
            }
            return { status: true };
        };
        console.log(req.body.params);
        var result = validateRequest(req);
        if (!result.status) {
            return res.status(200).json(result);
        }
        req.body.params.object = {};
        req.body.params.object.name = req.body.params.properties.name;
        req.body.params.object.description = req.body.params.properties.desc;
        req.body.params.object.scope = req.body.params.properties.scope;
        req.body.params.object.status = req.body.params.properties.status;
        req.body.params.object.attributes = req.body.params.attributes;
        req.body.params.object.functions = req.body.params.functions;
        delete req.body.params.attributes;
        delete req.body.params.functions;
        delete req.body.params.properties;
        logger.debug(req.body);
        _client.post(_client.getHttpPostOptions(req, config.dynamicobjects_update_rest_path), req, res, next);
    },
    deleteObject: function(req, res, next) {
        var object = req.params['id']
        req.body.params = {};
        req.body.params.name = object;
        req.body.params.description = object;
        logger.info(req.body);
        _client.post(_client.getHttpPostOptions(req, config.dynamicobjects_delete_rest_path), req, res, next);
    },
}