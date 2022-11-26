import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { LTBButtonInputDialogComponent } from '../alert-dialog/ltb-button-input-dialog.component';
import { LtbOutputDialogComponent } from '../ltb-output-dialog/ltb-output-dialog.component';

@Component({
  selector: 'app-ltb-button',
  templateUrl: './ltb-button.component.html',
  styleUrls: ['./ltb-button.component.scss'],
})
export class LtbButtonComponent implements OnInit {
  @Input() command: string = '';
  @Input() host: string = '';
  @Input() user: string = '';
  @Input() pass: string = '';
  @Input() title: string = '';
  @Input() inputFields: any = [];
  @Input() callback: any = null;
  @Input() cardHeight: number = 100;
  @Input() cardWidth: number = 100;
  @Input() commandQuerryParser: boolean = false;
  @Input() queryFields: [] = [];
  enableSSH2:boolean=false;
  submitted = false;
  constructor(
    private dialog: MatDialog,
    private _client: NodeclientService,
    private _spinner: SpinnerService,
    private router: Router,
  ) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    var httpOptions = {
      headers: headers,
    };
    var useNodeSSH2;
    this._client
      .get('api/config/enableSSH2', httpOptions)
      .then((res: any) => {
        useNodeSSH2 = res.enableSSH2;
        console.log(
          'Config enableSSH2 loded from server :',
          useNodeSSH2
        );
        this.enableSSH2 = useNodeSSH2;
      })
      .catch((err) => {
        console.log('Error Occurred! Using default value!');
      });
  }

  ngOnInit(): void {}
  submit(): void {
    //console.log('submit called');

    //console.log(this.inputFields);

    this.getData(this.inputFields[0], this.inputFields[1]);
  }
  getData(list: any, formCtrl: {}) {
    //console.log(list);
    this.openDialogInput(
      {
        list: list,
        formCtrl: formCtrl,
        commandQuerryParser: this.commandQuerryParser,
        queryFields: this.queryFields,
      },
      (res: any) => {
        //console.log(res);
        if (typeof this.callback == 'function') {
          this.callback(res);
        } else {
          //console.log('usual path to show result');
      if(!this.enableSSH2){
          this.submitted = true;
          this._spinner.setSpinnerState(true);

          // display form values on success
          var headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });

          var httpOptions = {
            headers: headers,
          };
          var _promise = this._client.post('api/stream/exec', res, httpOptions);
          _promise
            .then((res: any) => {
              this._spinner.setSpinnerState(false);

              if (res) res = JSON.parse(res);
              if (res.execStatus == 'true') {
                //pass case
                this.openOutputDialog(res);
              } else {
                this._spinner.setSpinnerState(false);
                this.openDialog(
                  {
                    type: 'alert',
                    message: res.message,
                  },
                  null
                );
              }
            })
            .catch((err: any) => {
              this._spinner.setSpinnerState(false);
              this.openDialog(
                {
                  type: 'alert',
                  message: err.message,
                },
                null
              );
            });
        }
        else{
          this.submitted=true;
          this._spinner.setSpinnerState(true);
          console.log(res);
          this.openWebSSH(res.ssh_username,res.ssh_password,res.ssh_port,res.machine_ip,res.command);
          this._spinner.setSpinnerState(false);
        }
      }
      }
    );
  }
  openWebSSH(username:any,password:any,port:any,hostname:any,command:any){
    console.log("clicked openWebSSH");
    const routerLink = ['/portal/spa/', 'sshclient'];
    var appUrl = this.router.serializeUrl(
      this.router.createUrlTree(routerLink,{ queryParams: { hostname: hostname, username: username,port:port,password:password,type:'exec',command:command } })
    );
    
    //appUrl+="?hostname="+hostname+"&username="+username+"&port="+port+"&password="+password+"&type=exec&command="+command;
    console.log(appUrl);
    window.open(appUrl, '_blank');
   
  }
  openDialogInput(data: any, callback: any) {
    this.dialog
      .open(LTBButtonInputDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
        width: '500px',
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        //console.log(res);
        if (typeof callback == 'function' && res != '' && res != null) {
          callback(res);
        }
      });
  }

  openDialog(data: any, callback: any) {
    this.dialog
      .open(AlertDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
      })
      .afterClosed()
      .toPromise()
      .then((res: any) => {
        if (typeof callback == 'function') {
          callback();
        }
      });
  }
  openOutputDialog(data: any) {
    //console.log(data, 'Going to open output dialog');
    this.dialog.open(LtbOutputDialogComponent, {
      data: data,
      panelClass: 'app-dialog-class',
    });
  }
}
