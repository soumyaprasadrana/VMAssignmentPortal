// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Tools Module Routing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsViewComponent } from '../public/tools/tools-view/tools-view.component';
import { ToolsHomeComponent } from '../public/tools/tools-home/tools-home.component';
import { ToolsDbtComponent } from '../public/tools/tools-dbt/tools-dbt.component';
import { ToolsLtbComponent } from '../public/tools/tools-ltb/tools-ltb.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { ToolsSpaComponent } from '../public/tools/tools-spa/tools-spa.component';
import { ToolsSpaAppComponent } from '../public/tools/tools-spa-app/tools-spa-app.component';
import { ToolsTechnotesComponent } from '../public/tools/tools-technotes/tools-technotes.component';
import { AddTechnotesComponent } from '../public/tools/add-technotes/add-technotes.component';
import { ViewTechnoteComponent } from '../public/tools/view-technote/view-technote.component';
import { EditTechnotesComponent } from '../public/tools/edit-technotes/edit-technotes.component';

const routes: Routes = [
  {
    path: '',
    component: ToolsViewComponent,
    children: [
      {
        path: 'dash',
        component: ToolsHomeComponent,
        data: { animation: 'tools' },
      },

      { path: 'dtb', component: ToolsDbtComponent, data: { animation: 'dtb' } },
      { path: 'ltb', component: ToolsLtbComponent, data: { animation: 'ltb' } },
      {
        path: 'technotes',
        component: ToolsTechnotesComponent,
        data: { animation: 'ltb' },
      },
      {
        path: 'technotes/add',
        component: AddTechnotesComponent,
        data: { animation: 'ltb' },
      },
      {
        path: 'technotes/view/:technoteID',
        component: ViewTechnoteComponent,
        data: { animation: 'ltb' },
      },
      {
        path: 'technotes/edit/:technoteID',
        component: EditTechnotesComponent,
        data: { animation: 'ltb' },
      },
      {
        path: 'spa',
        component: ToolsSpaComponent,
        data: { animation: 'ltb' },
      },
      {
        path: 'spa/:app',
        component: ToolsSpaAppComponent,
        data: { animation: 'ltb' },
      },

      {
        path: '',
        redirectTo: 'dash',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundHomeComponent,
        data: { animation: 'notFound' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
