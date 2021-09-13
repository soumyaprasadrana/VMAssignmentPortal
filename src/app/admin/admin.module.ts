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
@NgModule({
  declarations: [
    AdminViewComponent,
    AdminHomeComponent,
    AddTeamComponent,
    AddTeamLeadComponent,
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
  ],
})
export class ADMINModule {}
