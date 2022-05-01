export class AdminConfig {
  static cardsMetaData: any = [
    [
      {
        cardTitle: 'Create Team',
        cardText:
          'Creating a team will help you to manage team members and virutal machines under this team.',
        cardWidth: '300',
        cardHeight: '200',
        cardIconClass: 'fa fa-users',
        badgeIcon: 'fa fa-plus',
        cardRouterLink: ['../addTeam'],
        cardTextClamp: 0,
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
      },
      {
        cardTitle: 'Edit Team',
        cardText: 'Edit a team details.',
        cardWidth: '200',
        cardHeight: '200',
        cardRouterLink: ['../editTeam'],
        cardIconClass: 'fa fa-users',
        badgeIcon: 'fa fa-edit',
        cardTextClamp: 0,
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
      },
      {
        cardTitle: 'Create Team Leader',
        cardText:
          'Create a TL for each team, team leaders has more permissions than a normal user.',
        cardWidth: '250',
        cardHeight: '200',
        cardRouterLink: ['../addTeamLead'],
        cardIconClass: 'fa fa-user-plus ',
        badgeIcon: 'fa fa-plus',
        cardTextClamp: 2,
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
      },
      {
        cardTitle: 'Edit Team Leader',
        cardText: 'Edit a team leader to update permission and user data.',
        cardWidth: '250',
        cardHeight: '200',
        cardIconClass: 'fa fa-user',
        cardRouterLink: ['../editTeamLead'],
        badgeIcon: 'fa fa-edit',
        cardTextClamp: 0,
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
      },{
        cardTitle: 'Promote User ',
        cardText: 'This will promote user to team lead.',
        cardWidth: '250',
        cardHeight: '200',
        cardIconClass: 'fa fa-user ',
        badgeIcon: 'fa fa-edit',
        cardTextClamp: 2,
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
        callback: function (parentObject: any) {
          parentObject.promoteUser();
        },
      },

      {
        cardTitle: 'Delete Team ',
        cardText: 'This will remove the team from the database.',
        cardWidth: '250',
        cardHeight: '200',
        cardIconClass: 'fa fa-user-times ',
        badgeIcon: 'fa fa-trash',
        cardTextClamp: 2,
        cardDanger: true,
        cardIconColor: 'red',
        //cardStackIconColor: 'red',
        //cardStackIcon: 'fa fa-user- ml-4 mt-0',
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
        callback: function (parentObject: any) {
          parentObject.deleteTeam();
        },
      },
      {
        cardTitle: 'Team Stats',
        cardText: 'Users permissions view.',
        cardWidth: '220',
        cardHeight: '200',
        cardRouterLink: ['../teamStats'],
        cardIconClass: 'fa fa-group ',
        badgeIcon: 'fa fa-pie-chart',
        cardTextClamp: 0,
        cardPermissions: function (loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.is_teamLead
          );
        },
      },
      {
        cardTitle: 'Activity Logs',
        cardText: 'System activity logs.',
        cardWidth: '220',
        cardHeight: '200',
        cardRouterLink: ['../activityLogs'],
        cardIconClass: 'fa fa-history ',
        badgeIcon: 'fa fa-check-circle',
        cardTextClamp: 0,
        cardPermissions: function (loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.is_teamLead
          );
        },
      },
      {
        cardTitle: 'Application Properties',
        cardText: 'Dynamic Application Properties',
        cardWidth: '220',
        cardHeight: '200',
        cardRouterLink: ['../properties'],
        cardIconClass: 'fa fa-cog ',
        badgeIcon: 'fa fa-cog',
        cardTextClamp: 0,
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
      },
      {
        cardTitle: 'Dynamic Objects',
        cardText: 'Dynamic Objects are configurable objects provides a no of configuration items and a custom application can be added from dynamic objects schema.',
        cardWidth: '220',
        cardHeight: '200',
        cardRouterLink: ['../dynamicobjects'],
        cardIconClass: 'fa fa-first-order ',
        badgeIcon: 'fa fa-first-order',
        cardTextClamp: 2,
        cardPermissions: function (loggedUser: any) {
          return (
            loggedUser.permissions.is_admin 
          );
        },
      },
    ],
    
  ];

  constructor() {}
}
