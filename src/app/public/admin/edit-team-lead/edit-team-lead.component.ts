// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Edit Team Lead Component
 */
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { TeamService } from '../../services/teams.service';
import { UserService } from '../../services/users.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';

@Component({
  selector: 'app-edit-team-lead',
  templateUrl: './edit-team-lead.component.html',
})
export class EditTeamLeadComponent implements OnInit {
  public team = new FormControl();
  registerForm!: FormGroup;
  submitted = false;
  teams: any = [];
  userList: any = [];
  permissionValueList: Array<String> = ['No', 'Yes'];
  title: string = ' Edit Team Lead';
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {
    tms
      .getTeams()
      .then((res) => {
        this.teams = res;
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      team: [null, Validators.required],
      is_teamLead: ['Yes', Validators.required],
    });

    this._spinner.setSpinnerState(true);
    this.userService
      .getTeamLeads()
      .then((res) => {
        this.userList = res;
        this.getData(this.userList);
        this._spinner.setSpinnerState(false);
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
      });
    this._spinner.setSpinnerState(false);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  getData(list: any) {
    //console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a user',
        label: 'Username',
        placeholder: 'Select user',
        list: list,
        bindLabel: 'user_id',
        closeCallback: () => {
          this.router.navigate(['/portal/home/admin/dash']);
        },
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
            this.registerForm = this.formBuilder.group({
              user_id: [res.user.user_id, Validators.required],
              user_name: [res.user.user_name, Validators.required],
              user_email: [
                res.user.user_email,
                [Validators.required, Validators.email],
              ],
              team: [res.user.user_team, Validators.required],
              is_teamLead: ['Yes', Validators.required],
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

  onSubmit() {
    this.submitted = true;
    this._spinner.setSpinnerState(true);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this._spinner.setSpinnerState(false);
      return;
    }

    // display form values on success
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var _promise = this._client.post(
      'api/user/updateTeamLead',
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('Res', JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'Success') {
          this.userService.setNeedRefresh(true);
          this.openDialog(
            {
              type: 'message',
              message: 'User updated successfully!',
            },
            () => {
              this.router.navigate(['/portal/home/admin/dash']);
            }
          );
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
}
