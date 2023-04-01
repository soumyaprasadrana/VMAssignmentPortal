// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Ngx Chart Hybrid Component
 */
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
@Component({
  selector: "app-ngx-chart-pie-grid",
  template: `
         <ngx-charts-bar-vertical *ngIf="type=='vertical'" [results]="resultSet" [xAxis]="showXAxis" [yAxis]="showYAxis" [legend]="false" [showXAxisLabel]="showXAxisLabel" [showYAxisLabel]="showYAxisLabel" [yAxisLabel]="yAxisLabel" [xAxisLabel]="xAxisLabel">
        </ngx-charts-bar-vertical>

        <ngx-charts-bar-horizontal *ngIf="type=='horizontal'" [results]="resultSet" [xAxis]="showXAxis" [yAxis]="showYAxis" [legend]="false" [showXAxisLabel]="showXAxisLabel" [showYAxisLabel]="showYAxisLabel" [xAxisLabel]="xAxisLabel" [yAxisLabel]="yAxisLabel">
        </ngx-charts-bar-horizontal>
  `,
})
export class AppNgxBarChartComponent implements OnInit, AfterViewInit {
  @Input() type: string = "vertical";
  @Input() resultSet?: any;
  @Input() showXAxis?: any = true;
  @Input() showYAxis?: any = true;
  @Input() showXAxisLabel?: any = true;
  @Input() showYAxisLabel?: any = true;
  @Input() xAxisLabel?: any;
  @Input() yAxisLabel?: any;
  visible: any = true;
  constructor() {}
  ngAfterViewInit(): void {
    const METHOD = "<AppNgxBarChartComponent> ngAfterViewInit :: ";
    console.log(METHOD + "entry");
    console.log(METHOD + "Input() :: resultSet", this.resultSet);
    console.log(METHOD + "Input() :: showXAxis", this.showXAxis);
    console.log(METHOD + "Input() :: showYAxis", this.showYAxis);
    console.log(METHOD + "Input() :: showXAxisLabel", this.showXAxisLabel);
    console.log(METHOD + "Input() :: showYAxisLabel", this.showYAxisLabel);
    console.log(METHOD + "Input() :: type", this.type);
  }

  ngOnInit(): void {
    if (this.type == "vertical") {
      if (!this.yAxisLabel) this.yAxisLabel = "Count";
    } else if (this.type == "horizontal")
      if (!this.xAxisLabel) this.xAxisLabel = "Count";
  }
}
