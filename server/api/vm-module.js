// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:03:08
 * @modify date 2022-03-25 18:03:08
 * @desc File Responsible for VM related API calls
 */
const { logger } = require("../config");
var config = require("../config");
const _client = require("./client");
var request_promise = require("request-promise");
const XLSX = require("xlsx");
const ExcelJS = require("exceljs");

module.exports = {
  getAll: function(req, res, next) {
    const fn = "vm-module.js :-: getAll -";
    //logger.debug(fn + "JSESSIONID:" + req.user.jsession);
    //logger.debug(fn + "AUTH:" + req.user.auth);
    var httpOptions = {
      uri: config.apiBase + "/" + config.apiContextRoot + config.vm_rest_path,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  addVM: function(req, res, next) {
    req.body.params.hostname = req.body.params.host;
    req.body.params.os = req.body.params.ngxos.split(" ")[0];
    req.body.params.os_ver = req.body.params.ngxos.replace(
      req.body.params.ngxos.split(" ")[0],
      ""
    );
    req.body.params.team = req.body.params.ngxteam;
    req.body.params.vm_owner_lab = req.body.params.owner || "";
    req.body.params.ram = req.body.params.ram || 0;
    req.body.params.group = req.body.params.group || "";
    logger.info(req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.add_vm_rest_path),
      req,
      res,
      next
    );
  },
  assignMultipleVMS: function(req, res, next) {
    logger.info("assignMultipleVMS:req.body>", req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.assign_multiple_vms_rest_path),
      req,
      res,
      next
    );
  },
  releaseMultipleVMS: function(req, res, next) {
    logger.info("releaseMultipleVMS:req.body>", req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.release_multiple_vms_rest_path),
      req,
      res,
      next
    );
  },
  assignVM: function(req, res, next) {
    logger.info("assignVM:req.body>", req.body);
    logger.info("req.body.params.ip>", req.body.params.ip);
    logger.info("req.body.params.user>", req.body.params.user);
    _client.post(
      _client.getHttpPostOptionsWithCustomQS(req, config.assign_vm_rest_path, {
        AUTH: req.user.auth,
        JSESSIONID: req.user.jsession,
        ip: req.body.params.ip,
        user: req.body.params.user,
      }),
      req,
      res,
      next
    );
  },
  releaseVM: function(req, res, next) {
    logger.info("assignVM:req.body>", req.body);
    logger.info("req.body.params.ip>", req.body.params.ip);

    _client.post(
      _client.getHttpPostOptionsWithCustomQS(req, config.release_vm_rest_path, {
        AUTH: req.user.auth,
        JSESSIONID: req.user.jsession,
        ip: req.body.params.ip,
      }),
      req,
      res,
      next
    );
  },
  updateVM: function(req, res, next) {
    req.body.params.hostname = req.body.params.host;
    req.body.params.os = req.body.params.ngxos.split(" ")[0];
    req.body.params.os_ver = req.body.params.ngxos.replace(
      req.body.params.ngxos.split(" ")[0],
      ""
    );
    req.body.params.team = req.body.params.ngxteam;
    req.body.params.vm_owner_lab = req.body.params.owner || "";
    req.body.params.ram = req.body.params.ram || 0;
    req.body.params.group = req.body.params.group || "";
    logger.info(req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.update_vm_rest_path),
      req,
      res,
      next
    );
  },
  updateMultipleVMS: function(req, res, next) {
    if (req.body.params.fields.ngxos) {
      req.body.params.fields.os = req.body.params.fields.ngxos.split(" ")[0];
      req.body.params.fields.os_ver = req.body.params.fields.ngxos.replace(
        req.body.params.fields.ngxos.split(" ")[0],
        ""
      );
      delete req.body.params.fields.ngxos;
    }
    if (req.body.params.fields.ngxteam) {
      req.body.params.fields.team = req.body.params.fields.ngxteam;
      delete req.body.params.fields.ngxteam;
    }
    if (req.body.params.fields.owner) {
      req.body.params.fields.vm_owner_lab = req.body.params.fields.owner;
      delete req.body.params.fields.owner;
    }
    delete req.body.params.fields.ip;
    logger.debug(
      "req.body.params.fields.length",
      typeof Object.keys(req.body.params.fields).length
    );
    if (Object.keys(req.body.params.fields).length == 0) {
      res.status(400).json({ status: "Failed", message: "Bad Request" });
      return;
    }
    logger.info(req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.update_multiple_vms_rest_path),
      req,
      res,
      next
    );
  },
  getAdditional: function(req, res, next) {
    var ip = req.params["ip"];
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.vm_additional_data +
        "/" +
        ip,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  updateAdditional: function(req, res, next) {
    var ip = req.params["ip"];
    _client.post(
      _client.getHttpPostOptionsWithCustomQS(
        req,
        config.update_vm_additional_data,
        {
          AUTH: req.user.auth,
          JSESSIONID: req.user.jsession,
          ip: ip,
        }
      ),
      req,
      res,
      next
    );
  },
  getRelatedvms: function(req, res, next) {
    var ip = req.params["ip"];
    var httpOptions = {
      uri:
        config.apiBase +
        "/" +
        config.apiContextRoot +
        config.related_vms_data +
        "/" +
        ip,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    _client.get(httpOptions, req, res, next);
  },
  updateRelatedvms: function(req, res, next) {
    var ip = req.params["ip"];
    _client.post(
      _client.getHttpPostOptionsWithCustomQS(req, config.update_related_vms, {
        AUTH: req.user.auth,
        JSESSIONID: req.user.jsession,
        ip: ip,
      }),
      req,
      res,
      next
    );
  },
  deleteVM: function(req, res, next) {
    var ip = req.params["ip"];
    req.body.params = {};
    req.body.params.ip = ip;
    logger.info(req.body);
    _client.post(
      _client.getHttpPostOptions(req, config.delete_vm_rest_path),
      req,
      res,
      next
    );
  },
  addComment: function(req, res, next) {
    var ip = req.params["ip"];
    req.body.params.ip = ip;
    logger.info(req.body);
    _client.post(
      _client.getHttpPostOptionsWithCustomQS(
        req,
        config.add_comment_to_vm_rest_path,
        {
          AUTH: req.user.auth,
          JSESSIONID: req.user.jsession,
          ip: req.body.params.ip,
          comment: req.body.params.comment,
        }
      ),
      req,
      res,
      next
    );
  },
  upload: async function(req, res, next) {
    function checkDataValidation(xlsData) {
      var fun = "checkDataValidation";
      var aPromise = new Promise(function(resolve, reject) {
        var httpOptions = {
          uri: config.apiBase + "/" + config.apiContextRoot + config.props_path,
          headers: _client.getStaticHeaders(req),
          qs: _client.getStaticQueryParam(req),
          jar: _client.getStaticCookieJar(req),
        };
        console.log(httpOptions);
        request_promise
          .get(httpOptions)
          .then(function(body) {
            logger.info(fun + "- GET request to " + httpOptions.uri);
            logger.debug(fun + "- Response body:" + body);
            var teamList = [];
            if (body) {
              var propJson = JSON.parse(body);
              teamList = propJson.teamList.split(":");
            }
            console.log(teamList);
            console.log(req.user.activeUser.permissions.is_admin);
            if (
              typeof req.user.activeUser.permissions.is_admin != "undefined" &&
              (req.user.activeUser.permissions.is_admin == 1 ||
                req.user.activeUser.permissions.is_admin == "1") &&
              teamList.length > 0
            ) {
              for (var item in xlsData) {
                console.log(
                  " validation check for :: " + xlsData[item]["IP Address"]
                );
                if (!teamList.includes(xlsData[item]["Team"])) {
                  resolve({
                    status: false,
                    message:
                      "Invalid team for vm with ip " +
                      xlsData[item]["IP Address"],
                  });
                }
                if (
                  xlsData[item]["Team"] == null ||
                  xlsData[item]["Team"] == "" ||
                  xlsData[item]["IP Address"] == null ||
                  xlsData[item]["IP Address"] == "" ||
                  xlsData[item]["Hostname"] == null ||
                  xlsData[item]["Hostname"] == "" ||
                  xlsData[item]["OS"] == null ||
                  xlsData[item]["OS"] == "" ||
                  xlsData[item]["OS Version"] == null ||
                  xlsData[item]["OS Version"] == ""
                ) {
                  resolve({
                    status: false,
                    message:
                      "Mandatory field missing for vm with ip " +
                      xlsData[item]["IP Address"],
                  });
                }
              }
              resolve({ status: true });
            }
            for (var item in xlsData) {
              console.log(
                " validation check for :: " + xlsData[item]["IP Address"]
              );
              if (
                xlsData[item]["Team"] == null ||
                xlsData[item]["Team"] == "" ||
                xlsData[item]["IP Address"] == null ||
                xlsData[item]["IP Address"] == "" ||
                xlsData[item]["Hostname"] == null ||
                xlsData[item]["Hostname"] == "" ||
                xlsData[item]["OS"] == null ||
                xlsData[item]["OS"] == "" ||
                xlsData[item]["OS Version"] == null ||
                xlsData[item]["OS Version"] == ""
              ) {
                resolve({
                  status: false,
                  message:
                    "Mandatory field missing for vm with ip " +
                    xlsData[item]["IP Address"],
                });
              }
            }
            resolve({ status: true });
          })
          .catch((e) => {
            logger.info(fun + " error " + e);
            for (var item in xlsData) {
              console.log(
                " validation check for :: " + xlsData[item]["IP Address"]
              );
              if (
                xlsData[item]["Team"] == null ||
                xlsData[item]["Team"] == "" ||
                xlsData[item]["IP Address"] == null ||
                xlsData[item]["IP Address"] == "" ||
                xlsData[item]["Hostname"] == null ||
                xlsData[item]["Hostname"] == "" ||
                xlsData[item]["OS"] == null ||
                xlsData[item]["OS"] == "" ||
                xlsData[item]["OS Version"] == null ||
                xlsData[item]["OS Version"] == ""
              ) {
                resolve({
                  status: false,
                  message:
                    "Mandatory field missing for vm with ip " +
                    xlsData[item]["IP Address"],
                });
              }
            }
            resolve({ status: true });
          });
      });
      return aPromise;
    }

    function checkMandatoryCols(columns) {
      var list = [
        "RAM",
        "Owner",
        "Group",
        "Comment",
        "IP Address",
        "Hostname",
        "OS",
        "OS Version",
        "Team",
        "Assignee",
        "Availability",
      ];
      if (
        (columns.includes("IP Address") &&
          columns.includes("Hostname") &&
          columns.includes("OS") &&
          columns.includes("OS Version"),
        columns.includes("Team"))
      ) {
        for (var item in columns) {
          if (!list.includes(columns[item])) {
            console.log("item::", item);
            return false;
          }
        }
      } else {
        return false;
      }
      return true;
    }
    console.log("upload::", req.files);
    console.log("upload::", req.file);
    console.log("upload::", req.body);
    if (!req.files && !req.file) {
      return res
        .status(400)
        .json({
          status: "Failed",
          message: "Please upload a flie!",
          nofile: true,
        });
    }
    var file = null;
    if (req.file) file = req.file;
    if (req.files) file = req.files.file0;
    try {
      if (file != null) {
        var data = file.data;
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        /* Call XLSX */
        var workbook = XLSX.read(bstr, {
          type: "binary",
        });
        /* Get the work sheet name */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        let columnHeaders = [];
        for (let key in worksheet) {
          let regEx = new RegExp("^(\\w)(1){1}$");
          if (regEx.test(key) == true) {
            columnHeaders.push(worksheet[key].v);
          }
        }
        console.log(columnHeaders);
        if (!checkMandatoryCols(columnHeaders)) {
          return res
            .status(400)
            .json({
              status: "Failed",
              message: "Cloumn Headers validation failed!",
              mandatoryHeaders: [
                "IP Address",
                "Hostname",
                "OS",
                "OS Version",
                "Team",
              ],
              otherAllowedHeaders: [
                "RAM",
                "Owner",
                "Group",
                "Comment",
                "Assignee",
              ],
            });
        }
        let xlsData = XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
        });
        if (xlsData.length == 0) {
          return res
            .status(400)
            .json({
              status: "Failed",
              message: "No recod found!",
              noRecord: true,
            });
        }
        var unique = Object.values(
          xlsData.reduce((r, o) => {
            r[o["IP Address"]] = r[o["IP Address"]] || o;
            return r;
          }, {})
        );
        console.log(unique);
        if (unique.length != xlsData.length) {
          return res
            .status(400)
            .json({
              status: "Failed",
              message:
                "Duplicate IP found ! IP Address should be unique for each vm!",
              duplicateIP: true,
            });
        }
        checkDataValidation(xlsData).then((result) => {
          console.log(result);
          if (!result.status) {
            return res
              .status(400)
              .json({
                status: "Failed",
                message: result.message,
                dataValidationFailed: true,
              });
          }
          req.body.params = {};
          req.body.params.ipList = xlsData;
          logger.info(req.body);
          _client.post(
            _client.getHttpPostOptions(req, config.add_or_update_multiple_vms),
            req,
            res,
            next
          );
        });
      } else {
        return res
          .status(400)
          .json({ status: "failed", message: "Internal Server Error!" });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ status: "failed", message: "Internal Server Error!" });
    }
  },
  downloadSampleXlsx: function(req, res, next) {
    var fun = "downloadSampleXlsx";
    console.log("downloadSampleXlsx");
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("VM List");
    worksheet.columns = [
      { header: "IP Address", key: "ip" },
      { header: "Hostname", key: "hostname" },
      { header: "OS", key: "os" },
      { header: "OS Version", key: "osVer" },
      { header: "Team", key: "team" },
      { header: "RAM", key: "ram" },
      { header: "Owner", key: "owner" },
      { header: "Assignee", key: "assignee" },
      { header: "Availability", key: "status" },
      { header: "Group", key: "group" },
      { header: "Comment", key: "comment" },
    ];
    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 20 ? 20 : column.header.length;
    });
    // Add Data and Conditional Formatting
    var httpOptions = {
      uri: config.apiBase + "/" + config.apiContextRoot + config.props_path,
      headers: _client.getStaticHeaders(req),
      qs: _client.getStaticQueryParam(req),
      jar: _client.getStaticCookieJar(req),
    };
    console.log(httpOptions);
    var statusList = [ "Available", "Occupied" ];
    request_promise
      .get(httpOptions)
      .then(function(body) {
        logger.info(fun + "- GET request to " + httpOptions.uri);
        logger.debug(fun + "- Response body:" + body);
        var teamList = [];
        if (body) {
          var propJson = JSON.parse(body);
          teamList = propJson.teamList.split(":");
        }
        console.log(teamList);
        console.log(req.user.activeUser.permissions.is_admin);
        if (
          typeof req.user.activeUser.permissions.is_admin != "undefined" &&
          (req.user.activeUser.permissions.is_admin == 1 ||
            req.user.activeUser.permissions.is_admin == "1") &&
          teamList.length > 0
        ) {
          let joineddropdownlist = '"' + teamList.join(",") + '"';
          let joinedstatuslist = '"' + statusList.join(",") + '"';
          for (let i = 1; i < 500; i++) {
            worksheet.getCell("E" + i).dataValidation = {
              type: "list",
              allowBlank: true,
              formulae: [ joineddropdownlist ], //'"One,Two,Three,Four"'
            };
            worksheet.getCell("I" + i).dataValidation = {
              type: "list",
              allowBlank: true,
              formulae: [ joinedstatuslist ], //'"One,Two,Three,Four"'
            };
          }
        } else {
          let joinedstatuslist = '"' + statusList.join(",") + '"';
          for (let i = 1; i < 500; i++) {
            worksheet.getCell("I" + i).dataValidation = {
              type: "list",
              allowBlank: true,
              formulae: [ joinedstatuslist ], //'"One,Two,Three,Four"'
            };
          }
        }
        workbook.xlsx.writeBuffer().then((data) => {
          res.writeHead(200, [
            [
              "Content-Type",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ],
          ]);
          res.end(new Buffer(data, "base64"));
        });
      })
      .catch((e) => {
        logger.info(fun + " error " + e);
        let joinedstatuslist = '"' + statusList.join(",") + '"';
        for (let i = 1; i < 500; i++) {
          worksheet.getCell("I" + i).dataValidation = {
            type: "list",
            allowBlank: true,
            formulae: [ joinedstatuslist ], //'"One,Two,Three,Four"'
          };
        }
        workbook.xlsx.writeBuffer().then((data) => {
          res.writeHead(200, [
            [
              "Content-Type",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ],
          ]);
          res.end(new Buffer(data, "base64"));
        });
      });
  },
};
