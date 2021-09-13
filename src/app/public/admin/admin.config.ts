import { userInfo } from 'os';

export class AdminConfig {
  static cardsMetaData: any = [
    [
      {
        cardTitle: 'Create Team',
        cardText:
          'Creating a team will help youto manage team members and virutal machines under this team.',
        cardWidth: '300',
        cardHeight: '200',
        cardIconClass: 'fa fa-users',
        badgeIcon: 'fa fa-plus',
        cardRouterLink: ['../addTeam'],
        cardTextClamp: 0,
      },
      {
        cardTitle: 'Edit Team',
        cardText: 'Edit a team details.',
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-users',
        badgeIcon: 'fa fa-edit',
        cardTextClamp: 0,
      },
      {
        cardTitle: 'Create Team Leader',
        cardText:
          'Create a team leader for each team, team leaders has more permissions than a normal user.',
        cardWidth: '250',
        cardHeight: '200',
        cardRouterLink: ['../addTeamLead'],
        cardIconClass: 'fa fa-user ',
        badgeIcon: 'fa fa-plus',
        cardTextClamp: 2,
      },
      {
        cardTitle: 'Edit Team Leader',
        cardText: 'Edit a team leader to update permission and user data.',
        cardWidth: '250',
        cardHeight: '200',
        cardIconClass: 'fa fa-user',
        badgeIcon: 'fa fa-edit',
        cardTextClamp: 0,
      },
    ],
    [
      {
        cardTitle: 'Delete Team Leader',
        cardText: 'This will remove the team leader user from the database.',
        cardWidth: '250',
        cardHeight: '200',
        cardIconClass: 'fa fa-trash ',
        badgeIcon: 'fa fa-trash',
        cardTextClamp: 2,
        cardDanger: true,
        cardIconColor: 'red',
        cardStackIconColor: 'red',
        cardStackIcon: 'fa fa-user ml-4 mt-0',
      },
      {
        cardTitle: 'Team Stats',
        cardText: 'Users permissions view.',
        cardWidth: '220',
        cardHeight: '200',
        cardIconClass: 'fa fa-group ',
        badgeIcon: 'fa fa-pie-chart',
        cardTextClamp: 0,
      },
    ],
  ];

  constructor() {}
}
