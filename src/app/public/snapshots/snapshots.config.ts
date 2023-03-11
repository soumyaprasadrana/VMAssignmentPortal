// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Snapshots Config
 */
export class SnapshotsConfig {
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
        cardTitle: 'View All Snapshots',
        cardText: 'Will retrive all available snapshots from VSPHERE.',
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-hdd-o',
        badgeIcon: 'fa fa-hdd-o',
        cardTextClamp: 2,
        callback: function (parentObject: any) {
          parentObject.goToViewAllSnapshots();
        },
      },
      {
        cardTitle: 'Search Snapshots',
        cardText: 'Will help to search available snapshots with keyword.',
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-hdd-o',
        badgeIcon: 'fa fa-search',
        cardTextClamp: 2,
        callback: function (parentObject: any) {
          parentObject.goToSearchSnapshots();
        },
      },
      {
        cardTitle: 'Snapshots Count',
        cardText: `Get snapshots count 
        \n for all available VMs.`,
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-hdd-o',
        badgeIcon: 'fa fa-hashtag',
        cardTextClamp: 2,
        callback: function (parentObject: any) {
          parentObject.goToSnapshotsCount();
        },
      },
      {
        cardTitle: 'Sync Count',
        cardText: `Sync snapshots count 
                  \n for all available VMs`,
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-hdd-o',
        badgeIcon: 'fa fa-refresh',
        cardTextClamp: 0,
        cardPermissions: function (loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.is_teamLead
          );
        },
        callback: function (parentObject: any) {
          parentObject.runUpdateCount();
        },
      },
      {
        cardTitle: 'Sync VM Data',
        cardText: 'Sync additional data from vsphere for all available VMs',
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-list',
        badgeIcon: 'fa fa-refresh',
        cardTextClamp: 2,
        cardPermissions: function (loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.is_teamLead
          );
        },
        callback: function (parentObject: any) {
          parentObject.runUpdateExtradata();
        },
      },
      {
        cardTitle: 'Restart Snapshot Service',
        cardText:
          'Must be used when snapshot service is down due to connection break from VSphere.',
        cardWidth: '300',
        cardHeight: '250',
        cardIconClass: 'fa fa-list',
        badgeIcon: 'fa fa-refresh',
        cardTextClamp: 3,
        cardPermissions: function (loggedUser: any) {
          return loggedUser.permissions.is_admin;
        },
        callback: function (parentObject: any) {
          parentObject.restartSnapshotService();
        },
      },
    ],
  ];

  constructor() {}
}
