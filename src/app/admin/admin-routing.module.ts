import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { AdminViewComponent } from '../public/admin/admin-view/admin-view.component';
import { AddTeamComponent } from '../public/admin/add-team/add-team.component';
import { AdminHomeComponent } from '../public/admin/admin-home/admin-home.component';
import { AddTeamLeadComponent } from '../public/admin/add-team-lead/add-team-lead.component';

const routes: Routes = [
  {
    path: '',
    component: AdminViewComponent,
    children: [
      {
        path: 'dash',
        component: AdminHomeComponent,
        data: { animation: 'admin' },
      },

      {
        path: 'addTeam',
        component: AddTeamComponent,
        data: { animation: 'addTeam' },
      },
      {
        path: 'addTeamLead',
        component: AddTeamLeadComponent,
        data: { animation: 'addTeam' },
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
export class ADMINRoutingModule {}
