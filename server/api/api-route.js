const { apiBase } = require('../config');
const client = require('./client');
const portalAuth = require('./portal-auth');
const vmCtrl = require('./vm-module');
const admnCtrl = require('./admin-module')
const commonCtrl = require('./common-module');
const userCtrl = require('./user-module')
module.exports = function(app) {
    app.get('/api/vm/*', portalAuth.ensureAuthenticated);
    app.post('/api/vm/*', portalAuth.ensureAuthenticated);
    app.get('/api/admin/*', portalAuth.ensureAuthenticated);
    app.post('/api/admin/*', portalAuth.ensureAuthenticated);
    app.get("/api/login", portalAuth.authenticate);
    app.post('/api/login', portalAuth.authenticate);
    app.post('/api/logout', portalAuth.logOut);
    app.post('/api/checkSession', portalAuth.checkSession);
    app.post('/api/checkAuth', portalAuth.isAuthenticated);
    app.get('/api/vm/getAll', vmCtrl.getAll);
    app.post('/api/vm/addVM', vmCtrl.addVM);
    app.post('/api/vm/updateVM', vmCtrl.updateVM);
    app.post('/api/admin/addTeam', admnCtrl.addTeam);
    app.post('/api/admin/updateTeam/:team', admnCtrl.updateTeam);
    app.get('/api/admin/getTeam/:team', admnCtrl.getTeam);
    app.post('/api/admin/addTeamLead', admnCtrl.createTeamLeader);
    app.post('/api/admin/prop/update', admnCtrl.updateProps);
    app.post('/api/user/addUser', userCtrl.addUser);
    app.post('/api/user/updateUser', userCtrl.updateUser);
    app.post('/api/user/updateTeamLead', admnCtrl.updateTeamLead);
    app.get('/api/public/getUIProps', commonCtrl.getProps);
    app.get('/api/public/getUsers', userCtrl.getUsers);
    app.get('/api/admin/getTeamLeads', userCtrl.getTL);
    app.get('/api/admin/teamStats', userCtrl.getUsersWithProtocols);
    app.get('/api/user/getUser/:id', userCtrl.getUser);
    app.get('/api/admin/activityLog/:type/:activityId', admnCtrl.getActivityLog);
    app.post('/api/stream/exec', commonCtrl.streamExec);
    app.get("/api/stream/getOut/:file/:threadID", commonCtrl.getStreamOutput);

    app.get("/success", (req, res, next) => {
        res.send("<h1>Success Page/h1>");
    });
}

function abc(req, res, next) {
    console.log("abc");
    (req, res, next)
}