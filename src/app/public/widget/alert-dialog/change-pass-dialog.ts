// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-11-24 18:06:39
 * @desc Change Password Dialog
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
import { MustMatch } from '../utils/must-match.validator';

export interface DialogData {
  type?: string;
  iconClass?: string;
  message?: string;
  label?: string;
  list?: [];
  title?: string;
  placeholder?: string;
  bindLabel?: string;
}
@Component({
  selector: 'app-change-pass-dialog',
  templateUrl: './change-pass-dialog.html',
  styleUrls: ['./change-pass-dialog.scss'],
})
export class PassChangeDialogComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  public dataCtrl = new FormControl();
  showPass:boolean=false;
  showPassword:boolean=false;
  showCurrPass:boolean=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<PassChangeDialogComponent>,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig
  ) {
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        user_curr_pass:['',[Validators.required]],
        user_pass: ['', [Validators.required, Validators.minLength(6)]],
        conf_pass: ['', Validators.required],
      },
      {
        validator: MustMatch('user_pass', 'conf_pass'),
      }
    );
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
}
