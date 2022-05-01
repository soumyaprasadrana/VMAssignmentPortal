// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc User Home Component
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { UserService } from '../../services/users.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { ToastService } from '../../widget/toast/toast-service';
import { UserConfig } from '../user.config';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  cardsMetaData: any;
  userList: any;
  loggedUser:any;
  constructor(
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private _auth:AuthserviceService,
    private toastService:ToastService
  ) {
    this.cardsMetaData = UserConfig.cardsMetaData;
    if (_client.deviceIsMobile()) {
      for (var row in this.cardsMetaData) {
        for (var col in this.cardsMetaData[row]) {
          //console.log(this.cardsMetaData[row][col]);
          this.cardsMetaData[row][col].cardHeight = '200';
          this.cardsMetaData[row][col].cardWidth = '300';
        }
      }
    }
    this.loggedUser=_auth.getUser();
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
        bindLabel: 'user_name',
        bindValue: 'user_id',
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
                  this.userService.setNeedRefresh(true);
                  if(this.loggedUser.useToast){
                    this.toastService.showDanger('User deleted successfully!',5000);
                  }else{
                  this.openDialog(
                    {
                      type: 'message',
                      message: 'User deleted successfully!',
                    },
                    function () {
                      window.location.reload();
                    }
                  );
                  }
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
