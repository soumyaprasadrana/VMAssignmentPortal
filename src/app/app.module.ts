import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './public/login/login-form/login-form.component';
import { NavbarComponent } from './public/widget/navbar/navbar.component';
import { LoginViewComponent } from './public/login/login-view/login-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './public/widget/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterModule } from './public/widget/footer/footer.module';
import { MaterialModule } from './material.module';
import { Config } from './app.config';

import { AdminConfig } from './public/admin/admin.config';
import { AuthInterceptor } from './public/services/customHttp';
import { Router } from '@angular/router';
import { SpinnerService } from './public/services/spinner-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    LoginViewComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FooterModule,
    MaterialModule,

    HttpClientModule,

    /*  AngularSlickgridModule.forRoot({
        // add any Global Grid Options/Config you might want
        // to avoid passing the same options over and over in each grids of your App
        enableAutoResize: true,
        autoResize: {
          container: '#container',
          rightPadding: 10
        }
      })
    */
  ],
  exports: [],
  providers: [
    SpinnerService,
    Config,
    AdminConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (router: Router) {
        return new AuthInterceptor(router);
      },
      multi: true,
      deps: [Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
