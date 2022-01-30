import { Validators } from '@angular/forms';
/**
 * Card Template
 * [ //row
 * { //item
 *      cardTitle: string, //title of the card
        cardCommand: string, // command to be executed on remote machine
        cardWidth: number, //width of the card
        cardHeight: number, //height of the card
        cardFields: [
          [
            { label: string, field_name: string }, //should pass same value inside form control for field_name
            ...
          ],
          {
            field_name: Validator // Validators for exmple [null, Validators.required],
            command: [default_command]    
          },
        ],
        cardCallback: function //callback if any
        commandQuerryParser:boolean; if true will parse command with nput fields
        queryFields: [], //list of field names
 * }
        example of query parse 
        command: ping {ip}
        commandQuerryParser:true
        queryFields: ['ip'],
        cardFields: [
          {label:'IP to ping' field_ame:ip}
        ],
        {
          ip:[null,Validators.required]
        }
 * ]
 */
export class ToolsLTBConfig {
  static cardsMetaData: any = [
    [
      {
        cardTitle: 'Hostname',
        cardCommand: 'hostname',
        cardWidth: 150,
        cardHeight: 150,
        cardFields: [
          [
            { label: 'Machine IP', field_name: 'machine_ip' },
            { label: 'SSH Username', field_name: 'ssh_username' },
            { label: 'SSH Password', field_name: 'ssh_password' },
          ],
          {
            machine_ip: [null, Validators.required],
            ssh_username: [null, Validators.required],
            ssh_password: [null, Validators.required],
            command: ['hostname', Validators.required],
          },
        ],
        cardCallback: function (res: any) {
          //console.log('Callback ', res);
        },
      },

      {
        cardTitle: 'IP Config Linux',
        cardCommand: 'ifconfig',
        cardWidth: 150,
        cardHeight: 150,
        cardFields: [
          [
            { label: 'Machine IP', field_name: 'machine_ip' },
            { label: 'SSH Username', field_name: 'ssh_username' },
            { label: 'SSH Password', field_name: 'ssh_password' },
          ],
          {
            machine_ip: [null, Validators.required],
            ssh_username: [null, Validators.required],
            ssh_password: [null, Validators.required],
            command: ['ifconfig', Validators.required],
          },
        ],
      },
      {
        cardTitle: 'DIR',
        cardCommand: 'dir',
        cardWidth: 150,
        cardHeight: 150,
        cardFields: [
          [
            { label: 'Machine IP', field_name: 'machine_ip' },
            { label: 'SSH Username', field_name: 'ssh_username' },
            { label: 'SSH Password', field_name: 'ssh_password' },
          ],
          {
            machine_ip: [null, Validators.required],
            ssh_username: [null, Validators.required],
            ssh_password: [null, Validators.required],
            command: ['dir && sleep 40 && dir', Validators.required],
          },
        ],
      },
      {
        cardTitle: 'PING',
        cardCommand: 'ping {hostname}',
        cardWidth: 150,
        cardHeight: 150,
        cardFields: [
          [
            { label: 'Machine IP', field_name: 'machine_ip' },
            { label: 'SSH Username', field_name: 'ssh_username' },
            { label: 'SSH Password', field_name: 'ssh_password' },
            { label: 'Hostname to ping', field_name: 'hostname' },
          ],
          {
            machine_ip: [null, Validators.required],
            ssh_username: [null, Validators.required],
            ssh_password: [null, Validators.required],
            command: ['ping {hostname}', Validators.required],
            hostname: [null, Validators.required],
          },
        ],
        commandQuerryParser: true,
        queryFields: ['hostname'],
      },
      {
        cardTitle: 'TEST',
        cardCommand:
          'cd C:\\ && mkdir {folder1} && cd {folder1} && mkdir {folder2} && netstat -ano |findstr :{port}',
        cardWidth: 150,
        cardHeight: 150,
        cardFields: [
          [
            { label: 'Machine IP', field_name: 'machine_ip' },
            { label: 'SSH Username', field_name: 'ssh_username' },
            { label: 'SSH Password', field_name: 'ssh_password' },
            { label: 'Folder1', field_name: 'folder1' },
            { label: 'Folder1', field_name: 'folder2' },
            { label: 'Port', field_name: 'port' },
          ],
          {
            machine_ip: [null, Validators.required],
            ssh_username: [null, Validators.required],
            ssh_password: [null, Validators.required],
            command: [
              'cd C:\\ && mkdir {folder1} && cd {folder1} && mkdir {folder2} && netstat -ano |findstr :{port}',
              Validators.required,
            ],
            folder1: [null, Validators.required],
            folder2: [null, Validators.required],
            port: [null, Validators.required],
          },
        ],
        commandQuerryParser: true,
        queryFields: ['folder1', 'folder2', 'port'],
      },
    ],
  ];

  constructor() {}
}
