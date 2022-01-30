import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { UserService } from '../../services/users.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { UserConfig } from '../user.config';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  cardsMetaData: any;
  userList: any;
  constructor(
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {
    this.cardsMetaData = UserConfig.cardsMetaData;
  }
  deleteUser() {
    //console.log('Delete User Called');
    this._spinner.setSpinnerState(true);
    this.userService
      .getUsers()
      .then((res) => {
        this.userList = res;
        this.getUserFromDialogAndCallback(this.userList);
        this._spinner.setSpinnerState(false);
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
      });
    this._spinner.setSpinnerState(false);
  }
  getUserFromDialogAndCallback(list: any) {
    //console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a user',
        label: 'Username',
        placeholder: 'Select user',
        list: list,
        bindLabel: 'user_id',
      },
      (res: any) => {
        //console.log('data from close:', res);
        res = res.dataCtrl.user_id;
        this._spinner.setSpinnerState(true);
        this.userService
          .getUser(res)
          .then((res: any) => {
            res = JSON.parse(res);
            //console.log(res);
            this.userService
              .deleteUser(res.user.user_id)
              .then((res2: any) => {
                res2 = JSON.parse(res2);
                if (res2.status == 'Success') {
                  this.openDialog(
                    {
                      type: 'message',
                      message: 'User deleted successfully!',
                    },
                    function () {
                      window.location.reload();
                    }
                  );
                } else {
                  this._spinner.setSpinnerState(false);
                  this.openDialog(
                    {
                      type: 'alert',
                      message: res2.message,
                    },
                    null
                  );
                }
              })
              .catch((err: any) => {
                //console.log('Error:', err);
                this._spinner.setSpinnerState(false);
                this.openDialog(
                  {
                    type: 'alert',
                    message: err.message,
                  },
                  null
                );
              });

            this._spinner.setSpinnerState(false);
          })
          .catch((err: any) => {
            this._spinner.setSpinnerState(false);
            //console.log('error occurred ', err);
          });
        this._spinner.setSpinnerState(false);
      }
    );
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
  openDialogInput(data: any, callback: any) {
    this.dialog
      .open(InputDialogComponent, {
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
  ngOnInit(): void {}
}
