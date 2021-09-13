import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from '../public/user/user-view/user-view.component';
import { AddUserComponent } from '../public/user/add-user/add-user.component';
import { UserHomeComponent } from '../public/user/user-home/user-home.component';
import { PathModule } from '../public/widget/path/path.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CardsModule } from '../public/widget/card-small/card.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditUserComponent } from '../public/user/edit-user/edit-user.component';
@NgModule({
  declarations: [
    UserViewComponent,
    AddUserComponent,
    UserHomeComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PathModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MaterialModule,
    CardsModule,
  ],
})
export class UserModule {}
