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
         <ngx-charts-pie-grid [view]=""  [results]="resultSet">
        </ngx-charts-pie-grid>
  `,
})
export class AppNgxChartPieGridComponent implements OnInit, AfterViewInit {
  @Input() resultSet?: any;
  visible: any = true;
  constructor() {}
  ngAfterViewInit(): void {
    const METHOD = "<AppNgxChartPieGridComponent> ngAfterViewInit :: ";
    console.log(METHOD + "entry");
    console.log(METHOD + "Input() :: resultSet", this.resultSet);
  }

  ngOnInit(): void {}
}
