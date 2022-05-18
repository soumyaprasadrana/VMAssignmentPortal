// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Add VM Component
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TeamService } from '../../services/teams.service';
import { OSService } from '../../services/vm.os.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { AuthserviceService } from '../../services/authservice.service';
import { VmsService } from '../../services/vms.service';
import { ToastService } from '../../widget/toast/toast-service';
@Component({
  selector: 'app-add-vm',
  templateUrl: './add-vm.component.html',
  styleUrls: ['./add-vm.component.scss'],
})
export class AddVmComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  selectedTeam!: string;
  selectedOS!: string;
  osList: any = [];
  teams: any = [];
  title: string = ' Add Virtual Machine';
  loggedUser: any;
  editMode: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private oss: OSService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private _auth: AuthserviceService,
    private vms: VmsService,
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
    oss
      .getOsList()
      .then((res) => {
        this.osList = res;
      })
      .catch((error) => {
        //console.log(error);
      });
    this.loggedUser = this._auth.getUser();
  }
  public ngxteam = new FormControl();
  public ngxos = new FormControl();
  ngOnInit(): void {
    var teamValidation;
    var teamValue = null;
    if (this.loggedUser.permissions.is_admin) {
      teamValidation = Validators.required;
    } else {
      teamValidation = null;
    }
    this.registerForm = this.formBuilder.group({
      ip: ['', [Validators.required,Validators.pattern('\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b')]],
      host: ['', Validators.required],
      ngxos: [null, Validators.required],
      ram: [null, [Validators.min(0), Validators.max(200)]],
      group: [''],
      owner: [''],
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

    // display form values on success
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var _promise = this._client.post(
      'api/vm/addVM',
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'Success') {
          this.vms.setNeedRefresh(true);
          if(this.loggedUser.useToast){
             this.toastService.showSuccess('VM added successfully!',5000);
             this.router.navigate(['/portal/home/vmm/dash']);
          }else{
          this.openDialog(
            {
              type: 'message',
              message: 'VM added successfully!',
            },
            () => {
              this.router.navigate(['/portal/home/vmm/dash']);
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
