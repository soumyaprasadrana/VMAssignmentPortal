import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/public/services/authservice.service';
import { GlobalSearchService } from 'src/app/public/services/global-search.service';
import { SpinnerService } from 'src/app/public/services/spinner-service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { PassChangeDialogComponent } from '../../alert-dialog/change-pass-dialog';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  loggedUser!: any;
  constructor(
    private searchService: GlobalSearchService,
    private auth: AuthserviceService,
    private router: Router,
    private dialog: MatDialog,
    private _spinner: SpinnerService
  ) {}

  ngOnInit() {
    this.loggedUser = this.auth.getUser();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
  openDialog() {
    this.openDialogInput(
      {
        title: 'Change Password',
      },
      (res: any) => {
        //console.log('data from close:', res);
        this._spinner.setSpinnerState(true);
        var promise = this.auth.changePassword(res);
        promise
          .then((res: any) => {
            //console.log('change Pass- res', res);
            this._spinner.setSpinnerState(false);
            res = JSON.parse(res);
            if (res.status == 'Success') {
              this.openAlertDialog({
                type: 'message',
                message: 'Password Changed Successfully!',
              });
            } else {
              this.openAlertDialog({
                type: 'alert',
                message: res.message || res.status || 'Failed',
              });
            }
          })
          .catch((err) => {
            //console.log('Error occured ! ');
            this.openAlertDialog({
              type: 'alert',
              message: err.message || err.status || 'Error Occured!',
            });
          });
      }
    );
  }
  signOut() {
    //console.log('Signing out user ...');
    var promise = this.auth.signOut();
    promise
      .then((result) => {
        if (result.status) {
          this.router.navigate(['/portal/login']).then(() => {
            window.location.reload();
          });
        } else {
          console.log('Signout Failed');
        }
      })
      .catch((result) => {
        console.log('Signout Failed');
      });
  }
  openDialogInput(data: any, callback: any) {
    this.dialog
      .open(PassChangeDialogComponent, {
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
  openAlertDialog(data: any) {
    this.dialog.open(AlertDialogComponent, {
      data: data,
      panelClass: 'app-dialog-class',
    });
  }
}
