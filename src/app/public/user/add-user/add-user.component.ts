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
import { Team } from '../../DataModel/team';
import { AuthserviceService } from '../../services/authservice.service';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { TeamService } from '../../services/teams.service';
import { UserService } from '../../services/users.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { MustMatch } from '../../widget/utils/must-match.validator';
import { CustomValidator } from '../../widget/utils/no-white-space-validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public team = new FormControl();
  registerForm!: FormGroup;
  submitted = false;
  teams: any = [];
  permissionValueList: Array<String> = ['No', 'Yes'];
  title: string = ' Create User';
  loggedUser: any;
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private _auth: AuthserviceService,
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
    this.loggedUser = this._auth.getUser();
  }

  ngOnInit(): void {
    var teamValidation;
    var teamValue = null;
    if (this.loggedUser.permissions.is_admin) {
      teamValidation = Validators.required;
    } else {
      teamValidation = null;
    }
    this.registerForm = this.formBuilder.group(
      {
        user_name: ['', Validators.required],
        user_id: [
          '',
          [Validators.required, CustomValidator.restrictWhiteSpace],
        ],
        user_email: ['', [Validators.required, Validators.email]],
        user_pass: ['', [Validators.required, Validators.minLength(6)]],
        conf_pass: ['', Validators.required],
        team: [teamValue, teamValidation],
        addUser: ['No', Validators.required],
        editUser: ['No', Validators.required],
        removeUser: ['No', Validators.required],
        removeVM: ['No', Validators.required],
      },
      {
        validator: MustMatch('user_pass', 'conf_pass'),
      }
    );
  }

  // convenience getter for easy access to form fields
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
      'api/user/adduser',
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'Success') {
          this.userService.setNeedRefresh(true);
          this.openDialog(
            {
              type: 'message',
              message: 'User created successfully!',
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
}
