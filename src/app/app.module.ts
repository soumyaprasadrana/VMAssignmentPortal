// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Main application module
 */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginFormComponent } from "./public/login/login-form/login-form.component";
import { NavbarComponent } from "./public/widget/navbar/navbar.component";
import { LoginViewComponent } from "./public/login/login-view/login-view.component";
import { PageNotFoundComponent } from "./public/widget/page-not-found/page-not-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterModule } from "./public/widget/footer/footer.module";
import { Config } from "./app.config";
import { AdminConfig } from "./public/admin/admin.config";
import { AuthInterceptor } from "./public/services/customHttp";
import { ActivatedRoute, Router } from "@angular/router";
import { SpinnerService } from "./public/services/spinner-service";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { ToastModule } from "./public/widget/toast/toast.module";
import { DynamicObjectAppFormComponent } from "./public/dynamicobjects/dynamicobjectapp-form/dynamicobjectapp-form.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    LoginViewComponent,
    PageNotFoundComponent,
    DynamicObjectAppFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatToolbarModule,
    FooterModule,
    HttpClientModule,
    ToastModule,
    NgIdleKeepaliveModule.forRoot(), // use NgIdleModule.forRoot() if not using keepalive
    NgSelectModule,
    MatDialogModule,
  ],
  exports: [],
  providers: [
    SpinnerService,
    Config,
    AdminConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function(
        router: Router,
        route: ActivatedRoute,
        dialog: MatDialog
      ) {
        return new AuthInterceptor(router, route, dialog);
      },
      multi: true,
      deps: [ Router, ActivatedRoute, MatDialog ],
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { disableClose: true, hasBackdrop: true },
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
