// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Common Service
 */
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertDialogComponent } from "../widget/alert-dialog/alert-dialog.component";
import { InputDialogComponent } from "../widget/alert-dialog/input-dialog.component";
import { ToastService } from "../widget/toast/toast-service";
import { AuthserviceService } from "./authservice.service";
import { DynamicObjectAppService } from "./dynamicobjectapp.service";
import { NodeclientService } from "./nodeclient.service";
import { ShellService } from "./shell-service";
import { SpinnerService } from "./spinner-service";
const CLASS = "UserDefinedFunctionsService";
@Injectable({
  providedIn: "root",
})
export class UserDefinedFunctionsService {
  //Containers required to initiate and store user defined functions
  userDefinedFunctionsList: any[] = [];
  userDefinedFunctionsLoadStatus: any = {};
  userDefinedFunctions: any = {};
  userDefinedFunctionsTemplate: any = {};
  grid: any;
  row: any;
  parentObject: any;
  functionMetadata: any = {};
  _nodeclient: any;
  isLoaded: boolean = false;
  app: any;
  needReload: boolean = false;
  parent: any;
  constructor(
    public _client: NodeclientService,
    public _toastService: ToastService,
    public _spinner: SpinnerService,
    public _auth: AuthserviceService,
    public _http: HttpClient,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public router: Router,
    public _shell: ShellService,
    public dynamicobjectappServie: DynamicObjectAppService
  ) {
    this._nodeclient = _client;
  }
  setParent(parent: any) {
    console.log("======= SET PARENT ===========", parent);
    this.parent = parent;
  }
  getNodeClient() {
    return this._nodeclient;
  }
  getUtils() {
    return {
      render: (context: any) => {
        try {
          console.log("DEBUG0 render", context);
          console.log("DEBUG0 render :: shell", this._shell.getShell());
          this._shell.getShell().render(context);
        } catch (e) {
          console.log(e);
        }
      },
      getAngularComponent: function(name: any) {
        switch (name) {
          case "mat-button":
            return MatButton;
          case "mat-dialog":
            return MatDialog;
        }
        return null;
      },
      getApplicationService: (name: any) => {
        switch (name) {
          case "toast":
            return this._toastService;
          case "spinner":
            return this._spinner;
          case "auth":
            return this._auth;
          case "dialog":
            return {
              openAlertDialog: this.openDialog.bind(this),
              openInputDialog: this.openDialogInput.bind(this),
            };
          case "nodeclient":
            return this._client;
          case "http":
            return this._http;
          case "shell":
            return this._shell;
        }
        return null;
      },
      getNativeFunction: (name: any) => {
        switch (name) {
          case "add":
            return () => {
              let appRelativeUrl = this.router.url;
              appRelativeUrl = appRelativeUrl.substring(
                0,
                appRelativeUrl.lastIndexOf("/")
              );
              appRelativeUrl = appRelativeUrl.substring(
                0,
                appRelativeUrl.lastIndexOf("/")
              );
              console.log(
                "::::::::::::::::: getCurrentNavigation ::::::::::::::",
                this.router.url
              );
              this.router.navigate([ appRelativeUrl + "/add" ], {});
            };
          case "update":
            return (dataContext: any) => {
              let appRelativeUrl = this.router.url;
              appRelativeUrl = appRelativeUrl.substring(
                0,
                appRelativeUrl.lastIndexOf("/")
              );
              appRelativeUrl = appRelativeUrl.substring(
                0,
                appRelativeUrl.lastIndexOf("/")
              );
              console.log(
                "::::::::::::::::: getCurrentNavigation ::  UPDATE    ::::::::::::::",
                this.router.url,
                dataContext
              );
              this.router.navigate([ appRelativeUrl + "/edit" ], {
                state: { recordData: dataContext },
              });
            };
          case "view":
            return (dataContext: any) => {
              let appRelativeUrl = this.router.url;
              appRelativeUrl = appRelativeUrl.substring(
                0,
                appRelativeUrl.lastIndexOf("/")
              );
              appRelativeUrl = appRelativeUrl.substring(
                0,
                appRelativeUrl.lastIndexOf("/")
              );
              console.log(
                "::::::::::::::::: getCurrentNavigation ::  UPDATE    ::::::::::::::",
                this.router.url,
                dataContext
              );
              this.router.navigate([ appRelativeUrl + "/view" ], {
                state: { recordData: dataContext },
              });
            };
          case "delete":
            return (dataContext: any, callback: any) => {
              this._spinner.setSpinnerState(true);
              this.dynamicobjectappServie
                .deleteDynamicObjectAppRecord(this.app, dataContext)
                .then((res: any) => {
                  res = JSON.parse(res);
                  this._spinner.setSpinnerState(false);
                  if (res.status == "Success") {
                    callback();
                    this.openDialog(
                      {
                        type: "message",
                        message: "Record removed successfully",
                      },
                      null
                    );
                  } else {
                    this.openDialog(
                      {
                        type: "alert",
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
                      type: "alert",
                      message: err.message,
                    },
                    null
                  );
                });
            };
        }

        return null;
      },
    };
  }
  setGrid(grid: any) {
    console.log("_funService setGrid :: entry ", grid);
    this.grid = grid;
  }
  setRow(row: any) {
    this.row = row;
  }
  getGrid() {
    console.log("_funService getGrid :: entry ", this.grid);
    return this.grid;
  }
  getRow() {
    return this.row;
  }
  getParentObject() {
    return this.parentObject;
  }
  getFunctionMetadata(name: any) {
    return this.functionMetadata[name];
  }
  async init(userDefinedFunctionsList: any, parentObject: any) {
    const METHOD = "init";
    this.userDefinedFunctionsList = userDefinedFunctionsList;
    console.log(CLASS + "::" + METHOD + "------------ entry ----------");
    this.parentObject = parentObject;
    for (var index in this.userDefinedFunctionsList) {
      var functionName = this.userDefinedFunctionsList[index].type.value;
      this.functionMetadata[functionName] = this.userDefinedFunctionsList[
        index
      ];
      var funLoaded = false;
      var funLoadedError = null;
      var templateLoaded = false;
      var templateLoadedError = null;
      console.log(
        CLASS + "::" + METHOD + " :: for function :: " + functionName
      );
      try {
        var res: any = await this._client.get(
          "api/dynamicobjects/userDefinedFunctions/" + functionName,
          this.getOptions(this.getHeaders())
        );
        //console.log(
        //  CLASS + "::" + METHOD + " :: Fetch function :: res = ",
        //  res
        // );
        if (res.status) {
          try {
            // var fun = eval(
            //   "var f = function(){ return " + res.function + ";}; f() ;"
            // );
            var fun = new Function("return " + res.function.toString());
            fun = fun();
            //console.log(fun, fun.toString());
            if (typeof fun == "function") {
              funLoaded = true;
              this.userDefinedFunctions[functionName] = fun;
              //fun(this);
            } else {
              funLoadedError = res.message;
            }
          } catch (e) {
            var te: any = e;
            funLoadedError = te.toString();
            console.log(e);
          }
        }
        var res2: any = await this._client.get(
          "api/dynamicobjects/userDefinedFunctions/" +
            functionName +
            "/template",
          this.getOptions(this.getHeaders())
        );
        if (res2.status) {
          // console.log(
          //  CLASS + "::" + METHOD + " :: Fetch function template :: res = ",
          //   res2
          // );
          try {
            //var res = eval(`console.log(ABC${res2.toString()} DEF ${CLASS})`);
            // console.log(
            //   "TESTRES2 = ",
            //res2,
            //      typeof res2.template,
            //    res2.template
            //    );
            //var fun2: any = eval(
            // "(function(){ return " + res2.template.toString() + ";})"
            //);
            var fun2 = new Function("return " + res2.template);
            fun2 = fun2();

            //  console.log(fun2, fun2.toString());
            if (typeof fun2 == "function") {
              templateLoaded = true;
              this.userDefinedFunctionsTemplate[functionName] = fun2;
              //fun(this);
            } else {
              templateLoadedError = res2.message;
            }
          } catch (e) {
            var te: any = e;
            funLoadedError = te.toString();
            console.log(e);
          }
        } else {
          templateLoadedError = res2.message;
        }
        if (funLoaded && templateLoaded) {
          this.userDefinedFunctionsLoadStatus[functionName] = { ready: true };
        } else {
          this.userDefinedFunctionsLoadStatus[functionName] = {
            ready: false,
            funLoaded: funLoaded,
            funLoadedError: funLoadedError,
            templateLoaded: templateLoaded,
            templateLoadedError: templateLoadedError,
          };
        }
        this.isLoaded = true;
        if (this.needReload) {
          this.needReload = false;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
  checkIfInitialized() {
    return this.needReload ? false : this.isLoaded;
  }
  getHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json",
    });
  }
  getOptions(headers: any) {
    return {
      headers: headers,
    };
  }
  getFunctionStatus(name: any) {
    return this.userDefinedFunctionsLoadStatus[name];
  }
  getFunction(name: any) {
    return this.userDefinedFunctions[name];
  }
  getFunctionTemalate(name: any) {
    return this.userDefinedFunctionsTemplate[name];
  }
  reset() {
    this.userDefinedFunctionsList = [];
    this.userDefinedFunctionsLoadStatus = {};
    this.userDefinedFunctions = {};
    this.userDefinedFunctionsTemplate = {};
    this.parentObject = null;
    this.functionMetadata = {};
    this.grid = null;
    this.row = null;
    this.app = null;
    this.parent = null;
  }
  openDialog(data: any, callback: any) {
    this.dialog
      .open(AlertDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",
      })
      .afterClosed()
      .toPromise()
      .then((res: any) => {
        if (typeof callback == "function") {
          callback(res);
        }
      });
  }
  openDialogInput(data: any, callback: any) {
    this.dialog
      .open(InputDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",

        width: "500px",
      })
      .afterClosed()
      .toPromise()
      .then((res: any) => {
        //console.log(res);
        if (typeof callback == "function" && res != "" && res != null) {
          callback(res);
        }
      });
  }
  setApp(app: any) {
    if (this.app != app) this.needReload = true;
    this.app = app;
  }
}
