// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Input Dialog Component
 */
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

export interface DialogData {
  iconClass?: string;
  message?: string;
  title?: string;
  titleIcon?: boolean;
  closeCallback?: any;
}
@Component({
  selector: "app-yorn-dialog",
  templateUrl: "./yorn-dialog.component.html",
  styleUrls: [ "./yorn-dialog.component.scss" ],
})
export class YornDialogComponent implements OnInit {
  submitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<YornDialogComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit(value: boolean) {
    this.submitted = true;

    this.dialogRef.close(value);
  }
  onClose() {
    this.dialogRef.close(false);
    if (
      this.data.closeCallback &&
      typeof this.data.closeCallback == "function"
    ) {
      this.data.closeCallback();
    }
  }
}
