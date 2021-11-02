import { userInfo } from 'os';

export class UserConfig {
  static cardsMetaData: any = [
    [
      {
        cardTitle: 'Create User',
        cardText:
          'Add a normal user to the system, normal user will have access basic fuctionality.',
        cardWidth: '300',
        cardHeight: '200',
        cardIconClass: 'fa fa-users',
        badgeIcon: 'fa fa-plus',
        cardRouterLink: ['../add'],
        cardTextClamp: 0,
      },
      {
        cardTitle: 'Edit User',
        cardText: 'Edit a user to update user permission or user data.',
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-users',
        badgeIcon: 'fa fa-edit',
        cardRouterLink: ['../edit'],
        cardTextClamp: 0,
      },
      {
        cardTitle: 'Delete User',
        cardText: 'Delete user from the system.',
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
    ],
  ];

  constructor() {}
}
