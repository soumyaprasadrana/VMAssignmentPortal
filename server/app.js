// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:08:48
 * @modify date 2022-02-26 18:08:48
 * @desc Entrypoint for the application
 */
const express = require("express");
var cookieParser = require("cookie-parser");
var cookieSession = require("cookie-session");
var expressPino = require("express-pino-logger");
const fileUpload = require("express-fileupload");
const passport = require("passport");
var path = require("path");
var config = require("./config");
var logger = config.logger;
var cors = require("cors");
const bodyParser = require("body-parser");
var compression = require("compression");
const gzipAll = require("gzip-all");
const fs = require("fs");
var http = require("http");
var SSHClient = require("ssh2").Client;
var utf8 = require("utf8");

logger.info("Initializing node server");
logger.info("Checking node version ..." + global.process.version);

var app = express();
app.disable("x-powered-by");

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);
/*Disable Cache Control*/
if (config.disableCahe) {
  app.use((req, res, next) => {
    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.set("Pragma", "no-cache");
    res.set("Expires", 0);
    res.set("Surrogate-Control", "no-store");
    next();
  });
}
if (config.useGzip) {
  // enable compression
  logger.info("Creating gzip files ...");
  gzipAll("../dist/VMPORTAL/*.js").then((newFiles) => {
    logger.info("Created compressed files for javascript:");
    logger.info(newFiles);
  });
  gzipAll("../dist/VMPORTAL/*.css").then((newFiles) => {
    logger.info("Created compressed files for css:");
    logger.info(newFiles);
  });
  app.use(compression());
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (config.useCORS) {
  app.use(cors());
}
const oneDay = 1000 * 60 * 60 * 24;
const twoHour = 1000 * 60 * 60 * 2;
app.use(cookieParser());
app.use(
  cookieSession({
    secret: "portal1234",
    name: "portal.session",
    keys: [ "portal.sid" ],
    httpOny: true,
    secure: false,
    maxAge: twoHour,
    site: "None",
    saveUninitialized: true,
  })
);
//app.use(express.static(__dirname));
app.use(express.static("../dist/VMPORTAL"));
app.use(express.static(__dirname + "/spa"));
app.set("view engine", "pug");

/* Passport Authentication Setup */

app.use(passport.initialize());
app.use(passport.session());
var portalAuth = require("./api/portal-auth");
portalAuth.custStrategyConfigure();

/*Routes*/

require("./api/api-route")(app);
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

function getRoot(request, response) {
  response.sendFile(path.resolve("../dist/VMPORTAL/index.html"));
}

function getUndefined(request, response) {
  response.sendFile(path.resolve("../dist/VMPORTAL/index.html"));
}

function loadSPA(req, res) {
  const fun = "app.js :: loadSPA :: ";
  const app = req.params.app;
  if (!config.includedSPA.includes(app)) {
    logger.info(fun + app + "not found in included list.");
    res
      .status(400)
      .send(app + " is not available please contact your system administrtor!");
  } else {
    const app_path = "./spa/" + app + "/index.html";
    logger.debug("Resolved path :" + path.resolve(app_path));
    try {
      if (fs.existsSync(app_path)) {
        // path exists
        logger.info(
          fun +
            "Found single page application " +
            app +
            ". Resolving the application."
        );
        res.sendFile(path.resolve(app_path));
        //res.status(200).send(path.resolve(app_path));
      } else {
        logger.info(
          fun +
            app +
            " found in single page application list but unable to find application resotce inside spa ."
        );
        res
          .status(401)
          .send(
            "Unable to find resource for " +
              app +
              " , please contact your system administrtor!"
          );
      }
    } catch (e) {
      logger.debug(e);
      console.log(e);
      res.status(500).send("Internal Server Error!");
    }
  }
}

function loadSPAAsset(req, res) {
  const fun = "app.js :: loadSPAAsset :: ";
  const app = req.params.app;
  const reqUrl = req.url;
  var requestPath = reqUrl.replace("/portal/spa/" + app, "");
  if (requestPath.includes(app)) {
    requestPath = requestPath.replace("/" + app + "/", "");
  }
  logger.info("Asset requested :" + requestPath);
  if (!config.includedSPA.includes(app)) {
    logger.info(fun + app + "not found in included list.");
    res
      .status(400)
      .send(app + " is not available please contact your system administrtor!");
  } else {
    const app_path = "./spa/" + app + "/" + requestPath;
    logger.debug("Resolved path :" + path.resolve(app_path));
    try {
      if (fs.existsSync(app_path)) {
        // path exists
        logger.info(
          fun +
            "Asset found : " +
            requestPath +
            " for app" +
            app +
            ". Resolving the file."
        );
        res.sendFile(path.resolve(app_path));
        //res.status(200).send(path.resolve(app_path));
      } else {
        logger.info(
          fun +
            app +
            " found in single page application list but unable to find application resotce inside spa ."
        );
        res
          .status(401)
          .send(
            "Unable to find resource for " +
              app +
              " , please contact your system administrtor!"
          );
      }
    } catch (e) {
      logger.debug(e);
      console.log(e);
      res.status(500).send("Internal Server Error!");
    }
  }
}
app.get("/portal", getRoot);
app.get("/portal/spa/:app", loadSPA);
app.get("/portal/spa/:app/*", loadSPAAsset);
app.get("/portal/login", getRoot);
app.get("/portal/customappform/*", getRoot);
app.get("/portal/home/*", portalAuth.ensureAuthenticated, getUndefined);

if (config.userDefinedFunctions.length != 0) {
  logger.info("Found user defined functions; Processing server scripts....");
  try {
    for (var item in config.userDefinedFunctions) {
      try {
        require("./api/functions/" +
          config.userDefinedFunctions[item] +
          "/server").server(app);
        logger.info(
          "Server script successfully loaded for " +
            config.userDefinedFunctions[item]
        );
      } catch (e) {
        logger.info(
          "Unable to load server script for custom function :" +
            config.userDefinedFunctions[item]
        );
        logger.info(e);
      }
    }
  } catch (e) {
    logger.info(
      "Error occurred while loading server js for user defined functions."
    );
    logger.info(e);
  }
}
const port = config.PORT;
//app.listen(port, () => logger.info('App listening on port ' + port));

logger.info("Creating http server for socket.io");
var server = http.createServer(app);
logger.info("Registering Socket.io");
//socket.io instantiation
const io = require("socket.io")(server, { origins: "*:*" });

server.listen(port, () => logger.info("App listening on port " + port));

//Socket Connection
io.on("connection", function(socket) {
  try {
    logger.info("SERVER SOCKET CONNECTION CREATED :", socket.id);
    var data = socket.handshake.query;
    logger.info(data);
    if (data.type == "webshell") {
      logger.info("Connection type : webshell");
      var ssh = new SSHClient();
      ssh
        .on("ready", function() {
          socket.emit("data", "\r\n*** SSH CONNECTION ESTABLISHED ***\r\n\n");
          logger.debug("SSH CONNECTION ESTABLISHED for socket" + socket.id);
          connected = true;
          ssh.shell(function(err, stream) {
            if (err) {
              logger.debug(
                "SSH SHELL ERROR: " + err.message + " for socket" + socket.id
              );
              logger.debug(err);
              return socket.emit(
                "data",
                "\r\n*** SSH SHELL ERROR: " + err.message + " ***\r\n"
              );
            }
            socket.on("data", function(data) {
              logger.debug("Socket ID::" + socket.id + " on data ::");
              logger.debug(data);
              stream.write(data);
            });
            stream
              .on("data", function(d) {
                logger.debug(
                  "Socket ID::" + socket.id + " ssh stream on data ::"
                );
                logger.debug(utf8.decode(d.toString("binary")));
                socket.emit("data", utf8.decode(d.toString("binary")));
              })
              .on("close", function() {
                logger.debug(
                  "Socket ID::" +
                    socket.id +
                    " ssh stream on close() :: Going to call ssh.end()"
                );
                ssh.end();
              });
          });
        })
        .on("close", function() {
          logger.debug(
            "Socket ID::" +
              socket.id +
              " ssh on close() :: SSH CONNECTION CLOSED"
          );
          socket.emit("data", "\r\n*** SSH CONNECTION CLOSED ***\r\n");
        })
        .on("error", function(err) {
          logger.debug(err);
          logger.debug(
            "Socket ID::" +
              socket.id +
              " ssh on error ::SSH CONNECTION ERROR: " +
              err.message
          );
          socket.emit(
            "data",
            "\r\n*** SSH CONNECTION ERROR: " + err.message + " ***\r\n"
          );
        })
        .connect({
          host: data.hostname,
          port: data.port, // Generally 22 but some server have diffrent port for security Reson
          username: data.username, // user name
          password: data.password, // Set password or use PrivateKey
          // privateKey: require("fs").readFileSync("PATH OF KEY ") // <---- Uncomment this if you want to use privateKey ( Example : AWS )
        });
    } else if (data.type == "exec") {
      logger.info("Connection type: exec");
      if (
        typeof data.command == "undefined" ||
        data.command == null ||
        data.command == "null"
      ) {
        logger.info(
          "SSH CONNECTION ERROR: Command not found for connection type execute!"
        );
        return socket.emit(
          "data",
          "\r\n*** SSH CONNECTION ERROR: Command not found for connection type execute! ***\r\n"
        );
      }
      var ssh = new SSHClient();
      ssh
        .on("ready", function() {
          socket.emit("data", "\r\n*** SSH CONNECTION ESTABLISHED ***\r\n");
          logger.debug("SSH CONNECTION ESTABLISHED for socket" + socket.id);
          connected = true;
          ssh.exec(data.command, function(err, stream) {
            if (err) {
              logger.debug(
                "SSH SHELL ERROR: " + err.message + " for socket" + socket.id
              );
              logger.debug(err);
              return socket.emit(
                "data",
                "\r\n*** SSH SHELL ERROR: " + err.message + " ***\r\n"
              );
            }
            socket.on("data", function(data) {
              logger.debug("Socket ID::" + socket.id + "on data::");
              logger.debug(data);
              stream.write(data);
            });
            stream
              .on("data", function(d) {
                logger.debug(
                  "Socket ID::" + socket.id + " ssh stream on data ::"
                );
                logger.debug(utf8.decode(d.toString("binary")));
                socket.emit("data", utf8.decode(d.toString("binary")));
              })
              .stderr.on("data", (d) => {
                logger.debug(
                  "Socket ID::" + socket.id + " ssh error stream on data ::"
                );
                logger.debug(utf8.decode(d.toString("binary")));
                socket.emit("data", utf8.decode(d.toString("binary")));
              })
              .on("error", function(d) {
                logger.debug("Socket ID::" + socket.id + " ssh on eror ::");
                logger.debug(utf8.decode(d.toString("binary")));
                socket.emit("data", utf8.decode(d.toString("binary")));
              })
              .on("close", function() {
                logger.debug(
                  "Socket ID::" +
                    socket.id +
                    " ssh stream on close() :: Going to call ssh.end()"
                );
                ssh.end();
              });
          });
        })
        .on("close", function() {
          logger.debug(
            "Socket ID::" +
              socket.id +
              " ssh on close() :: COMMAND EXECUTED CONNECTION CLOSED"
          );
          socket.emit(
            "data",
            "\r\n*** COMMAND EXECUTED CONNECTION CLOSED ***\r\n"
          );
        })
        .on("error", function(err) {
          logger.debug(err);
          logger.debug(
            "Socket ID::" +
              socket.id +
              " ssh on error ::SSH CONNECTION ERROR: " +
              err.message
          );
          if (err.message.includes("read ECONNRESET")) {
            socket.emit("data", "\r\n*** Stream closed  ***\r\n");
          } else {
            socket.emit(
              "data",
              "\r\n*** SSH CONNECTION ERROR: " + err.message + " ***\r\n"
            );
          }
        })
        .connect({
          host: data.hostname,
          port: data.port, // Generally 22 but some server have diffrent port for security Reson
          username: data.username, // user name
          password: data.password, // Set password or use PrivateKey
          // privateKey: require("fs").readFileSync("PATH OF KEY ") // <---- Uncomment this if you want to use privateKey ( Example : AWS )
        });
    }
  } catch (e) {
    logger.info(e);
  }
});
