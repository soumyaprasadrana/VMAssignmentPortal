import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';
import { VmmViewComponent } from '../public/vmm/vmm-view/vmm-view.component';
import { AddVmComponent } from '../public/vmm/add-vm/add-vm.component';
import { VmmHomeComponent } from '../public/vmm/vmm-home/vmm-home.component';


const routes: Routes = [
  {
    path: '', component: VmmViewComponent, children: [
      {
        path: 'dash', component: VmmHomeComponent,data: { animation: 'vmm'} 
      },
   
      { path: 'add', component: AddVmComponent,data: { animation: 'add'} },
     
      {
        path: '', redirectTo: 'dash', pathMatch: 'full'
      },
      { path: '**', component: PageNotFoundHomeComponent,data: { animation: 'notFound'}  }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})  
export class VMMRoutingModule { }
