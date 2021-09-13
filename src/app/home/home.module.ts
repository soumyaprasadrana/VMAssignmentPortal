import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from '../public/home/home-page/home-page.component';
import { LtbButtonComponent } from '../public/widget/ltb-button/ltb-button.component';
import { DbButtonComponent } from '../public/widget/db-button/db-button.component';
//import { NavbarComponent } from '../public/widget/navbar/navbar.component';

//import { FooterComponent } from '../public/widget/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { PageNotFoundComponent } from '../public/widget/page-not-found/page-not-found.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { HomePageGroupComponent } from '../public/home/home-page-group/home-page-group.component';
import { HomeViewComponent } from '../public/home/home-view/home-view.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { MaterialModule } from '../material.module';
import { NavModule } from '../public/widget/nav/nav.module';

import { FooterModule } from '../public/widget/footer/footer.module';
import { PathModule } from '../public/widget/path/path.module';

import { VmChartComponent } from '../public/home/vm-chart/vm-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ContactPageComponent } from '../public/home/contact-page/contact-page.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    HomeViewComponent,
    HomePageComponent,
    LtbButtonComponent,
    DbButtonComponent,

    HomePageGroupComponent,
    PageNotFoundHomeComponent,
    VmChartComponent,
    ContactPageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NavModule,
    FooterModule,
    PathModule,
    NgxChartsModule,
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        container: '#container',
        rightPadding: 10,
      },
    }),

    NgSelectModule,
  ],
  providers: [],
  bootstrap: [HomeViewComponent],
})
export class HomeModule {}
