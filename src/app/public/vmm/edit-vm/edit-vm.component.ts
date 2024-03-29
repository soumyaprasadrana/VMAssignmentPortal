// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Edit VM Component
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from '../../widget/utils/must-match.validator';
import { Team } from '../../DataModel/team';
import { TeamService } from '../../services/teams.service';
import { OS } from '../../DataModel/os';
import { OSService } from '../../services/vm.os.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { VmsService } from '../../services/vms.service';
import { AuthserviceService } from '../../services/authservice.service';
import { ToastService } from '../../widget/toast/toast-service';
@Component({
  selector: 'app-edit-vm',
  templateUrl: '../add-vm/add-vm.component.html',
  styleUrls: ['../add-vm/add-vm.component.scss'],
})
export class EditVmComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  selectedTeam!: string;
  selectedOS!: string;
  osList: any = [];
  teams: any = [];
  vmList: any = [];
  title: string = ' Edit Virtual Machine';
  loggedUser: any;
  editMode: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private oss: OSService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private vms: VmsService,
    private activateRoute: ActivatedRoute,
    private _auth: AuthserviceService,
    private toastService:ToastService
  ) {
    tms
      .getTeams()
      .then((res) => {
        this.teams = res;
        //console.log('Teams', this.teams);
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
      ip: ['', Validators.required],
      host: ['', Validators.required],
      ngxos: [null, Validators.required],
      ram: [0, [Validators.min(0), Validators.max(200)]],
      group: [''],
      owner: [''],
      ngxteam: [null, teamValidation],
    });

    if (typeof history.state.ip != 'undefined') {
      this.registerForm = this.formBuilder.group({
        ip: [history.state.ip, Validators.required],
        host: [history.state.hostname, Validators.required],
        ngxos: [
          history.state.os + ' ' + history.state.ver,
          Validators.required,
        ],
        ram: [history.state.ram, [Validators.min(0), Validators.max(200)]],
        group: [history.state.group],
        owner: [history.state.vm_owner_lab],
        ngxteam: [history.state.team, Validators.required],
      });
    } else {
      this._spinner.setSpinnerState(true);
      this.vms
        .getVms()
        .then((res: any[]) => {
          this.vmList = res;
          this.getData(this.vmList);
          this._spinner.setSpinnerState(false);
        })
        .catch((err: any) => {
          this._spinner.setSpinnerState(false);
          //console.log('error occurred ', err);
        });
      this._spinner.setSpinnerState(false);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  getData(list: any) {
    //console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a virtual machine',
        label: 'VM IP',
        placeholder: 'Select VM',
        list: list,
        bindLabel: 'ip',
        bindValue: 'ip',
        closeCallback: () => {
          this.router.navigate(['/portal/home/vmm/dash']);
        },
      },
      (res: any) => {
        //console.log('data from close:', res);
        res = res.dataCtrl;
        this.registerForm = this.formBuilder.group({
          ip: [res.ip, Validators.required],
          host: [res.hostname, Validators.required],
          ngxos: [res.os + ' ' + res.ver, Validators.required],
          ram: [res.ram, [Validators.min(0), Validators.max(200)]],
          group: [res.group],
          owner: [res.vm_owner_lab],
          ngxteam: [res.team, Validators.required],
        });
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
      'api/vm/updateVM',
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
          this.toastService.showSuccess('VM updated successfully!',5000);
          this.router.navigate(['/portal/home/vmm/dash']);
          }else{
          this.openDialog(
            {
              type: 'message',
              message: 'VM updated successfully!',
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
