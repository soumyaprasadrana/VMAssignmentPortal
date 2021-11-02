import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathModule } from '../public/widget/path/path.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminViewComponent } from '../public/admin/admin-view/admin-view.component';
import { AdminHomeComponent } from '../public/admin/admin-home/admin-home.component';
import { AddTeamComponent } from '../public/admin/add-team/add-team.component';
import { ADMINRoutingModule } from './admin-routing.module';
import { AlertModule } from '../public/widget/alert-dialog/alert-dialog.module';
import { NgxTextOverflowClampModule } from 'ngx-text-overflow-clamp';
import { MaterialModule } from '../material.module';
import { AddTeamLeadComponent } from '../public/admin/add-team-lead/add-team-lead.component';
import { CardsModule } from '../public/widget/card-small/card.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditTeamComponent } from '../public/admin/edit-team/edit-team.component';
import { EditTeamLeadComponent } from '../public/admin/edit-team-lead/edit-team-lead.component';
import { TeamStatsComponent } from '../public/admin/team-stats/team-stats.component';
import { TeamActivityLogsComponent } from '../public/admin/team-activity-logs/team-activity-logs.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { ApplicationPropertiesComponent } from '../public/admin/application-properties/application-properties.component';
@NgModule({
  declarations: [
    AdminViewComponent,
    AdminHomeComponent,
    AddTeamComponent,
    AddTeamLeadComponent,
    EditTeamComponent,
    EditTeamLeadComponent,
    TeamStatsComponent,
    TeamActivityLogsComponent,
    ApplicationPropertiesComponent,
  ],
  imports: [
    CommonModule,
    PathModule,
    AlertModule,
    NgbModule,
    NgxTextOverflowClampModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ADMINRoutingModule,
    MaterialModule,
    CardsModule,
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
export class ADMINModule {}