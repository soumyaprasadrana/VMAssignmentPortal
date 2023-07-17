// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Objects Home Component
 */
import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthserviceService } from "../../services/authservice.service";
import { DynamicObjectsService } from "../../services/dynamicobjects.service";
import { NodeclientService } from "../../services/nodeclient.service";
import { SpinnerService } from "../../services/spinner-service";
import { AlertDialogComponent } from "../../widget/alert-dialog/alert-dialog.component";
import { ToastService } from "../../widget/toast/toast-service";

@Component({
  selector: "app-dynamicobjects-home",
  templateUrl: "./dynamicobjects-home.component.html",
  styleUrls: [ "./dynamicobjects-home.component.scss" ],
})
export class DynamicobjectsHomeComponent implements OnInit {
  cardsMetaData: any;
  isLoaded: boolean = false;
  loggedUser: any;
  redirectToUserdefinedFunctions: any = {};
  searchTerm: string = "";
  constructor(
    private dos: DynamicObjectsService,
    private spinner: SpinnerService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private _auth: AuthserviceService,
    private _client: NodeclientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.spinner.setSpinnerState(true);
    this.loggedUser = _auth.getUser();
    var promise = this.dos.getDynamicObjects();
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    var httpOptions = {
      headers: headers,
    };
    this._client
      .get("api/config/redirectToUserdefinedFunctions", httpOptions)
      .then((res: any) => {
        if (res.redirectToUserdefinedFunctions) {
          this.redirectToUserdefinedFunctions =
            res.redirectToUserdefinedFunctions;
        }
        promise
          .then((res: any) => {
            this.spinner.setSpinnerState(false);
            // console.log('inside promise.then -< setting dynamicobjectsDataSet', res);
            this.cardsMetaData = this.parseData(res);
            //console.log(this.cardsMetaData);
            if (this.cardsMetaData.length == 0) {
              if (this.loggedUser.useToast) {
                this.toastService.showDanger("No applications found.", 5000);
                this.router.navigate([ "../../tools/dash" ], {
                  relativeTo: this.route,
                });
              } else {
                this.openDialog(
                  {
                    type: "alert",
                    message: "No applications found.",
                  },
                  () => {
                    this.router.navigate([ "../../tools/dash" ], {
                      relativeTo: this.route,
                    });
                  }
                );
              }
            }
            this.isLoaded = true;
            this.spinner.setSpinnerState(false);
          })
          .catch((err: any) => {
            this.spinner.setSpinnerState(false);
            //console.log('error occurred ', err);
            this.isLoaded = false;
          });
      })
      .catch((err) => {
        console.log(
          "Error Occurred while fetching user defined functions!",
          err
        );
      });
  }

  ngOnInit(): void {}
  parseData(res: any) {
    var cardMetaData = [];
    for (var key in res) {
      //console.log("res[key]", res[key]);
      if (res[key].status) {
        let routeLink = "../../dynamicapps/app/" + res[key].name;
        if (
          this.redirectToUserdefinedFunctions &&
          this.redirectToUserdefinedFunctions[res[key].name]
        )
          routeLink =
            routeLink +
            "/function/" +
            this.redirectToUserdefinedFunctions[res[key].name];
        if (res[key].enableform) {
          //console.log("Form submission enabled for res[key]", res[key]);
          cardMetaData.push({
            cardRouterState: { enableform: res[key].enableform },
            cardTitle: res[key].description,
            cardIconClass: "fa fa-folder-o",
            cardRouterLink: [ routeLink ],
          });
        } else {
          cardMetaData.push({
            cardTitle: res[key].description,
            cardIconClass: "fa fa-folder-o",
            cardRouterLink: [ routeLink ],
          });
        }
      }
    }
    return cardMetaData;
  }
  openDialog(data: any, callback: any) {
    this.dialog
      .open(AlertDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        if (typeof callback == "function") {
          callback(res);
        }
      });
  }
}
