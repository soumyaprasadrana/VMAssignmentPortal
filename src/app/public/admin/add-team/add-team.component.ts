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
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss'],
})
export class AddTeamComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  title: string = 'Add Team';
  constructor(
    private formBuilder: FormBuilder,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private _spinner: SpinnerService
  ) {}

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
        console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'SUCCESS') {
          this.openDialog({
            type: 'message',
            message: res.message,
          });
        } else {
          this._spinner.setSpinnerState(false);
          this.openDialog({
            type: 'alert',
            message: res.message,
          });
        }
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        this.openDialog({
          type: 'alert',
          message: err.message,
        });
      });
  }
  openDialog(data: any) {
    this.dialog.open(AlertDialogComponent, {
      data: data,
      panelClass: 'app-dialog-class',
    });
  }
}
