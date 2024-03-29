// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Http Interceptor
 */
import { Observable, of, throwError } from "rxjs";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { SpinnerService } from "./spinner-service";
import { filter } from "rxjs/operators";
import { MATH_PIPES } from "ngx-pipes";
import { MatDialog } from "@angular/material/dialog";
import { AlertDialogComponent } from "../widget/alert-dialog/alert-dialog.component";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  previousUrl: string = "";
  currentUrl: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 0 && !err.ok && err.error.type.toString() != "abort") {
      console.log("<HTTP Interceptor> Error", err);
      this.openDialog(
        {
          type: "alert",
          message:
            "Error occurred:" + /Http failure response/.test(err.message)
              ? "Network Error!"
              : err.message,
        },
        () => {
          if (/Http failure response/.test(err.message)) {
            window.location.reload();
          }
        }
      );
    }
    if (err.status === 401 || err.status === 403) {
      if (!this.currentUrl.includes("login")) {
        //navigate /delete cookies or whatever
        this.router
          .navigate([ `/portal/login` ], {
            state: {
              requestedFor:
                this.previousUrl != "" ? this.previousUrl : this.currentUrl,
            },
          })
          .then(() => {
            var parent = this.route.parent;
            console.log(
              "Unauthorized Request found from :",
              this.previousUrl != "" ? this.previousUrl : this.currentUrl,
              " Navigated to:",
              this.currentUrl
            );
            //We need to reload the page after signout
            if (
              this.previousUrl != "" &&
              this.currentUrl != "" &&
              this.previousUrl != this.currentUrl &&
              this.currentUrl != "/portal/login"
            ) {
              window.location.reload();
            }
          });
      }
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of({ message: err.message }); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.

    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next.handle(req).pipe(catchError((x) => this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
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
          callback();
        }
      });
  }
}
