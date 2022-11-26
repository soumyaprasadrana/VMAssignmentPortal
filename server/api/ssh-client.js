const { Console } = require('console');
const { Client } = require('ssh2');
const { threadId } = require('worker_threads');
module.exports = class SSHClient{
   
    constructor(config){
        this.config=config;
        this.initialize();
    }
    initialize(config){
        this.conn = new Client();
        this.conn.on('ready',()=>{
            console.log('FIRST :: connection ready');
            this.conn.exec(this.config.getCommand(),(err,stream)=>{
                if (err) {
                    console.log('FIRST :: exec error: ' + err);
                    return this.conn.end();
                  }
                stream.on('close', () => {
                    console.log("closing ...")
                    this.conn.end(); // close parent (and this) connection
                  }).on('data', (data) => {
                    console.log("DATA=",data.toString());
                    this.data+=data;
                  }).on('error',(err)=>{
                    console.log("error=",err.toString());

                  });
            });
            
        }).connect({
            host: this.config.getHost(),
            port: this.config.getPort(),
            username: this.config.getUsername(),
            password: this.config.getPassword(),
        }).on('error',(err)=>{
            console.log("ERROR=",err);  
            if(err.code=='ECONNRESET'){
                console.log("CONNECTION CLOSED");
            }
        })
    }
    
}