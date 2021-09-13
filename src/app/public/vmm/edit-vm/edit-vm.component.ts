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
  constructor(
    private formBuilder: FormBuilder,
    private tms: TeamService,
    private oss: OSService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router,
    private vms: VmsService,
    private activateRoute: ActivatedRoute
  ) {
    tms
      .getTeams()
      .then((res) => {
        this.teams = res;
        console.log('Teams', this.teams);
      })
      .catch((error) => {
        console.log(error);
      });
    oss
      .getOsList()
      .then((res) => {
        this.osList = res;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  public ngxteam = new FormControl();
  public ngxos = new FormControl();
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      ip: ['', Validators.required],
      host: ['', Validators.required],
      ngxos: [null, Validators.required],
      ram: [0, [Validators.min(0), Validators.max(200)]],
      group: [''],
      owner: [''],
      ngxteam: [null, Validators.required],
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
        owner: [history.state.group],
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
          console.log('error occurred ', err);
        });
      this._spinner.setSpinnerState(false);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  getData(list: any) {
    console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a virtual machine',
        label: 'VM IP',
        placeholder: 'Select VM',
        list: list,
        bindLabel: 'ip',
      },
      (res: any) => {
        console.log('data from close:', res);
        res = res.dataCtrl;
        this.registerForm = this.formBuilder.group({
          ip: [res.ip, Validators.required],
          host: [res.hostname, Validators.required],
          ngxos: [res.os + ' ' + res.ver, Validators.required],
          ram: [res.ram, [Validators.min(0), Validators.max(200)]],
          group: [res.group],
          owner: [res.group],
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
        console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'Success') {
          this.openDialog(
            {
              type: 'message',
              message: 'VM updated successfully!',
            },
            () => {
              this.router.navigate(['/portal/home/vmm/dash']);
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
        console.log(res);
        if (typeof callback == 'function' && res != '' && res != null) {
          callback(res);
        }
      });
  }
}
