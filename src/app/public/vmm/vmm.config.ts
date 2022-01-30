export class VMMConfig {
  static cardsMetaData: any = [
    [
      {
        cardTitle: 'Add Virtual Machine',
        cardText:
          'Add a virtual machine to portal database , it will not create a vm instance in VMWare.',
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-desktop',
        badgeIcon: 'fa fa-plus',
        cardRouterLink: ['../add'],
        cardTextClamp: 2,
      },
      {
        cardTitle: 'Edit Virtual Machine',
        cardText: 'Edit a Vitual Machine to update Virtual Machine Details.',
        cardWidth: '200',
        cardHeight: '200',
        cardIconClass: 'fa fa-users',
        badgeIcon: 'fa fa-edit',
        cardTextClamp: 2,
        cardRouterLink: ['../edit'],
      },
      {
        cardTitle: 'Remove Virtual Machine',
        cardText:
          'Remove Virtual Machine from Portal Database, It will not delete Virtal Machine from vmware.',
        cardWidth: '250',
        cardHeight: '200',
        cardIconClass: 'fa fa-trash ',
        badgeIcon: 'fa fa-trash',
        cardTextClamp: 2,
        cardDanger: true,
        cardIconColor: 'red',
        cardStackIconColor: 'red',
        cardStackIcon: 'fa fa-desktop ml-4 mt-0',
        callback: function (parentObject: any) {
          //console.log('Function Called');
          parentObject.deleteVM();
        },
        cardPermissions: function (loggedUser: any) {
          return (
            loggedUser.permissions.is_admin ||
            loggedUser.permissions.is_teamLead ||
            loggedUser.permissions.delete_vm
          );
        },
      },
    ],
  ];

  constructor() {}
}
