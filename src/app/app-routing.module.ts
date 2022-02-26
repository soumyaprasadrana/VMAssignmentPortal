// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Main App Routes
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './public/login/login-view/login-view.component';
import { PageNotFoundComponent } from './public/widget/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'portal/login', pathMatch: 'full' },
  { path: 'portal', redirectTo: 'portal/home', pathMatch: 'full' },
  { path: 'portal/login', component: LoginViewComponent },
  {
    path: 'portal/home',
    loadChildren: () => import(`./home/home.module`).then((m) => m.HomeModule),
  },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
