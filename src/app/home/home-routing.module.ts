// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Home Module Routing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../public/home/home-page/home-page.component';
import { HomeViewComponent } from '../public/home/home-view/home-view.component';
import { RealtedVMSGraphComponent } from '../public/home/related-vms-graph/related-vms-graph.component';
import { VmChartComponent } from '../public/home/vm-chart/vm-chart.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,data:{title:'Home'},
    children: [
      {
        path: 'dash',
        component: HomePageComponent,
        data: { animation: 'dash',title:'Home' },
      },
      {
        path: 'vmm',
        loadChildren: () =>
          import(`../vmm/vmm.module`).then((m) => m.VmmModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import(`../admin/admin.module`).then((m) => m.ADMINModule),
      },
      {
        path: 'chart',
        component: VmChartComponent,
        data: { animation: 'chart',title:'Charts' },
      },
      {
        path: 'chart/relationships',
        component: RealtedVMSGraphComponent,
        data: { animation: 'chart',title:'Relationships' },
      },

      {
        path: 'user',
        loadChildren: () =>
          import(`../user/user.module`).then((m) => m.UserModule),
      },

      {
        path: 'tools',
        loadChildren: () =>
          import(`../tools/tools.module`).then((m) => m.ToolsModule),
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
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
