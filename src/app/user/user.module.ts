import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from '../public/user/user-view/user-view.component';
import { AddUserComponent } from '../public/user/add-user/add-user.component';
import { UserHomeComponent } from '../public/user/user-home/user-home.component';
import { PathModule } from '../public/widget/path/path.module';

@NgModule({
  declarations: [
    UserViewComponent,
    AddUserComponent,
    UserHomeComponent,
   
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PathModule
  ]
})
export class UserModule { }
