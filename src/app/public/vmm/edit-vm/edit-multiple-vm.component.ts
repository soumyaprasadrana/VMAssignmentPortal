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
import { Location } from '@angular/common';
import { AuthserviceService } from '../../services/authservice.service';
@Component({
  selector: 'app-edit-multiple-vm',
  templateUrl: './edit-multiple-vm.component.html',
  styleUrls: ['../add-vm/add-vm.component.scss'],
})
export class EditMultipleVmComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  selectedTeam!: string;
  selectedOS!: string;
  osList: any = [];
  teams: any = [];
  vmList: any = [];
  title: string = ' Edit Virtual Machine';
  ipList: any = [];
  loggedUser: any;
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
    private location: Location,
    private _auth: AuthserviceService
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
      host: [''],
      ngxos: [null],
      ram: [0, [Validators.min(0), Validators.max(200)]],
      group: [''],
      owner: [''],
      ngxteam: [null],
    });

    if (typeof history.state.ipList != 'undefined') {
      this.ipList = history.state.ipList;
      this.registerForm = this.formBuilder.group({
        ip: [this.getIPList(this.ipList)],
        ngxos: [null],
        ram: [0, [Validators.min(0), Validators.max(200)]],
        group: [''],
        owner: [''],
        ngxteam: [null],
      });
      this.openDialog(
        {
          type: 'message',
          message:
            'Please add values to fields you really want to update for all selected vms.<br>Note: Blank fields will not be considerd for update.',
        },
        null
      );
    } else {
      this.openDialog(
        {
          type: 'alert',
          message: 'Selected IP List not found!',
        },
        (res: any) => {
          this.location.back();
        }
      );
    }
  }

  getIPList(list: any) {
    //console.log(list);
    var res: string = '';
    for (var item in list) {
      res += list[item];
      if (list[item] != list[list.length - 1]) res += ',';
    }
    return res;
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  parseIPList(ipList: string) {
    return ipList.split(',');
  }
  onSubmit() {
    this.submitted = true;
    this._spinner.setSpinnerState(true);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this._spinner.setSpinnerState(false);
      return;
    }
    var fields: any = {};
    var reqData: any = {};
    for (var index in this.registerForm.value) {
      if (
        this.registerForm.value[index] != '' &&
        this.registerForm.value[index] != null
      ) {
        fields[index] = this.registerForm.value[index];
      }
    }
    reqData['ipList'] = this.ipList;
    reqData['fields'] = fields;
    //console.log(reqData);

    // display form values on success
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var _promise = this._client.post(
      'api/vm/updateMultipleVMS',
      reqData,
      httpOptions
    );
    _promise
      .then((res: any) => {
        //console.log('Update Result: ', res);

        res = JSON.parse(res);
        var refreshRequired: boolean = false;
        if (res.resultList) {
          var html = '<h3>Result </h3>';
          html +=
            '<table class="table table-striped dataTable ">' +
            '<th>IP</th>' +
            '<th>Status</th>' +
            '<th>Message</th>';
          for (var i = 0; i < res.resultList.length; i++) {
            var item: any = res.resultList[i];
            html += '<tr>';
            html += '<td>';
            html += item.ip;
            html += '</td>';

            html += '<td>';
            html += '<div>';
            if (item.status == 'Success') {
              refreshRequired = true;
              html +=
                '<span ><i class="fa fa-check-circle text-success"></i></span>';
            } else {
              html +=
                '<span ><i class="fa fa-times-circle text-danger"></i></span>';
            }
            html += '<span>';

            html += '</span>';
            html += '</td>';

            html += '<td>';
            if (typeof item.message != 'undefined') html += item.message;
            html += '</td>';

            html += '</tr>';
          }
          html += '</table>';
          if (refreshRequired) {
            this.openDialog(
              {
                type: 'message',
                message: html,
              },
              (res: any) => {
                this.vms.setNeedRefresh(true);
                this.router.navigate(['/portal/home/vmm/dash']);
              }
            );
          } else {
            this.openDialog(
              {
                type: 'message',
                message: html,
              },
              null
            );
          }
        } else {
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
        }
        this._spinner.setSpinnerState(false);
      })
      .catch((err: any) => {
        //console.log('err', err);
        this._spinner.setSpinnerState(false);
        this.openDialog(
          {
            type: 'alert',
            message: err.error.message,
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
