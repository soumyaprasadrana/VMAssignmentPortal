// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Edit Technote Component
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
import { ActivatedRoute, Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { AuthserviceService } from '../../services/authservice.service';
import { TechnotesService } from '../../services/technotes.service';
import { ToastService } from '../../widget/toast/toast-service';
@Component({
  selector: 'app-edit-technotes',
  templateUrl: '../add-technotes/add-technotes.component.html',
  styleUrls: ['../add-technotes/add-technotes.component.scss'],
})
export class EditTechnotesComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  selectedTeam!: string;
  selectedOS!: string;
  osList: any = [];
  teams: any = [];
  title: string = ' Edit Technote';
  loggedUser: any;
  isGlobalValueList = ['No', 'Yes'];
  editMode: boolean = false;
  technoteID: any;
  technotesDataSet!: any[];
  technote: any;
  isLoaded!: boolean;
  isDataloadFailed: any;
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private _auth: AuthserviceService,
    private technoteService: TechnotesService,
    private actRoute: ActivatedRoute,
    private toastService:ToastService
  ) {
    tms
      .getTeams()
      .then((res) => {
        this.teams = res;
      })
      .catch((error) => {
        //console.log(error);
      });
    this._spinner.setSpinnerState(true);
    this.technoteID = this.actRoute.snapshot.params.technoteID;
    var promise = this.technoteService.getTechnote(this.technoteID);
    promise
      .then((res:any) => {
        this._spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting technote');
        this.technote=JSON.parse(res)
        console.log(this.technote);
        this.isLoaded = true;
        if (this.technote.failed) {
          console.log('No technotefound with this id.');
          if(this.loggedUser.useToast){
            this.toastService.showDanger('Technote not found!!',5000);
            this.router.navigate(['/portal/home/tools/technotes']);
          }else{
          this.openDialog(
            {
              type: 'message',
              message: 'Technote not found!!',
            },
            () => {
              this.router.navigate(['/portal/home/tools/technotes']);
            }
          );
        } 
      }
        else {
          console.log('Setting form values..');
          var teamValidation;
          if (this.loggedUser.permissions.is_admin) {
            teamValidation = Validators.required;
          } else {
            teamValidation = null;
          }
          this.registerForm = this.formBuilder.group({
            description: [
              this.technote.description,
              [Validators.required, Validators.maxLength(500)],
            ],
            keywords: [this.technote.keywords],
            technote: [this.technote.technote, Validators.required],
            is_global: [this.technote.is_global ? 'Yes' : 'No'],
            ngxteam: [this.technote.team, teamValidation],
          });
          console.log('completed..');
        }
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
        this.isLoaded = false;
        this.isDataloadFailed=true;
      });
   
    this.loggedUser = this._auth.getUser();
  }
  public ngxteam = new FormControl();

  ngOnInit(): void {
    if (this.registerForm == null) {
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
      'api/technotes/editTechnote/' + this.technote.id,
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
          if(this.loggedUser.useToast){
            this.toastService.showSuccess('Technote updated successfully!',7000);
            this.router.navigate(['/portal/home/tools/technotes']);
          }else{
          this.openDialog(
            {
              type: 'message',
              message: 'Technote updated successfully!',
            },
            () => {
              this.router.navigate(['/portal/home/tools/technotes']);
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
          callback(res);
        }
      });
  }
}
