// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
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
import {FAIconsComponent} from "../public/tools/tools-spa-internal-faicons/tools-spa-internal-faicons.component"

const routes: Routes = [
  {
    path: '',
    component: ToolsViewComponent,
    children: [
      {
        path: 'dash',
        component: ToolsHomeComponent,
        data: { animation: 'tools',title:'Tools' },
      },

      { path: 'dtb', component: ToolsDbtComponent, data: { animation: 'dtb',title:'Database Tools' } },
      { path: 'ltb', component: ToolsLtbComponent, data: { animation: 'ltb',title:'SSH Tools' } },
      { path: 'faicons', component: FAIconsComponent, data: { animation: 'ltb',title:'Font Awesome Icons' } },
      {
        path: 'technotes',
        component: ToolsTechnotesComponent,
        data: { animation: 'ltb',title:'Technotes' },
      },
      {
        path: 'technotes/add',
        component: AddTechnotesComponent,
        data: { animation: 'ltb',title:'Add Technote' },
      },
      {
        path: 'technotes/view/:technoteID',
        component: ViewTechnoteComponent,
        data: { animation: 'ltb',title:'Technote' },
      },
      {
        path: 'technotes/edit/:technoteID',
        component: EditTechnotesComponent,
        data: { animation: 'ltb',title:'Edit Technote' },
      },
      {
        path: 'spa',
        component: ToolsSpaComponent,
        data: { animation: 'ltb',title:'Single Page Applications' },
      },
      {
        path: 'spa/:app',
        component: ToolsSpaAppComponent,
        data: { animation: 'ltb',title:'Loading...' },
      },

      {
        path: '',
        redirectTo: 'dash',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundHomeComponent,
        data: { animation: 'notFound',title:'404-Page Not Found' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
