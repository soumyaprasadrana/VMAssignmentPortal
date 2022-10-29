// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Input Dialog for creating new Snapshot Component
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

export interface DialogData {
  type?: string;
  iconClass?: string;
  message?: string;
  label?: string;
  list?: [];
  title?: string;
  placeholder?: string;
  bindLabel?: string;
  bindValue?:string;
  isText?: boolean;
  titleIcon?: boolean;
  defaultValue?: string;
  closeCallback?: any;
}
@Component({
  selector: 'app-takesnap-input-dialog',
  templateUrl: './takesnap-dialog.component.html',
  styleUrls: ['./takesnap-dialog.component.scss'],
})
export class TakeSnapInputDialogComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  public dataCtrl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<TakeSnapInputDialogComponent>,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig
  ) {
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    var defaultV = null;
    if (this.data.defaultValue) defaultV = this.data.defaultValue;
    this.registerForm = this.formBuilder.group({
      snapName: [null, Validators.required],
      snapDesc: [null]
    });
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
    this.dialogRef.close(this.registerForm.value);
  }
  onClose() {
    this.dialogRef.close();
    if (
      this.data.closeCallback &&
      typeof this.data.closeCallback == 'function'
    ) {
      this.data.closeCallback();
    }
  }
}
