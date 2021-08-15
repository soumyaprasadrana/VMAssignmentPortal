import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmmViewComponent } from '../public/vmm/vmm-view/vmm-view.component';
import { PathModule } from '../public/widget/path/path.module';
import { VMMRoutingModule } from './vmm-routing.module';
import { VmmHomeComponent } from '../public/vmm/vmm-home/vmm-home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    VmmViewComponent,
    VmmHomeComponent
  ],
  imports: [
    CommonModule,
    PathModule,
    VMMRoutingModule,
    NgbModule
  ]
})
export class VmmModule { }
