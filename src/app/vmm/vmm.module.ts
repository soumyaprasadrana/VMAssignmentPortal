// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc VMM Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmmViewComponent } from '../public/vmm/vmm-view/vmm-view.component';
import { PathModule } from '../public/widget/path/path.module';
import { VMMRoutingModule } from './vmm-routing.module';
import { VmmHomeComponent } from '../public/vmm/vmm-home/vmm-home.component';
import { AddVmComponent } from '../public/vmm/add-vm/add-vm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CardsModule } from '../public/widget/card-small/card.module';
import { EditVmComponent } from '../public/vmm/edit-vm/edit-vm.component';
import { EditMultipleVmComponent } from '../public/vmm/edit-vm/edit-multiple-vm.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    VmmViewComponent,
    VmmHomeComponent,
    AddVmComponent,
    EditVmComponent,
    EditMultipleVmComponent,
  ],
  imports: [
    CommonModule,
    PathModule,
    VMMRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MaterialModule,
    CardsModule,
  ],
})
export class VmmModule {}
