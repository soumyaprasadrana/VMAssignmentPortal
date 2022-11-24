// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 17:53:04
 * @modify date 2022-11-24 18:06:39
 * @desc Node API Routing
 */
const portalAuth = require('./portal-auth');
const vmCtrl = require('./vm-module');
const technotesCtrl = require('./technotes-module');
const admnCtrl = require('./admin-module')
const commonCtrl = require('./common-module');
const userCtrl = require('./user-module');
const dynamicObjectCtrl = require('./dynamic-object.module');
const snapCtrl = require("./snapshot-module");
module.exports = function(app) {
    app.get('/api/vm/*', portalAuth.ensureAuthenticated);
    app.post('/api/vm/*', portalAuth.ensureAuthenticated);
    app.get("/portal/spa/*", portalAuth.ensureAuthenticated);
    app.get('/api/admin/*', portalAuth.ensureAuthenticated);
    app.post('/api/admin/*', portalAuth.ensureAuthenticated);
    app.get('/api/user/*', portalAuth.ensureAuthenticated);
    app.post('/api/public/*', portalAuth.ensureAuthenticated);
    app.get('/api/public/*', portalAuth.ensureAuthenticated);
    app.post('/api/user/*', portalAuth.ensureAuthenticated);
    app.get('/api/stream/*', portalAuth.ensureAuthenticated);
    app.post('/api/stream/*', portalAuth.ensureAuthenticated);
    app.get('/api/dynamicobjects/*', portalAuth.ensureAuthenticated);
    app.post('/api/dynamicobjects/*', portalAuth.ensureAuthenticated);
    app.get('/api/technotes/*', portalAuth.ensureAuthenticated);
    app.post('/api/technotes/*', portalAuth.ensureAuthenticated);
    app.get("/api/login", portalAuth.authenticate);
    app.post('/api/login', portalAuth.authenticate);
    app.post('/api/logout', portalAuth.logOut);
    app.post('/api/checkSession', portalAuth.checkSession);
    app.post('/api/checkAuth', portalAuth.isAuthenticated);
    app.get('/api/vm/getAll', vmCtrl.getAll);
    app.post('/api/vm/addVM', vmCtrl.addVM);
    app.post('/api/vm/assignVM', vmCtrl.assignVM);
    app.post('/api/vm/assignMultipleVMS', vmCtrl.assignMultipleVMS);
    app.post('/api/vm/releaseVM', vmCtrl.releaseVM);
    app.post('/api/vm/releaseMultipleVMS', vmCtrl.releaseMultipleVMS);
    app.post('/api/vm/updateVM', vmCtrl.updateVM);
    app.post('/api/vm/updateMultipleVMS', vmCtrl.updateMultipleVMS);
    app.get('/api/vm/:ip/additionalData', vmCtrl.getAdditional);
    app.post('/api/vm/:ip/additionalData', vmCtrl.updateAdditional);
    app.get('/api/vm/:ip/relatedvms', vmCtrl.getRelatedvms);
    app.post('/api/vm/:ip/relatedvms', vmCtrl.updateRelatedvms);
    app.post('/api/vm/delete/:ip', vmCtrl.deleteVM);
    app.post('/api/vm/:ip/comment/add', vmCtrl.addComment);
    app.post('/api/vm/upload', vmCtrl.upload);
    app.get('/api/vm/excelimport/sample', vmCtrl.downloadSampleXlsx);
    app.get('/api/dynamicobjects/getAll', dynamicObjectCtrl.getAll);
    app.get('/api/dynamicobjects/:app/getAll', dynamicObjectCtrl.getObjectRecords);
    app.get('/api/dynamicobjects/:app/attributes', dynamicObjectCtrl.getObjectAttributes);
    app.post('/api/dynamicobjects/:app/add', dynamicObjectCtrl.addObjectRecord);
    app.post('/api/dynamicobjects/:app/update', dynamicObjectCtrl.updateObjectRecord);
    app.post('/api/dynamicobjects/:app/delete', dynamicObjectCtrl.deleteObjectRecord);
    app.get('/api/dynamicobjects/get/:id', dynamicObjectCtrl.getObject);
    app.post('/api/dynamicobjects/add', dynamicObjectCtrl.addObject);
    app.post('/api/dynamicobjects/update', dynamicObjectCtrl.updateObject);
    app.post('/api/dynamicobjects/delete/:id', dynamicObjectCtrl.deleteObject);
    app.get('/api/technotes/getAll', technotesCtrl.getAll);
    app.get('/api/technotes/getTechnote/:id', technotesCtrl.getTechnote);
    app.post('/api/technotes/addTechnote', technotesCtrl.addTechnote);
    app.post('/api/technotes/editTechnote/:id', technotesCtrl.updateTechnote);
    app.post('/api/technotes/delete/:id', technotesCtrl.deleteTechnote);
    app.post('/api/admin/addTeam', admnCtrl.addTeam);
    app.post('/api/admin/updateTeam/:team', admnCtrl.updateTeam);
    app.get('/api/admin/getTeam/:team', admnCtrl.getTeam);
    app.post('/api/admin/team/delete/:team', admnCtrl.deleteTeam);
    app.post('/api/admin/addTeamLead', admnCtrl.createTeamLeader);
    app.post('/api/admin/prop/update', admnCtrl.updateProps);
    app.post('/api/admin/promoteUser/:user', admnCtrl.promteUser);
    app.post('/api/user/addUser', userCtrl.addUser);
    app.post('/api/user/updateUser', userCtrl.updateUser);
    app.post('/api/user/updateTeamLead', admnCtrl.updateTeamLead);
    app.post('/api/user/changePassword', userCtrl.changePassword);
    app.get('/api/public/getUIProps', commonCtrl.getProps);
    app.get('/api/public/getUsers', userCtrl.getUsers);
    app.get('/api/config/theme', commonCtrl.getThemeName);
    app.get('/api/config/hideloginfooter', commonCtrl.getLoginFooter);
    app.get('/api/config/useToast', commonCtrl.getUseToast);
    app.get('/api/public/getNormalUsers', userCtrl.getNormalUsers);
    app.get('/api/admin/getTeamLeads', userCtrl.getTL);
    app.get('/api/admin/teamStats', userCtrl.getUsersWithProtocols);
    app.get('/api/user/getUser/:id', userCtrl.getUser);
    app.post('/api/user/delete/:id', userCtrl.deleteUser);
    app.post('/api/user/resetpass/:id', userCtrl.resetPassword);
    app.get('/api/admin/activityLog/:type/:activityId', admnCtrl.getActivityLog);
    app.post('/api/stream/exec', commonCtrl.streamExec);
    app.get("/api/stream/getOut/:file/:threadID", commonCtrl.getStreamOutput);
    app.get("/api/public/sshMetadata", commonCtrl.getSSHMetadata);
    app.get("/api/public/quicklinks", commonCtrl.getQuickLinks);
    app.get("/api/public/spaMetadata", commonCtrl.getSPAMetadata);
    app.get("/api/public/lists", commonCtrl.getListsNames);
    app.get("/api/public/lists/:id", commonCtrl.getListItems);
    app.get("/api/vm/snapshots/:host", snapCtrl.getSnapshots);
    app.get("/api/vm/get/snapshots", snapCtrl.getAllSnapshots);
    app.get("/api/vm/get/snapshotscount", snapCtrl.getAllSnapshotsCount);
    app.get("/api/vm/get/snapshots/:keyword", snapCtrl.searchSnapshots);
    app.post("/api/vm/takeSnap", snapCtrl.takeSnapshot);
    app.post("/api/vm/revertSnap", snapCtrl.revertSnapshot);
    app.get("/api/stream/getTaskStatus/:taskID", snapCtrl.getTaskStatus);
    app.post("/api/admin/run/snapcount", snapCtrl.runUpdateSnapCount);
    app.post("/api/admin/run/extradata", snapCtrl.runUpdateVMData);
    app.post("/api/admin/run/restartsnapshotservice", snapCtrl.restartsnapshotservice);

}