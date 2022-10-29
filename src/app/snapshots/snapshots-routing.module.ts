// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Snapshots Module Routing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { SnapshotsViewComponent } from '../public/snapshots/snapshots-view/snapshots-view.component';
import { SnapshotsHomeComponent } from '../public/snapshots/snapshots-home/snapshots-home.component';
import { SnapshotsGridComponent } from '../public/snapshots/snapshots-grid/snapshots-grid.component';

const routes: Routes = [
  {
    path: '',
    component: SnapshotsViewComponent,
    children: [
      {
        path: 'dash',
        component: SnapshotsHomeComponent,
        data: { animation: 'tools',title:'Snapshots' },
      },
      {
        path: 'grid',
        component: SnapshotsGridComponent,
        data: { animation: 'tools',title:'Snapshots Data' },
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
export class SnapshotsRoutingModule {}
