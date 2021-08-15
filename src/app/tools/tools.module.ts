import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsHomeComponent } from '../public/tools/tools-home/tools-home.component';
import { ToolsDbtComponent } from '../public/tools/tools-dbt/tools-dbt.component';
import { ToolsLtbComponent } from '../public/tools/tools-ltb/tools-ltb.component';
import { ToolsViewComponent } from '../public/tools/tools-view/tools-view.component';
import { PathModule } from '../public/widget/path/path.module';


@NgModule({
  declarations: [
    ToolsHomeComponent,
    ToolsDbtComponent,
    ToolsLtbComponent,
    ToolsViewComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    PathModule
  ]
})
export class ToolsModule { }
