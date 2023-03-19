// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 17:55:02
 * @modify date 2022-04-19 17:55:02
 * @desc File Responsible for VM related API calls
 */
const { logger } = require("../config");
var config = require("../config");
const _client = require("./client");
var sshMetadata = require("./sshMetadata");
var spaMetadata = require("../spa/spaMetadata");
var quickLinks = require("./quickLinks");
var lists = require("./lists");
module.exports = {
  getSSHMetadata: function(req, res, next) {
    res.status(200).json(sshMetadata);
    //next();
  },
  getQuickLinks: function(req, res, next) {
    res.status(200).json(quickLinks);
    //next();
  },
  getSPAMetadata: function(req, res, next) {
    res.status(200).json(spaMetadata);
    //next();
  },
  getListsNames: function(req, res, next) {
    res.status(200).json(Object.keys(lists.Lists));
    //next();
  },
  getListItems: function(req, res, next) {
    var listName = req.params.id;
    res.status(200).json(lists.Lists[listName]);
    //next();
  },

  getProps: function(req, res, next) {
    logger.debug(req.body);
    var httpOptions = {
      uri: config.apiBase + "/" + config.apiContextRoot + config.props_path,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  getThemeName: function(req, res, next) {
    const theme = config.theme ? config.theme : "default";
    res.status(200).json({ theme: theme });
    //next();
  },
  getUseToast: function(req, res, next) {
    const useToast = config.useToast ? config.useToast : false;
    res.status(200).json({ useToast: useToast });
    //next();
  },
  getUserDefinedFunctions: function(req, res, next) {
    const userDefinedFunctions = config.userDefinedFunctions
      ? config.userDefinedFunctions
      : [];
    res.status(200).json({ userDefinedFunctions: userDefinedFunctions });
    //next();
  },
  getEnableSSH: function(req, res, next) {
    const enableSSH2 = config.enableSSH2 ? config.enableSSH2 : false;
    res.status(200).json({ enableSSH2: enableSSH2 });
    //next();
  },
  redirectToUserdefinedFunctions: function(req, res, next) {
    const redirectToUserdefinedFunctions = config.redirectToUserdefinedFunctions
      ? config.redirectToUserdefinedFunctions
      : {};
    res
      .status(200)
      .json({ redirectToUserdefinedFunctions: redirectToUserdefinedFunctions });
    //next();
  },
  getLoginFooter: function(req, res, next) {
    const hideloginfooter = config.hideloginfooter
      ? config.hideloginfooter
      : false;
    res.status(200).json({ hideloginfooter: hideloginfooter });
    //next();
  },
  streamExec: function(req, res, next) {
    _client.post(
      _client.getHttpPostOptions(req, config.stream_exec),
      req,
      res,
      next
    );
  },
  getStreamOutput: function(req, res, next) {
    logger.debug(req.body);
    var file = req.params["file"];
    var threadID = req.params["threadID"];
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.stream_output +
        "/" +
        file +
        "/" +
        threadID,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
};
