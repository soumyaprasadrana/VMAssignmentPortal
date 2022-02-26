// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc VMM Module routing
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { VmmViewComponent } from '../public/vmm/vmm-view/vmm-view.component';
import { AddVmComponent } from '../public/vmm/add-vm/add-vm.component';
import { VmmHomeComponent } from '../public/vmm/vmm-home/vmm-home.component';
import { EditVmComponent } from '../public/vmm/edit-vm/edit-vm.component';
import { EditMultipleVmComponent } from '../public/vmm/edit-vm/edit-multiple-vm.component';

const routes: Routes = [
  {
    path: '',
    component: VmmViewComponent,
    children: [
      {
        path: 'dash',
        component: VmmHomeComponent,
        data: { animation: 'vmm' },
      },

      { path: 'add', component: AddVmComponent, data: { animation: 'add' } },
      { path: 'edit', component: EditVmComponent, data: { animation: 'add' } },
      {
        path: 'selectededit',
        component: EditMultipleVmComponent,
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
export class VMMRoutingModule {}
