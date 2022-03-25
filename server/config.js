// Copyright (c) 2022 soumya
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:06:39
 * @modify date 2022-03-25 18:06:39
 * @desc Configuration file for node api server
 */
var pino = require('pino');
module.exports = {
    "apiBase": process.env.APIBASE || "http://localhost:8080/VMManagementPortalAPI",
    "apiContextRoot": process.env.APICONTEXTROOT || "rest",
    logger: pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: { colorize: true } }),
    PORT: process.env.PORT || 3000,
    /* Choose the theme for angular UI 
    Available Themes : default,dark,pink,blue
    */
    theme: process.env.THEME || 'default',
    /* To hide the footer in login page */
    hideloginfooter: process.env.HIDELOGINFOOTER || false,
    /* You need to include single page app name here; This property helps to easily manage multiple single page applications*/
    includedSPA: ['androidassetstudio', 'textcompare', 'prettier'],
    /* Enable gzip on server */
    useGzip: process.env.USEGZIP || true,
    /* Enable CORS */
    useCORS: process.env.USECORS || true,
    /* Enable Toast Notification Service; If disabled success result will show in dialog */
    useToast: process.env.USETOAST || true,

    vm_rest_path: '/vmDetails/getAll',
    technotes_rest_path: '/technotes/getAll',
    get_technote_rest_path: '/technotes/getTechnote',
    technotes_add_rest_path: '/technotes/addTechnote',
    technotes_update_rest_path: '/technotes/updateTechnote',
    technotes_remove_rest_path: '/technotes/removeTechnote',
    vm_additional_data: '/vmDetails/getAdditionalData',
    update_vm_additional_data: '/vmActions/updateVMAdditionalData',
    related_vms_data:'/relatedvms/getAll',
    update_related_vms:'/relatedvms/updateRelatedVMS',
    add_team_rest_path: '/admin/addTeam',
    props_path: '/prop/getProp',
    add_team_lead_rest_path: '/user/addTeamLead',
    add_user_rest_path: '/user/addUser',
    update_user_rest_path: '/user/updateUser',
    add_vm_rest_path: '/vmActions/addVM',
    add_comment_to_vm_rest_path: '/vmActions/addComment',
    delete_vm_rest_path: '/vmActions/removeVM',
    assign_vm_rest_path: '/vmActions/assignVM',
    assign_multiple_vms_rest_path: '/vmActions/assignMultipleVMS',
    release_multiple_vms_rest_path: '/vmActions/releaseMultipleVMS',
    release_vm_rest_path: '/vmActions/releaseVM',
    update_vm_rest_path: '/vmActions/updateVM',
    update_multiple_vms_rest_path: '/vmActions/updateMultipleVMS',
    add_or_update_multiple_vms: '/vmActions/addMultipleVMS',
    users_path: '/user/getAll',
    user_path: '/user/getUser',
    normal_users: '/user/getNormalUsers',
    delete_uesr_path: '/user/removeUser',
    user_pass_change: '/user/changePassword',
    teamLeads_path: '/user/getTeamLeads',
    get_team_path: '/admin/getTeam',
    update_team_rest_path: '/admin/updateTeam',
    delete_team_path: '/admin/removeTeam',
    update_props_rest_path: '/prop/update',
    update_tl_rest_path: '/admin/updateTeamLead',
    promote_user: '/admin/promoteUser',
    team_stats_path: '/user/getAllWithProtocols',
    get_recent_activitylogs: '/activitylog/getRecentLogs',
    get_next_activitylogs: '/activitylog/getActivityLogs',
    get_prev_activitylogs: '/activitylog/getActivityLogsPrev',
    stream_exec: '/stream/exec',
    stream_output: '/stream/getOut'
}