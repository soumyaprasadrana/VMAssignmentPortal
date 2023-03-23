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
const { logger } = require("../config");
var config = require("../config");
const _client = require("./client");
module.exports = {
  getAll: function(req, res, next) {
    const fn = "dynamicobjectsmodule.js :-: getAll -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_rest_path,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  getObject: function(req, res, next) {
    var id = req.params.id;
    const fn = "dynamicobjectsmodule.js :-: getObject -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_get_single_object_rest_path +
        "/" +
        id,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  getObjectRecords: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: getObjectRecords -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_get_object_records_rest_path +
        "/" +
        id,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  getObjectAttributes: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: getObjectAttributes -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_get_object_attributes_rest_path +
        "/" +
        id,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  getObjectFunctions: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: getObjectFunctions -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_get_object_functions_rest_path +
        "/" +
        id,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  getObjectFormEnabled: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: getObjectFormEnabled -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_check_object_enableform_rest_path +
        "/" +
        id,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  getObjectAttributesForObjectForm: function(req, res, next) {
    var id = req.params.id;
    const fn = "dynamicobjectsmodule.js :-: getObjectAttributesForObjectForm -";
    logger.info(fn + "entry");
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_anonymous_form_attributes_rest_path +
        "/" +
        id,
      headers: _client.getStaticHeaders(req),
    };
    _client.getunauthorized(httpOptions, req, res, next);
  },
  getUsersForObjectForm: function(req, res, next) {
    const fn = "dynamicobjectsmodule.js :-: getUsersForObjectForm -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_anonymous_form_users_rest_path,
      headers: _client.getStaticHeaders(req),
    };
    _client.getunauthorized(httpOptions, req, res, next);
  },
  getTeamsForObjectForm: function(req, res, next) {
    const fn = "dynamicobjectsmodule.js :-: getTeamsForObjectForm -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.dynamicobjects_anonymous_form_teams_rest_path,
      headers: _client.getStaticHeaders(req),
    };
    _client.getunauthorized(httpOptions, req, res, next);
  },
  dynamicobjectappFormSubmit: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: dynamicobjectappFormSubmit -";
    logger.debug(fn + "entry");
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    logger.debug(fn + "req.body.params", req.body.params);
    var form = req.body.params.form;
    logger.debug(fn + "form", form);
    var metadata = req.body.params.metadata;
    if (config.sanitizeAllCustomAppsFields) {
      if (typeof form != "undefined" && typeof metadata != "undefined") {
        for (var key in form) {
          if (metadata[key] != "richtext")
            form[key] = _client.encodeHTML(form[key]);
        }
      }
    }
    delete req.body.params.form;
    delete req.body.params.metadata;
    req.body.params = form;
    _client.postunauthorized(
      _client.getUnauthorizedHttpPostOptions(
        req,
        config.dynamicobjects_anonymous_form_submit_rest_path + "/" + id
      ),
      req,
      res,
      next
    );
  },
  addObjectRecord: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: addObjectRecord -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var form = req.body.params.form;
    var metadata = req.body.params.metadata;
    if (config.sanitizeAllCustomAppsFields) {
      if (typeof form != "undefined" && typeof metadata != "undefined") {
        for (var key in form) {
          if (metadata[key] != "richtext")
            form[key] = _client.encodeHTML(form[key]);
        }
      }
    }
    delete req.body.params.form;
    delete req.body.params.metadata;
    req.body.params = form;
    _client.post(
      _client.getHttpPostOptions(
        req,
        config.dynamicobjects_add_object_record_rest_path + "/" + id
      ),
      req,
      res,
      next
    );
  },
  updateObjectRecord: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: updateObjectRecord -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var form = req.body.params.form;
    var metadata = req.body.params.metadata;
    if (config.sanitizeAllCustomAppsFields) {
      if (typeof form != "undefined" && typeof metadata != "undefined") {
        for (var key in form) {
          if (metadata[key] != "richtext")
            form[key] = _client.encodeHTML(form[key]);
        }
      }
    }
    delete req.body.params.form;
    delete req.body.params.metadata;
    req.body.params = form;

    _client.post(
      _client.getHttpPostOptions(
        req,
        config.dynamicobjects_update_object_record_rest_path + "/" + id
      ),
      req,
      res,
      next
    );
  },
  getObjectRecordCount: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: getObjectRecordCount -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    _client.post(
      _client.getHttpPostOptions(
        req,
        config.dynamicobjects_get_object_record_count_rest_path + "/" + id
      ),
      req,
      res,
      next
    );
  },
  deleteObjectRecord: function(req, res, next) {
    var id = req.params.app;
    const fn = "dynamicobjectsmodule.js :-: deleteObjectRecord -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    _client.post(
      _client.getHttpPostOptions(
        req,
        config.dynamicobjects_delete_object_record_rest_path + "/" + id
      ),
      req,
      res,
      next
    );
  },

  addObject: function(req, res, next) {
    function validateRequest(req) {
      var params = req.body.params;
      if (params.length <= 0) {
        return { status: false, message: "Params Missing!" };
      }
      if (
        params["properties"] == null ||
        params["attributes"] == null ||
        params["functions"] == null ||
        typeof params["properties"] == "undefined" ||
        typeof params["attributes"] == "undefined" ||
        typeof params["functions"] == "undefined"
      )
        return { status: false, message: "Params Missing!" };
      var attributes = params["attributes"];
      if (attributes.length === 0) {
        return {
          status: false,
          message: "Minimum one attribute required to create an object.",
        };
      }
      var tempAtrr = [];
      var duplicateAttr = [];
      var isContainsPrimaryKeyOrAutokey = false;
      for (var i = 0; i < attributes.length; i++) {
        if (tempAtrr.indexOf(attributes[i].name) === -1) {
          tempAtrr.push(attributes[i].name);
        } else {
          duplicateAttr.push({ index: i + 1, value: attributes[i].name });
        }
        if (
          attributes[i].isPrimaryKey == "true" ||
          attributes[i].isPrimaryKey == true ||
          attributes[i].type == "autokey"
        ) {
          isContainsPrimaryKeyOrAutokey = true;
        }
        if (
          attributes[i].type == "number" &&
          isNaN(attributes[i].defaultValue)
        ) {
          return {
            status: false,
            message:
              "Type and Default Value Type Missmatch for attribute : " +
              attributes[i].name +
              "! Default value should be a number.",
          };
        }
        if (
          (attributes[i].isPrimaryKey == "true" ||
            attributes[i].isPrimaryKey == true) &&
          (attributes[i].isNullable == "true" ||
            attributes[i].isNullable == true)
        ) {
          return {
            status: false,
            message:
              "Primary Key can not be declared null please check isNullable field for : " +
              attributes[i].name,
          };
        }
        if (
          attributes[i].isNullable == false &&
          (!attributes[i].defaultValue ||
            attributes[i].defaultValue == null ||
            attributes[i].defaultValue == "") &&
          (attributes[i].validators == null ||
            (attributes[i].validators != null &&
              !attributes[i].validators.includes("required")))
        ) {
          return {
            status: false,
            message:
              "An attribute which is not nullable must have a default value or a required validator please check configuration for attribute : " +
              attributes[i].name,
          };
        }
      }
      if (duplicateAttr.length != 0) {
        var message =
          "Schema validation failed, duplicate attribute entry found at below indexes: ";
        for (var i = 0; i < duplicateAttr.length; i++) {
          message +=
            "<br> Index: " +
            duplicateAttr[i].index +
            " Attribute Name=" +
            duplicateAttr[i].value;
        }
        return { status: false, message: message };
      }
      if (!isContainsPrimaryKeyOrAutokey) {
        return {
          status: false,
          message:
            "Failed! An object can not be created without a primary/auto key.",
        };
      }
      return { status: true };
    }
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
    if (req.body.params.properties.enableform)
      req.body.params.object.enableform = req.body.params.properties.enableform;
    delete req.body.params.attributes;
    delete req.body.params.functions;
    delete req.body.params.properties;
    logger.debug(req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.dynamicobjects_add_rest_path),
      req,
      res,
      next
    );
  },
  updateObject: function(req, res, next) {
    function validateRequest(req) {
      var params = req.body.params;
      if (params.length <= 0) {
        return { status: false, message: "Params Missing!" };
      }
      if (
        params["properties"] == null ||
        params["attributes"] == null ||
        params["functions"] == null ||
        typeof params["properties"] == "undefined" ||
        typeof params["attributes"] == "undefined" ||
        typeof params["functions"] == "undefined"
      )
        return { status: false, message: "Params Missing!" };
      var attributes = params["attributes"];
      if (attributes.length === 0) {
        return {
          status: false,
          message: "Minimum one attribute required to create an object.",
        };
      }
      var tempAtrr = [];
      var duplicateAttr = [];
      var isContainsPrimaryKeyOrAutokey = false;
      for (var i = 0; i < attributes.length; i++) {
        if (tempAtrr.indexOf(attributes[i].name) === -1) {
          tempAtrr.push(attributes[i].name);
        } else {
          duplicateAttr.push({ index: i + 1, value: attributes[i].name });
        }
        if (
          attributes[i].isPrimaryKey == "true" ||
          attributes[i].isPrimaryKey == true ||
          attributes[i].type == "autokey"
        ) {
          isContainsPrimaryKeyOrAutokey = true;
        }
        if (
          attributes[i].type == "number" &&
          isNaN(attributes[i].defaultValue)
        ) {
          return {
            status: false,
            message:
              "Type and Default Value Type Missmatch for attribute : " +
              attributes[i].name +
              "! Default value should be a number.",
          };
        }
        if (
          (attributes[i].isPrimaryKey == "true" ||
            attributes[i].isPrimaryKey == true) &&
          (attributes[i].isNullable == "true" ||
            attributes[i].isNullable == true)
        ) {
          return {
            status: false,
            message:
              "Primary Key can not be declared null please check isNullable field for : " +
              attributes[i].name,
          };
        }
        if (
          attributes[i].isNullable == false &&
          (!attributes[i].defaultValue ||
            attributes[i].defaultValue == null ||
            attributes[i].defaultValue == "") &&
          (attributes[i].validators == null ||
            (attributes[i].validators != null &&
              !attributes[i].validators.includes("required")))
        ) {
          return {
            status: false,
            message:
              "An attribute which is not nullable must have a default value or a required validator please check configuration for attribute : " +
              attributes[i].name,
          };
        }
      }
      if (duplicateAttr.length != 0) {
        var message =
          "Schema validation failed, duplicate attribute entry found at below indexes: ";
        for (var i = 0; i < duplicateAttr.length; i++) {
          message +=
            "<br> Index: " +
            duplicateAttr[i].index +
            " Attribute Name=" +
            duplicateAttr[i].value;
        }
        return { status: false, message: message };
      }
      if (!isContainsPrimaryKeyOrAutokey) {
        return {
          status: false,
          message:
            "Failed! An object can not be created without a primary/auto key.",
        };
      }
      return { status: true };
    }
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
    if (req.body.params.properties.enableform)
      req.body.params.object.enableform = req.body.params.properties.enableform;
    delete req.body.params.attributes;
    delete req.body.params.functions;
    delete req.body.params.properties;
    logger.debug(req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.dynamicobjects_update_rest_path),
      req,
      res,
      next
    );
  },
  deleteObject: function(req, res, next) {
    var object = req.params["id"];
    req.body.params = {};
    req.body.params.name = object;
    req.body.params.description = object;
    logger.info(req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.dynamicobjects_delete_rest_path),
      req,
      res,
      next
    );
  },
  getUserFunction: async function(req, res, next) {
    const funName = req.params.id;
    try {
      const userFun = require("./functions/" + funName + "/client");
      console.log(userFun);
      res.status(200).json({
        status: true,
        function: userFun["client"].toString(),
      });
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send({ status: false, message: "Requested function not found!" });
    }
    /*console.log(_functions);
    if (
      _functions[funName + "client"] &&
      _functions[funName + "client"].toString()
    )
      res.status(200).json({
        status: true,
        function: _functions[funName + "client"].toString(),
      });
    else
      res
        .status(404)
        .send({ status: false, message: "Requested function not found!" });*/
  },
  getUserFunctionTemplate: function(req, res, next) {
    const funName = req.params.id;
    /*if (
      _functions[funName + "template"] &&
      _functions[funName + "template"].toString()
    )
      res.status(200).json({
        status: true,
        template: _functions[funName + "template"].toString(),
      });
    else
      res
        .status(500)
        .send({ status: false, message: "Requested function not found!" });*/
    try {
      const userFun = require("./functions/" + funName + "/template");
      console.log(userFun);
      res.status(200).json({
        status: true,
        template: userFun["template"].toString(),
      });
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send({ status: false, message: "Requested function not found!" });
    }
  },
  runUserFunctionServerFunction: function(req, res, next) {
    const funName = req.params.id;
    /*try {
      _functions[funName + "server"](req, res, next);
      next();
    } catch (e) {
      res.status(500).json({
        status: false,
        message:
          "Error occurred while invoking custom function." + e.toString(),
      });
    }*/
    try {
      const userFun = require("./functions/" + funName + "/server");
      console.log(userFun);
      userFun["server"](req, res, next);
    } catch (e) {
      console.log(e);
      res
        .status(404)
        .send({ status: false, message: "Requested function not found!" });
    }
  },
};
