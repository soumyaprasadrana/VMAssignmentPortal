import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from '../public/user/user-view/user-view.component';
import { AddUserComponent } from '../public/user/add-user/add-user.component';
import { UserHomeComponent } from '../public/user/user-home/user-home.component';
import { PathModule } from '../public/widget/path/path.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
@NgModule({
  declarations: [
    UserViewComponent,
    AddUserComponent,
    UserHomeComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PathModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule
  ]
})
export class UserModule { }
