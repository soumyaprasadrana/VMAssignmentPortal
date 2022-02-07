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
        cardText:
          'Helps to run ssh commands.Current design only supports single line command execution.',
        cardWidth: '200',
        cardHeight: '200',
        cardRouterLink: ['../ltb'],
        cardIconClass: 'fa fa-linux',
        badgeIcon: 'fa fa-terminal',
        cardTextClamp: 3,
      },
      {
        cardTitle: 'Technotes',
        cardText:
          'Technotes can help to resolve day to day know issues of team members.',
        cardWidth: '200',
        cardHeight: '200',
        cardRouterLink: ['../technotes'],
        cardIconClass: 'fa fa-sticky-note-o',
        badgeIcon: 'fa fa-edit',
        cardTextClamp: 3,
      },
      {
        cardTitle: 'Single Page Applications',
        cardText: 'Dynamically configurable single page apps.',
        cardWidth: '300',
        cardHeight: '200',
        cardRouterLink: ['../spa'],
        cardIconClass: 'fa fa-window-restore',
        badgeIcon: 'fa fa-firefox',
        cardTextClamp: 0,
      },
    ],
  ];

  constructor() {}
}
