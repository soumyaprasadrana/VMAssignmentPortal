import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Console } from 'console';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { TeamService } from '../../services/teams.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { AdminConfig } from '../admin.config';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  cardsMetaData: any;
  teamList: any;
  userService: any;
  constructor(
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private tms: TeamService
  ) {
    this.cardsMetaData = AdminConfig.cardsMetaData;
  }
  deleteTeam() {
    //console.log('Delete User Called');
    this._spinner.setSpinnerState(true);
    this.tms
      .getTeams()
      .then((res) => {
        this.teamList = this.parseList(res);
        this.getTeamFromDialogAndCallback(this.teamList);
        this._spinner.setSpinnerState(false);
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
      });
    this._spinner.setSpinnerState(false);
  }
  parseList(res: any) {
    var list = [];
    for (var item in res) {
      list.push(res[item]['team_name']);
    }
    return list;
  }
  getTeamFromDialogAndCallback(list: any) {
    console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a team',
        label: 'Team',
        placeholder: 'Select team',
        list: list,
        bindLabel: 'team',
      },
      (res: any) => {
        console.log('data from close:', res);
        res = res.dataCtrl;

        if (!window.confirm('Delete team:' + res + '?')) {
          return;
        }
        this._spinner.setSpinnerState(true);
        //console.log(res);
        this.tms
          .deleteTeam(res)
          .then((res2: any) => {
            res2 = JSON.parse(res2);
            if (res2.status == 'SUCCESS') {
              this._spinner.setSpinnerState(false);
              this.openDialog(
                {
                  type: 'message',
                  message: 'Team deleted successfully!',
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
