import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../public/home/home-page/home-page.component';
import { HomeViewComponent } from '../public/home/home-view/home-view.component';
import { VmChartComponent } from '../public/home/vm-chart/vm-chart.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
    children: [
      {
        path: 'dash',
        component: HomePageComponent,
        data: { animation: 'dash' },
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
        data: { animation: 'chart' },
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
        data: { animation: 'notFound' },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
