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
import { AnyCnameRecord } from 'dns';
import { Team } from '../../DataModel/team';
import { AuthserviceService } from '../../services/authservice.service';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { TeamService } from '../../services/teams.service';
import { UserService } from '../../services/users.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { MustMatch } from '../../widget/utils/must-match.validator';
import { CustomValidator } from '../../widget/utils/no-white-space-validator';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['../add-user/add-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public team = new FormControl();
  registerForm!: FormGroup;
  submitted = false;
  teams: any = [];
  userList: any = [];
  permissionValueList: Array<String> = ['No', 'Yes'];
  title: string = ' Edit User';
  loggedUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private _auth: AuthserviceService
  ) {
    tms
      .getTeams()
      .then((res) => {
        this.teams = res;
      })
      .catch((error) => {
        //console.log(error);
      });
    this.loggedUser = _auth.getUser();
  }

  ngOnInit(): void {
    var teamValidation;
    if (this.loggedUser.permissions.is_admin) {
      teamValidation = Validators.required;
    } else {
      teamValidation = null;
    }
    this.registerForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      team: [null, teamValidation],
      addUser: ['NO', Validators.required],
      editUser: ['No', Validators.required],
      removeUser: ['No', Validators.required],
      removeVM: ['No', Validators.required],
    });

    this._spinner.setSpinnerState(true);
    this.userService
      .getUsers()
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
          this.router.navigate(['/portal/home/user/dash']);
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
              addUser: [
                this.parsePermission(res.protocols.create_user),
                Validators.required,
              ],
              editUser: [
                this.parsePermission(res.protocols.update_user),
                Validators.required,
              ],
              removeUser: [
                this.parsePermission(res.protocols.delete_user),
                Validators.required,
              ],
              removeVM: [
                this.parsePermission(res.protocols.delete_vm),
                Validators.required,
              ],
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
  parsePermission(val: any): any {
    return val == 1 ? 'Yes' : 'No';
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
      'api/user/updateUser',
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
              this.router.navigate(['/portal/home/user/dash']);
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
