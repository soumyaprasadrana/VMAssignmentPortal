// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Admin Home Component
 */
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice.service";
import { NodeclientService } from "../../services/nodeclient.service";
import { SpinnerService } from "../../services/spinner-service";
import { TeamService } from "../../services/teams.service";
import { UserService } from "../../services/users.service";
import { AlertDialogComponent } from "../../widget/alert-dialog/alert-dialog.component";
import { InputDialogComponent } from "../../widget/alert-dialog/input-dialog.component";
import { YornDialogComponent } from "../../widget/alert-dialog/yorn-dialog.component";
import { ToastService } from "../../widget/toast/toast-service";
import { AdminConfig } from "../admin.config";
@Component({
  selector: "app-admin-home",
  templateUrl: "./admin-home.component.html",
  styleUrls: [ "./admin-home.component.scss" ],
})
export class AdminHomeComponent implements OnInit {
  cardsMetaData: any;
  teamList: any;
  userList: any;
  loggedUser: any;
  constructor(
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private tms: TeamService,
    private userService: UserService,
    private _auth: AuthserviceService,
    private toastService: ToastService
  ) {
    this.cardsMetaData = AdminConfig.cardsMetaData;
    if (_client.deviceIsMobile()) {
      for (var row in this.cardsMetaData) {
        for (var col in this.cardsMetaData[row]) {
          //console.log(this.cardsMetaData[row][col]);
          this.cardsMetaData[row][col].cardHeight = "200";
          this.cardsMetaData[row][col].cardWidth = "300";
        }
      }
    }
    this.loggedUser = _auth.getUser();
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
      list.push(res[item]["team_name"]);
    }
    return list;
  }
  getTeamFromDialogAndCallback(list: any) {
    console.log(list);
    this.openDialogInput(
      {
        title: "Choose a team",
        label: "Team",
        placeholder: "Select team",
        list: list,
        bindLabel: "team",
      },
      async (res: any) => {
        console.log("data from close:", res);
        res = res.dataCtrl;
        let userConfirmation = await this.openYornDialog({
          title: "Prompt",
          message: `<p class="mb-3"><strong>Do you really want to remove this team  "${res}"?</strong></p>`,
        });
        if (!userConfirmation) {
          return;
        }
        this._spinner.setSpinnerState(true);
        //console.log(res);
        this.tms
          .deleteTeam(res)
          .then((res2: any) => {
            res2 = JSON.parse(res2);
            if (res2.status == "SUCCESS") {
              this._spinner.setSpinnerState(false);

              this.openDialog(
                {
                  type: "message",
                  message: "Team deleted successfully!",
                },
                function() {
                  window.location.reload();
                }
              );
            } else {
              this._spinner.setSpinnerState(false);
              this.openDialog(
                {
                  type: "alert",
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
                type: "alert",
                message: err.message,
              },
              null
            );
          });

        //  this._spinner.setSpinnerState(false);
      }
    );
  }
  openDialog(data: any, callback: any) {
    this.dialog
      .open(AlertDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",
      })
      .afterClosed()
      .toPromise()
      .then((res: any) => {
        if (typeof callback == "function") {
          callback();
        }
      });
  }
  openDialogInput(data: any, callback: any) {
    this.dialog
      .open(InputDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",

        width: "500px",
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        //console.log(res);
        if (typeof callback == "function" && res != "" && res != null) {
          callback(res);
        }
      });
  }
  promoteUser() {
    //console.log('Delete User Called');
    this._spinner.setSpinnerState(true);
    this.userService
      .getNormalUsers()
      .then((res: any) => {
        this.userList = res;
        this.getUserFromDialogAndCallback(this.userList);
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
        title: "Choose a user",
        label: "Username",
        placeholder: "Select user",
        list: list,
        bindLabel: "user_id",
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
              .promoteUser(res.user.user_id)
              .then((res2: any) => {
                res2 = JSON.parse(res2);
                if (res2.status == "Success") {
                  if (this.loggedUser.useToast) {
                    this.toastService.showSuccess(
                      "User promoted to Team Lead.",
                      5000
                    );
                  } else {
                    this.openDialog(
                      {
                        type: "message",
                        message: "User promoted to Team Lead.",
                      },
                      null
                    );
                  }
                } else {
                  this._spinner.setSpinnerState(false);
                  this.openDialog(
                    {
                      type: "alert",
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
                    type: "alert",
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
        //this._spinner.setSpinnerState(false);
      }
    );
  }
  ngOnInit(): void {}
  openYornDialog(data: any) {
    return this.dialog
      .open(YornDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",
      })
      .afterClosed()
      .toPromise();
  }
}
