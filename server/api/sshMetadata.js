module.exports = {
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
            field_name: Validator // Validators for exmple [null, "required"],
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
    cardsMetaData: [
        [{
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
                        machine_ip: [null, "required"],
                        ssh_username: [null, "required"],
                        ssh_password: [null, "required"],
                        command: ['hostname', "required"],
                    },
                ],
                cardCallback: function(res) {
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
                        machine_ip: [null, "required"],
                        ssh_username: [null, "required"],
                        ssh_password: [null, "required"],
                        command: ['ifconfig', "required"],
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
                        machine_ip: [null, "required"],
                        ssh_username: [null, "required"],
                        ssh_password: [null, "required"],
                        command: ['dir && sleep 40 && dir', "required"],
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
                        machine_ip: [null, "required"],
                        ssh_username: [null, "required"],
                        ssh_password: [null, "required"],
                        command: ['ping {hostname}', "required"],
                        hostname: [null, "required"],
                    },
                ],
                commandQuerryParser: true,
                queryFields: ['hostname'],
            },
            {
                cardTitle: 'TEST2',
                cardCommand: 'ls -ltrh',
                cardWidth: 150,
                cardHeight: 150,
                cardFields: [
                    [
                        { label: 'Machine IP', field_name: 'machine_ip' },
                        { label: 'SSH Username', field_name: 'ssh_username' },
                        { label: 'SSH Password', field_name: 'ssh_password' },

                    ],
                    {
                        machine_ip: [null, "required"],
                        ssh_username: [null, "required"],
                        ssh_password: [null, "required"],
                        command: [
                            'ls -ltrh',
                            "required",
                        ],

                    },
                ],
                commandQuerryParser: false,

            },
            {
                cardTitle: 'TEST',
                cardCommand: 'cd C:\\ && mkdir {folder1} && cd {folder1} && mkdir {folder2} && netstat -ano |findstr :{port}',
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
                        machine_ip: [null, "required"],
                        ssh_username: [null, "required"],
                        ssh_password: [null, "required"],
                        command: [
                            'cd C:\\ && mkdir {folder1} && cd {folder1} && mkdir {folder2} && netstat -ano |findstr :{port}',
                            "required",
                        ],
                        folder1: [null, "required"],
                        folder2: [null, "required"],
                        port: [null, "required"],
                    },
                ],
                commandQuerryParser: true,
                queryFields: ['folder1', 'folder2', 'port'],
            },
        ],
    ],
    defaultSSHUsername: 'default',
    defaultSSHPassword: 'passwod'
}