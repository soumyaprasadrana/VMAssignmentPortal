// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Alert Dialog Component
 */
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  _funService?: any;
  _fun?: string;
  row: any;
  message?: string;
}
@Component({
  selector: "app-userdefinedfunction-dialog",
  templateUrl: "./userdefinedfunction-dialog.component.html",
  styleUrls: [ "./userdefinedfunction-dialog.component.scss" ],
})
export class UserDefinedFunctionDialogComponent implements OnInit {
  loaded: boolean = false;
  type: string = "message";
  parentObject: any;
  grid: any;
  row: any;
  funContext: any;
  funTemplate: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (!data._funService.checkIfInitialized()) {
      data.message =
        "Error occured! Custom Function Service failed to start check console log for more details";
      this.type = "alert";
    } else {
      this.doInit();
      this.loaded = true;
    }
  }
  doInit() {
    console.log("++++++++++++ DO INIT +++++++++++++++");
    const fun = this.data._funService.getFunction(this.data._fun);
    console.log("++++++++++++ DO INIT +++++++++++++++", fun);
    this.parentObject = this.data._funService.getParentObject();
    this.grid = this.data._funService.getGrid();
    if (this.data.row == null) this.data.row = this.data._funService.getRow();
    this.funContext = fun(
      this.parentObject,
      this.grid,
      this.row,
      this.data._funService.getUtils()
    );
    console.log("RESULT FROM CLIENTSCRIPT", this.funContext);
    this.funTemplate = this.data._funService.getFunctionTemalate(
      this.data._fun
    );
    console.log("CLIENTTEMPLATE ", this.funTemplate);
  }

  ngOnInit(): void {}
}
