// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc User Config
 */
export class UserConfig {
  static cardsMetaData: any = [
    [
      {
        cardTitle: "Create User",
        cardText:
          "Add a normal user to the system, normal user will have access basic fuctionality.",
        cardWidth: "200",
        cardHeight: "200",
        cardIconClass: "fa fa-user-plus",
        badgeIcon: "fa fa-plus",
        cardRouterLink: [ "../add" ],
        cardTextClamp: 3,
        cardPermissions: function(loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.create_user ||
            loggedUser.permissions.is_teamLead
          );
        },
      },
      {
        cardTitle: "Edit User",
        cardText: "Edit a user to update user permission or user data.",
        cardWidth: "200",
        cardHeight: "200",
        cardIconClass: "fa fa-users",
        badgeIcon: "fa fa-edit",
        cardRouterLink: [ "../edit" ],
        cardTextClamp: 0,
        cardPermissions: function(loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.update_user ||
            loggedUser.permissions.is_teamLead
          );
        },
      },
      {
        cardTitle: "Delete User",
        cardText: "Delete user from the system.",
        cardWidth: "250",
        cardHeight: "200",
        cardIconClass: "fa fa-user-times ",
        badgeIcon: "fa fa-trash",
        cardTextClamp: 2,
        cardDanger: true,
        cardIconColor: "red",
        //cardStackIconColor: 'red',
        //cardStackIcon: 'fa fa-user ms-4 mt-0',
        callback: function(parentObject: any) {
          //console.log('called callback fnction', parentObject);
          parentObject.deleteUser();
        },
        cardPermissions: function(loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.delete_user ||
            loggedUser.permissions.is_teamLead
          );
        },
      },
    ],
  ];

  constructor() {}
}
