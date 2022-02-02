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
  isText?: boolean;
  titleIcon?: boolean;
  defaultValue?: string;
  closeCallback?: any;
}
@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
})
export class InputDialogComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  public dataCtrl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<InputDialogComponent>,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig
  ) {
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    var defaultV = null;
    if (this.data.defaultValue) defaultV = this.data.defaultValue;
    this.registerForm = this.formBuilder.group({
      dataCtrl: [defaultV, Validators.required],
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
