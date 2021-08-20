import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './public/login/login-form/login-form.component';
//import { HomePageComponent } from './public/home/home-page/home-page.component';
//import { LtbButtonComponent } from './public/widget/ltb-button/ltb-button.component';
//import { DbButtonComponent } from './public/widget/db-button/db-button.component';
import { NavbarComponent } from './public/widget/navbar/navbar.component';
//import { NavbarHomeComponent } from './public/widget/navbar-home/navbar-home.component';
//import { FooterComponent } from './public/widget/footer/footer.component';
import { LoginViewComponent } from './public/login/login-view/login-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './public/widget/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AngularSlickgridModule } from 'angular-slickgrid';
//import { HomePageGroupComponent } from './public/home/home-page-group/home-page-group.component';
//import { HomeViewComponent } from './public/home/home-view/home-view.component';
import { FooterModule } from './public/widget/footer/footer.module';
import { MaterialModule } from './material.module';

import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    // HomePageComponent,
    //  LtbButtonComponent,
    //  DbButtonComponent,
    NavbarComponent,
    //  NavbarHomeComponent,

    LoginViewComponent,
    PageNotFoundComponent,
    // HomePageGroupComponent,
    //HomeViewComponent


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FooterModule, MaterialModule,
    NgxSelectModule


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
