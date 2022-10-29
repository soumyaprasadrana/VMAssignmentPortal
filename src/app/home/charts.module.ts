// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Home Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PathModule } from '../public/widget/path/path.module';
import { PieChartModule,BarChartModule } from '@swimlane/ngx-charts';
import { VmChartComponent } from '../public/home/vm-chart/vm-chart.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsViewComponent } from '../public/home/charts-view/charts-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RealtedVMSGraphComponent } from '../public/home/related-vms-graph/related-vms-graph.component';
import { TreeModule } from '../public/widget/tree-diagram/tree.module';
@NgModule({
  declarations: [
    ChartsViewComponent,
    VmChartComponent,
    RealtedVMSGraphComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ChartsRoutingModule,
    PathModule,
    PieChartModule,
    BarChartModule,
    TreeModule
    
  ]
})
export class ChartsModule {}
