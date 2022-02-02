import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from '../../widget/utils/must-match.validator';
import { CustomValidator } from '../../widget/utils/no-white-space-validator';
import { NodeclientService } from '../../services/nodeclient.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { SpinnerService } from '../../services/spinner-service';
import { TeamService } from '../../services/teams.service';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-team',
  templateUrl: '../add-team/add-team.component.html',
  styleUrls: ['../add-team/add-team.component.scss'],
})
export class EditTeamComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  title: string = 'Edit Team';
  selectedTeam: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private _spinner: SpinnerService,
    private tms: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      team_name: [
        '',
        [Validators.required, CustomValidator.restrictWhiteSpace],
      ],
      team_desc: [''],
    });
    this._spinner.setSpinnerState(true);
    this.tms
      .getTeams()
      .then((res) => {
        this.getData(res);
        this._spinner.setSpinnerState(false);
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
      });
    this._spinner.setSpinnerState(false);
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
      'api/admin/updateTeam/' + this.selectedTeam,
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'SUCCESS') {
          this.openDialog(
            {
              type: 'message',
              message: res.message,
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
        //console.log(err);
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

  getData(list: any) {
    //console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a team',
        label: 'Team',
        placeholder: 'Select Team',
        list: list,
        bindLabel: 'team_name',
        closeCallback: () => {
          this.router.navigate(['/portal/home/admin/dash']);
        },
      },
      (res: any) => {
        //console.log('data from close:', res);
        res = res.dataCtrl.team_name;
        this.selectedTeam = res;
        this._spinner.setSpinnerState(true);
        this.tms
          .getTeam(res)
          .then((res: any) => {
            res = JSON.parse(res);

            this.registerForm = this.formBuilder.group({
              team_name: [
                res.team_name,
                [Validators.required, CustomValidator.restrictWhiteSpace],
              ],
              team_desc: [res.team_desc],
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
      .then((res: any) => {
        if (typeof callback == 'function') {
          callback();
        }
      });
  }
}
