import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmmViewComponent } from '../public/vmm/vmm-view/vmm-view.component';
import { PathModule } from '../public/widget/path/path.module';
import { VMMRoutingModule } from './vmm-routing.module';
import { VmmHomeComponent } from '../public/vmm/vmm-home/vmm-home.component';
import { AddVmComponent } from '../public/vmm/add-vm/add-vm.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CardsModule } from '../public/widget/card-small/card.module';
import { EditVmComponent } from '../public/vmm/edit-vm/edit-vm.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    VmmViewComponent,
    VmmHomeComponent,
    AddVmComponent,
    EditVmComponent,
  ],
  imports: [
    CommonModule,
    PathModule,
    VMMRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MaterialModule,
    CardsModule,
  ],
})
export class VmmModule {}
