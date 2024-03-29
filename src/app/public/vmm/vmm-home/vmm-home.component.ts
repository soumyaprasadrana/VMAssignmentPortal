// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc VMM Home Component
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { VmsService } from '../../services/vms.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { ToastService } from '../../widget/toast/toast-service';
import { VMMConfig } from '../vmm.config';

@Component({
  selector: 'app-vmm-home',
  templateUrl: './vmm-home.component.html',
  styleUrls: ['./vmm-home.component.scss'],
})
export class VmmHomeComponent implements OnInit {
  cardsMetaData: any;
  vmList: any = [];
  loggedUser: any;
  constructor(
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private vms: VmsService,
    private toastService:ToastService,
    private _auth: AuthserviceService,
  ) {
    this.cardsMetaData = VMMConfig.cardsMetaData;
    if (_client.deviceIsMobile()) {
      for (var row in this.cardsMetaData) {
        for (var col in this.cardsMetaData[row]) {
          //console.log(this.cardsMetaData[row][col]);
          this.cardsMetaData[row][col].cardHeight = '200';
          this.cardsMetaData[row][col].cardWidth = '300';
        }
      }
    }
    this.loggedUser = this._auth.getUser();
  }

  ngOnInit(): void {}
  deleteVM() {
    //console.log('delete VM clicked');
    this._spinner.setSpinnerState(true);
    this.vms
      .getVms()
      .then((res: any[]) => {
        this.vmList = res;
        this.getData(this.vmList);
        this._spinner.setSpinnerState(false);
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
      });
    this._spinner.setSpinnerState(false);
  }
  getData(list: any) {
    //console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a virtual machine',
        label: 'VM IP',
        placeholder: 'Select VM',
        list: list,
        bindLabel: 'ip',
        bindValue: 'ip',
      },
      (res: any) => {
        //console.log('data from close:', res);
        res = res.dataCtrl;
        //Delete Call for node
        //console.log('Result from dialog', res);
        this._spinner.setSpinnerState(true);
        this.vms
          .deleteVM(res.ip)
          .then((res: any) => {
            res = JSON.parse(res);
            this._spinner.setSpinnerState(false);
            if (res.status == 'Success') {
              this.vms.setNeedRefresh(true);
              if(this.loggedUser.useToast)
                this.toastService.showDanger('VM removed successfully',5000);
              /*this.openDialog(
                {
                  type: 'message',
                  message: 'VM removed successfully',
                },
                function () {
                  window.location.reload();
                }
              );*/
            } else {
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
    );
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
  openDialog(data: any, callback: any) {
    this.dialog
      .open(AlertDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        if (typeof callback == 'function') {
          callback();
        }
      });
  }
}
