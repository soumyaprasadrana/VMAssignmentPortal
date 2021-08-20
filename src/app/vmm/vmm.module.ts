import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmmViewComponent } from '../public/vmm/vmm-view/vmm-view.component';
import { PathModule } from '../public/widget/path/path.module';
import { VMMRoutingModule } from './vmm-routing.module';
import { VmmHomeComponent } from '../public/vmm/vmm-home/vmm-home.component';
import { AddVmComponent } from '../public/vmm/add-vm/add-vm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';


@NgModule({
  declarations: [
    VmmViewComponent,
    VmmHomeComponent,
    AddVmComponent
  ],
  imports: [
    CommonModule,
    PathModule,
    VMMRoutingModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,

  ]
})
export class VmmModule { }
