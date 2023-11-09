// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-11-24 18:06:39
 * @desc Team Stats Component
 */
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/users.service";
import { GroupByPipe } from "ngx-pipes";
import { SpinnerService } from "../../services/spinner-service";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from "../../widget/alert-dialog/alert-dialog.component";
import { AuthserviceService } from "../../services/authservice.service";
import { ToastService } from "../../widget/toast/toast-service";
import { YornDialogComponent } from "../../widget/alert-dialog/yorn-dialog.component";
@Component({
  selector: "app-team-stats",
  templateUrl: "./team-stats.component.html",
  styleUrls: [ "./team-stats.component.scss" ],
})
export class TeamStatsComponent implements OnInit {
  list: any = [];
  temp: any = {};
  loggedUser: any;
  constructor(
    private us: UserService,
    private _spinner: SpinnerService,
    private dialog: MatDialog,
    private _auth: AuthserviceService,
    private toastService: ToastService
  ) {
    us
      .getTeamStats()
      .then((res: any) => {
        res = JSON.parse(res);
        for (var key in res) {
          this.list.push(res[key]);
        }
      })
      .catch((error) => {
        //console.log(error);
      });
    this.loggedUser = _auth.getUser();
  }

  async resetPassword(user: String) {
    let userConfirmation = await this.openYornDialog({
      title: "Prompt",
      message: `<p class="mb-3"><strong> Do you really want to reset password for user   "${user}"?</strong></p>`,
    });
    if (userConfirmation) {
      this._spinner.setSpinnerState(true);
      this.us
        .resetUserPassword(user)
        .then((res2: any) => {
          res2 = JSON.parse(res2);
          if (res2.status == "Success" || res2.status == true) {
            this.us.setNeedRefresh(true);
            if (this.loggedUser.useToast) {
              this.toastService.showSuccess(
                "User password updated successfully!",
                5000
              );
              this.openDialog(
                {
                  type: "message",
                  message:
                    "Updated password for user: " +
                    user +
                    " is " +
                    atob(res2.newPassword).toString(),
                },
                null
              );
            } else {
              this.openDialog(
                {
                  type: "message",
                  message:
                    "User password updated successfully!" +
                    "\n" +
                    "Updated password for user: " +
                    user +
                    " is " +
                    atob(res2.newPassword).toString(),
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
    }
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
  openYornDialog(data: any) {
    return this.dialog
      .open(YornDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",
      })
      .afterClosed()
      .toPromise();
  }
  ngOnInit(): void {}
}
