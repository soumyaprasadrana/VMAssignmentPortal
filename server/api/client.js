/**
 * Client to communicate with JAVA Rest API
 */
var http = require('http');
var request = require('request');
var request_promise = require('request-promise');
module.exports = {
    authenticateToAPI: function(authString, callback) {
        console.log("inside authenticateToAPI:" + authString);
        user = {};
        user.name = "Soumya";
        user.authenticate = true;
        err = { message: "Unauthorzed" }
            // verify auth credentials
        var extServerOptions = {
            host: 'localhost',
            port: '9090',
            uri: 'http://localhost:9090/VMManagementPortalAPI/LoginHandler',
            method: 'POST',
            headers: {
                'Content-Type': 'text/html',
                'Authorization': authString,
                'User-Agent': 'Mozilla/5.0'
            }
        };

        request_promise(extServerOptions, function(error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', JSON.stringify(response)); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            console.log("After");
            const base64Credentials = authString.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');
            if (username == "abc" && password == "abc") {
                callback(null, user)
            } else {
                callback(err, null);
            }
        })


    }
}