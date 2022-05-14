// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Home Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from '../public/home/home-page/home-page.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { HomeViewComponent } from '../public/home/home-view/home-view.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { MaterialModule } from '../material.module';
import { NavModule } from '../public/widget/nav/nav.module';
import { FooterModule } from '../public/widget/footer/footer.module';
import { PathModule } from '../public/widget/path/path.module';
import { RealtedVMSGraphComponent } from '../public/home/related-vms-graph/related-vms-graph.component';
import { ContactPageComponent } from '../public/home/contact-page/contact-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TreeModule } from '../public/widget/tree-diagram/tree.module';
import { RowDetailModule } from '../public/widget/row-detail-view/row-detail-view.module';

@NgModule({
  declarations: [
    HomeViewComponent,
    HomePageComponent,
    PageNotFoundHomeComponent,
    RealtedVMSGraphComponent,
    ContactPageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NavModule,
    FooterModule,
    PathModule,
    TreeModule,
    RowDetailModule,
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
