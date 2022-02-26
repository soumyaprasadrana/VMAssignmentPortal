// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Add Technote Component
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TeamService } from '../../services/teams.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { AuthserviceService } from '../../services/authservice.service';
import { TechnotesService } from '../../services/technotes.service';
@Component({
  selector: 'app-add-technotes',
  templateUrl: './add-technotes.component.html',
  styleUrls: ['./add-technotes.component.scss'],
})
export class AddTechnotesComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  selectedTeam!: string;
  selectedOS!: string;
  osList: any = [];
  teams: any = [];
  title: string = ' Add Technote';
  loggedUser: any;
  isGlobalValueList = ['No', 'Yes'];
  editMode: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private _auth: AuthserviceService,
    private technoteService: TechnotesService
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
  public ngxteam = new FormControl();

  ngOnInit(): void {
    var teamValidation;
    var teamValue = null;
    if (this.loggedUser.permissions.is_admin) {
      teamValidation = Validators.required;
    } else {
      teamValidation = null;
    }
    this.registerForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
      keywords: [''],
      technote: ['', Validators.required],
      is_global: ['No'],
      ngxteam: [null, teamValidation],
    });
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
    console.log(this.registerForm.value);

    // display form values on success
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var _promise = this._client.post(
      'api/technotes/addTechnote',
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'Success') {
          this.technoteService.setNeedRefresh(true);
          this.openDialog(
            {
              type: 'message',
              message: 'Technote added successfully!',
            },
            () => {
              this.router.navigate(['/portal/home/tools/technotes']);
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
      .then((res) => {
        if (typeof callback == 'function') {
          callback();
        }
      });
  }
}
