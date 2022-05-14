// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-219 18:26:41
 * @desc Home Module Routing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsViewComponent } from '../public/home/charts-view/charts-view.component';
import { VmChartComponent } from '../public/home/vm-chart/vm-chart.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsViewComponent,
    children:[
      {
        path: 'dash',
        component: VmChartComponent,
        data: { animation: 'admin',title:'Charts' },
      },
      {
        path: '',
        redirectTo: 'dash',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: PageNotFoundHomeComponent,
        data: { animation: 'notFound',title:'404-Page Not Found!' },
      }
    ]
    
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}
