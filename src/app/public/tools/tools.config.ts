import { userInfo } from 'os';

export class ToolConfig {
  static cardsMetaData: any = [
    [
      /*{
        cardTitle: 'DB Tool Box',
        cardText:
          'Facilitate to run data base queries currently supports DB2 only.',
        cardWidth: '300',
        cardHeight: '200',
        cardIconClass: 'fa fa-database',
        badgeIcon: 'fa fa-cogs',
        cardRouterLink: ['../dtb'],
        cardTextClamp: 0,
      },*/
      {
        cardTitle: 'SSH Tool Box',
        cardText: 'Helps to run ssh commands.',
        cardWidth: '200',
        cardHeight: '200',
        cardRouterLink: ['../ltb'],
        cardIconClass: 'fa fa-linux',
        badgeIcon: 'fa fa-terminal',
        cardTextClamp: 0,
      },
    ],
  ];

  constructor() {}
}
