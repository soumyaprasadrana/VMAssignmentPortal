// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Admin Module Routing
 */
import { ApplicationInitStatus, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { AdminViewComponent } from '../public/admin/admin-view/admin-view.component';
import { AddTeamComponent } from '../public/admin/add-team/add-team.component';
import { AdminHomeComponent } from '../public/admin/admin-home/admin-home.component';
import { AddTeamLeadComponent } from '../public/admin/add-team-lead/add-team-lead.component';
import { EditTeamComponent } from '../public/admin/edit-team/edit-team.component';
import { EditTeamLeadComponent } from '../public/admin/edit-team-lead/edit-team-lead.component';
import { TeamStatsComponent } from '../public/admin/team-stats/team-stats.component';
import { TeamActivityLogsComponent } from '../public/admin/team-activity-logs/team-activity-logs.component';
import { ApplicationPropertiesComponent } from '../public/admin/application-properties/application-properties.component';

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
        path: 'editTeam',
        component: EditTeamComponent,
        data: { animation: 'addTeam' },
      },
      {
        path: 'editTeamLead',
        component: EditTeamLeadComponent,
        data: { animation: 'addTeam' },
      },
      {
        path: 'teamStats',
        component: TeamStatsComponent,
        data: { animation: 'addTeam' },
      },
      {
        path: 'addTeamLead',
        component: AddTeamLeadComponent,
        data: { animation: 'addTeam' },
      },
      {
        path: 'activityLogs',
        component: TeamActivityLogsComponent,
        data: { animation: 'addTeam' },
      },
      {
        path: 'properties',
        component: ApplicationPropertiesComponent,
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
