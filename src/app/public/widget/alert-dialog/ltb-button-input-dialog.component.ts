// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc SSH Tools Input Dialog
 */
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

export interface DialogData2 {
  type?: string;
  iconClass?: string;
  message?: string;
  label?: string;
  list?: [];
  formCtrl?: any;
  title?: string;
  placeholder?: string;
  bindLabel?: string;
  commandQuerryParser?: boolean;
  queryFields?: [];
}
@Component({
  selector: 'ltb-button-app-input-dialog',
  templateUrl: './ltb-button-input-dialog.component.html',
  styleUrls: ['./ltb-button-input-dialog.component.scss'],
})
export class LTBButtonInputDialogComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  public dataCtrl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData2,
    private dialogRef: MatDialogRef<LTBButtonInputDialogComponent>,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig
  ) {
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(this.data.formCtrl);
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.data.commandQuerryParser) {
      //console.log('this.data.commandQuerryParser true');
      for (var item in this.data.queryFields) {
        var n: number = item as unknown as number;
        //console.log('item in queryField', this.data.queryFields[n]);
        var temp = this.registerForm.controls['command'].value;
        //console.log('Command value', temp);
        this.registerForm.controls['command'].setValue(
          temp.replaceAll(
            '{' + this.data.queryFields[n] + '}',
            this.registerForm.controls[this.data.queryFields[n]].value
          )
        );
      }
    }
    //console.log(
    //   'Final Command value',
    //   this.registerForm.controls['command'].value
    //  );

    this.dialogRef.close(this.registerForm.value);
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
}
