// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Tools Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsHomeComponent } from '../public/tools/tools-home/tools-home.component';
import { ToolsDbtComponent } from '../public/tools/tools-dbt/tools-dbt.component';
import { ToolsLtbComponent } from '../public/tools/tools-ltb/tools-ltb.component';
import { ToolsViewComponent } from '../public/tools/tools-view/tools-view.component';
import { PathModule } from '../public/widget/path/path.module';
import { CardsModule } from '../public/widget/card-small/card.module';
import { LTBButtonModule } from '../public/widget/ltb-button/ltb-button.module';
import { DBButtonModule } from '../public/widget/db-button/db-button.module';
import { CardsButtonModule } from '../public/widget/card-button/card.button.module';
import { LTBDialogModule } from '../public/widget/ltb-output-dialog/ltb-dialog.module';
import { ToolsSpaComponent } from '../public/tools/tools-spa/tools-spa.component';
import { ToolsSpaAppComponent } from '../public/tools/tools-spa-app/tools-spa-app.component';
import { ToolsTechnotesComponent } from '../public/tools/tools-technotes/tools-technotes.component';
import { EditTechnotesComponent } from '../public/tools/edit-technotes/edit-technotes.component';
import { AddTechnotesComponent } from '../public/tools/add-technotes/add-technotes.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../material.module';
import { ViewTechnoteComponent } from '../public/tools/view-technote/view-technote.component';
import { FAIconsComponent } from '../public/tools/tools-spa-internal-faicons/tools-spa-internal-faicons.component';

@NgModule({
  declarations: [
    ToolsHomeComponent,
    ToolsDbtComponent,
    ToolsLtbComponent,
    ToolsViewComponent,
    ToolsSpaComponent,
    ToolsSpaAppComponent,
    ToolsTechnotesComponent,
    EditTechnotesComponent,
    AddTechnotesComponent,
    ViewTechnoteComponent,
    FAIconsComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    PathModule,
    CardsModule,
    CardsButtonModule,
    DBButtonModule,
    LTBButtonModule,
    LTBDialogModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MaterialModule,
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        container: '#container',
        rightPadding: 10,
      },
    }),
  ],
})
export class ToolsModule {}
