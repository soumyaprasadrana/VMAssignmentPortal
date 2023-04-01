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
import { Component, OnInit, Input, AfterViewInit, ViewContainerRef, Injector } from "@angular/core";
import { TooltipService } from '@swimlane/ngx-charts';
@Component({
  selector: "app-ngx-pie-chart",
  template: `
         <ngx-charts-pie-chart labels="true" maxLabelLength="100" legends="true" trimLabels="false"  [results]="resultSet" [gradient]="gradient" (select)="onSelect($event)" (activate)="onActivate($event)" (deactivate)="onDeactivate($event)">
        </ngx-charts-pie-chart>
  `,
})
export class AppNgxPieChartComponent implements OnInit, AfterViewInit {
  @Input() resultSet?: any;
  @Input() gradient?: any = true;
  @Input() onSelect: any = () => {};
  @Input() onActivate: any = () => {};
  @Input() onDeactivate: any = () => {};
   private chartToolTipService !: TooltipService;
  readonly viewContainerRef!: ViewContainerRef;
  visible: any = true;
  constructor(private injectorObj: Injector,) {
     const METHOD = "<AppNgxChartPieGridComponent> constructor :: ";
    console.log(METHOD + "entry");
    this.chartToolTipService = this.injectorObj.get(TooltipService);
    this.viewContainerRef = this.injectorObj.get(ViewContainerRef);
    console.log(METHOD + "viewContainerRef :: ",this.viewContainerRef);
  }

  ngAfterViewInit(): void {
    const METHOD = "<AppNgxChartPieGridComponent> ngAfterViewInit :: ";
    console.log(METHOD + "entry");
    console.log(METHOD + "Input() :: resultSet", this.resultSet);
    console.log(METHOD + "Input() :: gradient", this.gradient);
    console.log(METHOD + "Input() :: select", this.onSelect);
    console.log(METHOD + "Input() :: deactive", this.onDeactivate);
    console.log(METHOD + "Input() :: active", this.onActivate);
  }

  ngOnInit(): void {
    this.chartToolTipService.injectionService.setRootViewContainer(this.viewContainerRef);
  }
}
