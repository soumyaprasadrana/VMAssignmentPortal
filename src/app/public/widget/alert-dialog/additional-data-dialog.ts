import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgSelectConfig } from '@ng-select/ng-select';
import { SpinnerService } from '../../services/spinner-service';
import { VmsService } from '../../services/vms.service';
import { MustMatch } from '../utils/must-match.validator';

export interface DialogData {
  type?: string;
  iconClass?: string;
  message?: string;
  label?: string;
  list?: any;
  title?: string;
  placeholder?: string;
  bindLabel?: string;
  ip: string;
}
@Component({
  selector: 'app-additional-data-dialog',
  templateUrl: './additional-data-dialog.html',
  styleUrls: ['./additional-data-dialog.scss'],
})
export class AdditionalDataDialogComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  dataLoaded = false;
  norecordFound = false;
  editMode = false;
  public dataCtrl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AdditionalDataDialogComponent>,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig,
    private vms: VmsService,
    private _spinner: SpinnerService
  ) {
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    this._spinner.setSpinnerState(true);
    this.vms
      .getVMAdditionalData(this.data.ip)
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        res = JSON.parse(res);
        console.log('VM Additional Data Res-', res);
        if (res.status == 'FAILED' && res.message == 'No record found!') {
          console.log(true);
          this.norecordFound = true;
        } else if (res.status == 'SUCCESS') {
          this.dataLoaded = true;
          this.norecordFound = false;
          var temp = this.parseRes(res.vmextra_data);
          this.registerForm = this.formBuilder.group(
            this.parseFormControls(temp, false)
          );
          this.data.list = temp;
        }
      })
      .catch((error: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('failed', error);
      });
  }
  parseRes(res: any) {
    var temp = [];
    for (var key in res) {
      temp.push({ name: key, fieldValue: res[key] });
    }
    return temp;
  }
  get f() {
    return this.registerForm.controls;
  }
  deleteField(index: number) {
    var temp = this.parseFormValues(this.registerForm.value);
    temp = this.RemoveElementFromArray(temp, index);
    //console.log('index', index);
    //console.log('temp', temp);
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(temp, true)
    );
    this.data.list = temp;
    //console.log('deleteField');
  }
  RemoveElementFromArray(arrayElements: [], rindex: number) {
    arrayElements.forEach((value, index) => {
      if (index == rindex) {
        arrayElements.splice(index, 1);
      }
    });
    return arrayElements;
  }
  addField() {
    var temp = this.parseFormValues(this.registerForm.value);
    temp.push({ name: 'newField', fieldValue: '' });
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(temp, true)
    );
    this.data.list = temp;
    //console.log('addField');
  }
  toggleToUpdateScreen() {
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(this.data.list, true)
    );
    this.editMode = true;
    //console.log('toggleToUpdateScreen');
  }
  onSubmit() {
    this._spinner.setSpinnerState(true);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this._spinner.setSpinnerState(false);
      return;
    }
    //console.log(this.parseFormValues(this.registerForm.value));
    this.vms
      .updateVMAdditionaalData(
        this.data.ip,
        this.parseFormValues(this.registerForm.value)
      )
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        res = JSON.parse(res);

        this.dialogRef.close(res);
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        this.dialogRef.close(err);
      });
  }
  parseFormValues(formValues: any) {
    var keys = Object.keys(formValues);
    var length = keys.length;
    var temp: any = [];
    for (var i = 0; i < length / 2; i++) {
      temp.push({
        name: formValues['field_' + i],
        fieldValue: formValues['field_' + i + '_value'],
      });
    }

    return temp;
  }
  checkIsInvalid(ctrlName: string | number) {
    return this.registerForm.controls[ctrlName].errors ? true : false;
  }
  checkIsInvalidRequired(ctrlName: string | number) {
    if (this.registerForm.controls[ctrlName].errors) {
      var temp: any = this.registerForm.controls[ctrlName].errors || '';
      return temp.required ? true : false;
    }
    return false;
  }
  checkIsInvalidLength(ctrlName: string | number) {
    if (this.registerForm.controls[ctrlName].errors) {
      var temp: any = this.registerForm.controls[ctrlName].errors || '';
      return temp.maxlength ? true : false;
    }
    return false;
  }
  getFormCotrolData(ctrlName: string | number) {
    return this.registerForm.controls[ctrlName].value;
  }
  parseFormControls(
    list: Array<{ name: string; fieldValue: string }>,
    editMode: boolean
  ) {
    var formControls: any = {};
    if (editMode) {
      for (var i = 0; i < list.length; i++) {
        formControls['field_' + i] = [
          list[i].name,
          [Validators.required, Validators.maxLength(30)],
        ];
        formControls['field_' + i + '_value'] = [
          list[i].fieldValue,
          Validators.required,
        ];
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        formControls[list[i].name] = [list[i].fieldValue, Validators.required];
      }
    }
    //console.log(formControls);
    return formControls;
  }
  toggleNoRecordScreen() {
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(
        [
          { name: 'MemoryGB', fieldValue: '' },
          { name: 'CpuNum', fieldValue: '' },
        ],
        true
      )
    );
    this.data.list = [
      { name: 'MemoryGB', fieldValue: '' },
      { name: 'CpuNum', fieldValue: '' },
    ];
    this.dataLoaded = true;
    this.norecordFound = false;
    this.editMode = true;
  }
}
