import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsViewComponent } from '../public/tools/tools-view/tools-view.component';
import { ToolsHomeComponent } from '../public/tools/tools-home/tools-home.component';
import { ToolsDbtComponent } from '../public/tools/tools-dbt/tools-dbt.component';
import { ToolsLtbComponent } from '../public/tools/tools-ltb/tools-ltb.component';
import { PageNotFoundHomeComponent } from '../public/widget/page-not-found-home/page-not-found-home.component';


const routes: Routes = [
  {
    path: '', component: ToolsViewComponent, children: [
      {
        path: 'dash', component: ToolsHomeComponent,data: { animation: 'tools'} 
      },
   
      { path: 'dtb', component: ToolsDbtComponent,data: { animation: 'dtb'} },
      { path: 'ltb', component: ToolsLtbComponent,data: { animation: 'ltb'} },
     
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
export class ToolsRoutingModule { }
