// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Angular Material Module
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
/**
 * Angular bootstrapping
 */
import { BrowserModule, platformBrowser } from "@angular/platform-browser";
import {
  downgradeModule,
  downgradeComponent,
  UpgradeModule,
} from "@angular/upgrade/static";
import { MaterialModule } from "./material.module";
//import { SlikGridComponent } from "./public/widget/hybrid-components/silk-grid/slik.grid.component";
//import { AngularSlickgridModule } from "angular-slickgrid";
import { AppCardComponent } from "./public/widget/hybrid-components/card-small-hybrid/card.small.angular.component";
import { Config } from "./app.config";
import { AppNgxChartPieGridComponent } from "./public/widget/hybrid-components/ngx-chart/ngx-chart-pie-grid";
import {
  BarChartModule,
  PieChartModule,
  TooltipService,
} from "@swimlane/ngx-charts";
import { AppNgxPieChartComponent } from "./public/widget/hybrid-components/ngx-chart/ngx-pie-chart";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppNgxBarChartComponent } from "./public/widget/hybrid-components/ngx-chart/ngx-bar-chart";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";

//Bootstrap function to downgrade this module
const bootstrapFn = (extraProviders: any) => {
  const platformRef = platformBrowser(extraProviders);
  return platformRef.bootstrapModule(HybridModule);
};

try {
  const downgradedSharedModule = downgradeModule(bootstrapFn);

  /**
   * 
   * App card component; This downgraded directive can be used from angular js; All input fileds should be passed like 
   * 
   */
  var app = window.angular.module("app.components", [ downgradedSharedModule ]);

  var silkGridComponent = downgradeComponent({
    component: AppCardComponent,
    inputs: [
      "cardHeight",
      "cardWidth",
      "cardRouterLink",
      "cardIconClass",
      "cardPermissions",
      "cardStackIcon",
      "cardTitle",
      "cardText",
      "iconColor",
      "badgeIcon",
      "cardTextClamp",
      "cardDanger",
      "cardIconColor",
    ],
  });
  app.directive("appCard", silkGridComponent);

  /**
   * 
   * Slik Grid component; This downgraded directive can be used from angular js; All input fileds should be passed like 
   * 
   */
  /*var silkGridComponent = downgradeComponent({
    component: SlikGridComponent,
    inputs: [
      "gridId",
      "columnDefinitions",
      "gridOptions",
      "dataset",
      "onAngularGridCreated",
      "onGridStateChanged",
      "onBeforeGridDestroy",
      "onSelectedRowsChanged",
    ],
  });
  app.directive("appSlikGrid", silkGridComponent);*/

  /**
   * 
   * Ngx Pie Chart Grid component; This downgraded directive can be used from angular js; All input fileds should be passed like 
   * 
   */
  var appNgxChartComponent = downgradeComponent({
    component: AppNgxChartPieGridComponent,
    inputs: [ "resultSet" ],
  });
  app.directive("appPieChartGrid", appNgxChartComponent);

  /**
   * 
   * Ngx Pie Chart component; This downgraded directive can be used from angular js; All input fileds should be passed like 
   * 
   */
  var appNgxPieChartComponent = downgradeComponent({
    component: AppNgxPieChartComponent,
    inputs: [ "resultSet", "onSelect", "onActive", "onDeactive", "gradient" ],
  });
  app.directive("appPieChart", appNgxPieChartComponent);

  /**
   * 
   * Ngx Bar Chart component; This downgraded directive can be used from angular js; All input fileds should be passed like 
   * 
   */
  var appNgxBarChartComponent = downgradeComponent({
    component: AppNgxBarChartComponent,
    inputs: [
      "resultSet",
      "type",
      "showXAxis",
      "showYAxis",
      "showXAxisLabel",
      "showYAxisLabel",
    ],
  });
  app.directive("appBarChart", appNgxBarChartComponent);

  function getComponents() {
    // depends on how your components are organized
    // for example, iterate over require.context(".", true, /\.component.ts$/);
    // or return fixed array
    return [ MatButton, MatInput, MatIcon ];
  }
  function getComponentSelector(component: any) {
    // if you don't need AOT
    //return toCamelCase(component.__annotations__[0].selector);

    // if you do need it
    let name: string = component.name;
    const suffix = "Component";
    if (name.endsWith(suffix)) {
      name = name.substr(0, name.length - suffix.length);
    }
    return uncapitalize(name);
  }

  function toCamelCase(selector: string) {
    const splitted = selector.split("-");
    for (let i = 1; i < splitted.length; i++) {
      splitted[i] = capitalize(splitted[i]);
    }
    return splitted.join("");
  }

  function capitalize(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function uncapitalize(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  const components = getComponents();
  console.log("<HybridModule> Material Components :: ", components);
  for (const component of components) {
    console.log(
      "<HybridModule> Material Components :: component :: ",
      component
    );
    const selector = getComponentSelector(component);
    console.log(
      "<HybridModule> Material Components :: component :: selector :: ",
      selector
    );
    app.directive(selector, downgradeComponent({ component }));
  }
  console.log("<HybridModule> Defined slick.grid ", app);
} catch (e) {
  console.error(e);
}

@NgModule({
  declarations: [
    // SlikGridComponent,
    AppCardComponent,
    AppNgxChartPieGridComponent,
    AppNgxPieChartComponent,
    AppNgxBarChartComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    /* AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        container: "#container",
        rightPadding: 10,
      },
    }),*/
    UpgradeModule,
    MaterialModule,
    PieChartModule,
    BarChartModule,
  ],
  exports: [
    //SlikGridComponent,
    AppCardComponent,
    AppNgxPieChartComponent,
    AppNgxChartPieGridComponent,
  ],
  providers: [ Config, TooltipService ],
})
export class HybridModule {
  constructor(private upgrade: UpgradeModule) {}
  ngDoBootstrap() {
    //this.upgrade.bootstrap($("#angular-shell")[0], [ "app.components" ]);
  }
}
