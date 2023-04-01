// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Object App View Record Component
 */
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MustMatch } from "../../widget/utils/must-match.validator";
import { CustomValidator } from "../../widget/utils/no-white-space-validator";
import { NodeclientService } from "../../services/nodeclient.service";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from "../../widget/alert-dialog/alert-dialog.component";
import { SpinnerService } from "../../services/spinner-service";
import { ActivatedRoute, Router } from "@angular/router";
import { TeamService } from "../../services/teams.service";
import { AuthserviceService } from "../../services/authservice.service";
import { ToastService } from "../../widget/toast/toast-service";
import { DynamicObjectAppService } from "../../services/dynamicobjectapp.service";
import { CommonService } from "../../services/common.service";
import { UserService } from "../../services/users.service";
import { DomSanitizer } from "@angular/platform-browser";
import { UserDefinedFunctionsService } from "../../services/userdefinedfunctions.service";
import { InputDialogComponent } from "../../widget/alert-dialog/input-dialog.component";
@Component({
  selector: "app-dynamicobjectapp-user-defined-function-page",
  templateUrl: "./dynamicobjectapp-user-defined-function-page.component.html",
  styleUrls: [ "./dynamicobjectapp-user-defined-function-page.component.scss" ],
})
export class DynamicObjectAppUserDefinedFunctionPageComponent
  implements OnInit, OnDestroy {
  fun: string = "";
  app: string = "";
  funContext: any;
  funTemplate: any;
  parentObject: any;
  grid: any;
  row: any;
  loaded: boolean = false;
  constructor(
    private _funService: UserDefinedFunctionsService,
    private route: ActivatedRoute,
    private router: Router,
    private _client: NodeclientService,
    private spinner: SpinnerService,
    private dynamicobjectappServie: DynamicObjectAppService,
    private dialog: MatDialog
  ) {
    this.fun = route.snapshot.params.fun;
    this.app = route.snapshot.params.app;
    if (history.state.row) {
      console.log("ACTION FROM ROW ::", history.state.row);
      this.row = history.state.row;
    }
    //Handle Page Refresh
    _funService.setApp(this.app);
    if (!_funService.checkIfInitialized()) {
      this.initializeFunService();
    } else {
      if (typeof history.state.reload != "undefined") {
        this.initializeFunService();
      } else {
        this.doInit();
      }
    }
  }
  ngOnDestroy(): void {
    // Try to remove all attached resources from custom function
    {
      /*if (
        this.funContext.applicationType &&
        this.funContext.applicationType == "angularjs"
      )
        //location.reload();
        */
    }
  }
  initializeFunService() {
    //Load Functions Metadata
    this.spinner.setSpinnerState(true);
    var funPromise = this.dynamicobjectappServie.getDynamicObjectAppFunctions(
      this.app
    );
    funPromise
      .then((res: any) => {
        res = JSON.parse(res);
        console.log("===== DEBUG0 ======", res);
        if (res.status) {
          var funList = res.data;
          var foundRequestedFunction = false;
          var userDefinedFunList = [];
          for (var item in funList) {
            console.log("===== DEBUG0 ======", funList[item]);
            if (
              funList[item].isUserDefined.value &&
              funList[item].type.value == this.fun
            ) {
              foundRequestedFunction = true;
              userDefinedFunList.push(funList[item]);
            }
          }
          if (foundRequestedFunction) {
            this._funService.reset();
            this._funService.setApp(this.app);
            this._funService.setParent(this);
            this._funService.init(userDefinedFunList, this).then((res) => {
              var promiseR = this.dynamicobjectappServie.getDynamicObjectAppRecords(
                this.app
              );
              promiseR
                .then((res: any) => {
                  res = JSON.parse(res);
                  //console.log(res);
                  if (res.status) {
                    this._funService.setGrid(res.data);
                    this.doInit();
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
                  this.spinner.setSpinnerState(false);
                  this.openDialog(
                    {
                      type: "alert",
                      message: "Unable to load request resource.",
                    },
                    () => {
                      this.router.navigate([ "../.." ], {
                        relativeTo: this.route,
                      });
                    }
                  );
                });
            });
            console.log("=============== FUNSERVICE AFTER INIT =============");
          } else {
            this.spinner.setSpinnerState(false);
            this.openDialog(
              {
                type: "alert",
                message: "Unable to load request resource.",
              },
              () => {
                this.router.navigate([ "../.." ], { relativeTo: this.route });
              }
            );
          }
        } else {
          this.spinner.setSpinnerState(false);
          this.openDialog(
            {
              type: "alert",
              message: res.message,
            },
            () => {
              this.router.navigate([ "../.." ], { relativeTo: this.route });
            }
          );
        }
      })
      .catch((err: any) => {
        console.log("error occurred ", err);
        this.spinner.setSpinnerState(false);
        this.openDialog(
          {
            type: "alert",
            message: err.message,
          },
          () => {
            this.router.navigate([ "../.." ], { relativeTo: this.route });
          }
        );
      });
  }
  doInit() {
    this.spinner.setSpinnerState(true);
    console.log("++++++++++++ DO INIT +++++++++++++++");
    const fun = this._funService.getFunction(this.fun);
    console.log("++++++++++++ DO INIT +++++++++++++++", fun);
    this.parentObject = this._funService.getParentObject();
    this.grid = this._funService.getGrid();
    this.row = this._funService.getRow();
    this.funContext = fun(
      this.parentObject,
      this.grid,
      this.row,
      this._funService.getUtils()
    );
    console.log("RESULT FROM CLIENTSCRIPT", this.funContext);

    //Set utils to global object; If it's an angular js application user might use angularIntegrator module to use ANgular2 components
    window.utils = this._funService.getUtils();

    this.funTemplate = this._funService.getFunctionTemalate(this.fun);
    console.log("CLIENTTEMPLATE ", this.funTemplate);
    if (
      typeof this.funContext.applicationType != "undefined" &&
      this.funContext.applicationType == "angularjs"
    ) {
      console.log(
        "ANGULRJS :: DEBUG :: FUNCTION TYPE IS ANGULAR JS GOING TO LOAD ANGULAR JS OTHER DEPENDACY LIBRARIRES"
      );
      this.loadAngularJsLibrary(this.funContext)
        .then((res: any) => {
          this.loadAngularJsDependancyLibraries(this.funContext)
            .then((res: any) => {
              this.spinner.setSpinnerState(false);
              this.loaded = true;
            })
            .catch((e) => {
              this.spinner.setSpinnerState(false);
              console.log(
                "ANGULRJS :: DEBUG :: FUNCTION TYPE IS ANGULAR JS GOING TO LOAD ANGULAR JS OTHER DEPENDACY LIBRARIRES :: ERROR",
                e
              );
            });
        })
        .catch((e) => {
          this.spinner.setSpinnerState(false);
          console.log(
            "ANGULRJS :: DEBUG :: FUNCTION TYPE IS ANGULAR JS GOING TO LOAD ANGULAR JS OTHER DEPENDACY LIBRARIRES :: ERROR",
            e
          );
        });
    } else {
      this.spinner.setSpinnerState(false);
      this.loaded = true;
    }
  }

  ngOnInit(): void {}
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
      .then((res) => {
        //console.log(res);
        if (typeof callback == "function" && res != "" && res != null) {
          callback(res);
        }
      });
  }

  async loadAngularJsLibrary(context: any) {
    function addScript(src: any) {
      return new Promise((resolve, reject) => {
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsLibrary :: addScript :: src :: ",
          src
        );
        try {
          const s = document.createElement("script");
          s.setAttribute("id", "customFunResource");
          s.setAttribute("src", src);
          s.addEventListener("load", resolve);
          s.addEventListener("error", reject);

          document.body.appendChild(s);
        } catch (e) {
          console.log(
            "ANGULRJS :: DEBUG :: loadAngularJsLibrary :: addScript :: err :: "
          );
          console.log(e);
        }
      });
    }
    function addCSS(src: any) {
      return new Promise((resolve, reject) => {
        try {
          console.log(
            "ANGULRJS :: DEBUG :: loadAngularJsLibrary :: addCSS :: src :: ",
            src
          );
          const s = document.createElement("link");
          s.setAttribute("id", "customFunResource");
          s.setAttribute("rel", "stylesheet");
          s.setAttribute("href", src);
          s.addEventListener("load", resolve);
          s.addEventListener("error", reject);

          document.body.appendChild(s);
        } catch (e) {
          console.log(
            "ANGULRJS :: DEBUG :: loadAngularJsLibrary :: addCSS :: err :: ",
            e
          );
        }
      });
    }
    var js: any = [ "/assets/js/hybrid.app.routing.service.js" ];

    console.log("ANGULRJS :: DEBUG :: loadAngularJsLibrary :: js ::  ", js);
    for (var i = 0; i < js.length; i++) {
      try {
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsLibrary :: js :: js[" + i + "] ::",
          js[i]
        );
        var tempArr = js[i].split(".");
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsLibrary :: js :: js[" +
            i +
            "] :: split",
          tempArr
        );
        if (tempArr[tempArr.length - 1] == "js") await addScript(js[i]);
        else if (tempArr[tempArr.length - 1] == "css") await addCSS(js[i]);
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsLibrary :: js :: js[" +
            i +
            "] :: loaded",
          js[i]
        );
        // do something after it was loaded
      } catch (e) {
        console.log(e);
      }
    }
  }

  async loadAngularJsDependancyLibraries(context: any) {
    function addScript(src: any) {
      return new Promise((resolve, reject) => {
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: addScript :: src :: ",
          src
        );
        try {
          const s = document.createElement("script");
          s.setAttribute("id", "customFunResource");
          s.setAttribute("src", src);
          s.addEventListener("load", resolve);
          s.addEventListener("error", reject);

          document.body.appendChild(s);
        } catch (e) {
          console.log(
            "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: addScript :: err :: "
          );
          console.log(e);
        }
      });
    }
    function addCSS(src: any) {
      return new Promise((resolve, reject) => {
        try {
          console.log(
            "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: addCSS :: src :: ",
            src
          );
          const s = document.createElement("link");
          s.setAttribute("id", "customFunResource");
          s.setAttribute("rel", "stylesheet");
          s.setAttribute("href", src);
          s.addEventListener("load", resolve);
          s.addEventListener("error", reject);

          document.body.appendChild(s);
        } catch (e) {
          console.log(
            "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: addCSS :: err :: ",
            e
          );
        }
      });
    }
    var js: any = [];
    if (
      typeof context.angularJSDependacies != "undefined" &&
      context.angularJSDependacies
    )
      js = [ ...context.angularJSDependacies ];
    console.log(
      "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: js ::  ",
      js
    );
    for (var i = 0; i < js.length; i++) {
      try {
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: js :: js[" +
            i +
            "] ::",
          js[i]
        );
        var tempArr = js[i].split(".");
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: js :: js[" +
            i +
            "] :: split",
          tempArr
        );
        if (tempArr[tempArr.length - 1] == "js") await addScript(js[i]);
        else if (tempArr[tempArr.length - 1] == "css") await addCSS(js[i]);
        console.log(
          "ANGULRJS :: DEBUG :: loadAngularJsDependancyLibraries :: js :: js[" +
            i +
            "] :: loaded",
          js[i]
        );
        // do something after it was loaded
      } catch (e) {
        console.log(e);
      }
    }
  }
}
