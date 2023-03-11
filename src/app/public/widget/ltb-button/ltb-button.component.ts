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
  submitted = false;
  constructor(
    private dialog: MatDialog,
    private _client: NodeclientService,
    private _spinner: SpinnerService,
    private router: Router
  ) {}
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
      (res: any) => {}
    );
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
