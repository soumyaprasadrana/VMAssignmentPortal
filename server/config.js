/**
 * Configuration file for node api server
 */
var pino = require('pino');
module.exports = {
    "apiBase": process.env.APIBASE || "http://localhost:9090/VMManagementPortalAPI",
    "apiContextRoot": process.env.APICONTEXTROOT || "rest",
    logger: pino({ level: process.env.LOG_LEVEL || 'debug', prettyPrint: { colorize: true } }),
    PORT: process.env.PORT || 3000,
    useCORS: process.env.USECORS || true,
    vm_rest_path: '/vmDetails/getAll',
    add_team_rest_path: '/admin/addTeam',
    props_path: '/prop/getProp',
    add_team_lead_rest_path: '/user/addTeamLead',
    add_user_rest_path: '/user/addUser',
    update_user_rest_path: '/user/updateUser',
    add_vm_rest_path: '/vmActions/addVM',
    update_vm_rest_path: '/vmActions/updateVM',
    users_path: '/user/getAll',
    user_path: '/user/getUser'


}