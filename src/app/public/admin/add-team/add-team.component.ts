// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Add-Team Component
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidator } from '../../widget/utils/no-white-space-validator';
import { NodeclientService } from '../../services/nodeclient.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { SpinnerService } from '../../services/spinner-service';
import { Router } from '@angular/router';
import { TeamService } from '../../services/teams.service';
import { AuthserviceService } from '../../services/authservice.service';
import { ToastService } from '../../widget/toast/toast-service';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  title: string = 'Create Team';
  loggedUser:any;
  constructor(
    private formBuilder: FormBuilder,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private _spinner: SpinnerService,
    private router: Router,
    private tms: TeamService,
    private _auth:AuthserviceService,
    private toastService:ToastService
  ) {
    this.loggedUser=_auth.getUser();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      team_name: [
        '',
        [Validators.required, CustomValidator.restrictWhiteSpace],
      ],
      team_desc: [''],
    });
  }
  get f() {
    return this.registerForm.controls;
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
      'api/admin/addTeam',
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'SUCCESS') {
          this.tms.setNeedRefresh(true);
          if(this.loggedUser.useToast){
            this.toastService.showSuccess(res.message,5000);
            this.router.navigate(['/portal/home/admin/dash']);
          }else{
          this.openDialog(
            {
              type: 'message',
              message: res.message,
            },
            () => {
              this.router.navigate(['/portal/home/admin/dash']);
            }
          );
          }
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
