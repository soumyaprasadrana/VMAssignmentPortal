// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc User Module
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponent } from '../public/user/user-view/user-view.component';
import { UserHomeComponent } from '../public/user/user-home/user-home.component';
import { AddUserComponent } from '../public/user/add-user/add-user.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { EditUserComponent } from '../public/user/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserViewComponent,
    children: [
      {
        path: 'dash',
        component: UserHomeComponent,
        data: { animation: 'user' },
      },

      { path: 'add', component: AddUserComponent, data: { animation: 'add' } },

      {
        path: 'edit',
        component: EditUserComponent,
        data: { animation: 'add' },
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
export class UserRoutingModule {}
