// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Object Module
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PathModule } from "../public/widget/path/path.module";
import { DynamicModuleRoutingModule } from "./dynamicobjects-routing.module";
import { DynamicObjectsViewComponent } from "../public/dynamicobjects/dynamicobjects-view/dynamicobjects-view.component";
import { DynamicobjectsHomeComponent } from "../public/dynamicobjects/dynamicobjects-home/dynamicobjects-home.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { AngularSlickgridModule } from "angular-slickgrid";
import { MaterialModule } from "../material.module";
import { FooterModule } from "../public/widget/footer/footer.module";
import { NavModule } from "../public/widget/nav/nav.module";
import { TreeModule } from "../public/widget/tree-diagram/tree.module";
import { CardsButtonModule } from "../public/widget/card-button/card.button.module";
import { CardsModule } from "../public/widget/card-small/card.module";
import { AngularShellModule } from "../public/widget/angular-shell/angular-shell.module";
import { PieChartModule, BarChartModule } from "@swimlane/ngx-charts";
import { DynamicObjectAppHomeComponent } from "../public/dynamicobjects/dynamicobject-app-home/dynamicobject-app-home.component";
import { DynamicObjectAppAddRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-add-record/dynamicobjectapp-add-record.component";
import { DynamicObjectAppEditRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-edit-record/dynamicobjectapp-edit-record.component";
import { DynamicObjectAppViewRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-view-record/dynamicobjectapp-view-record.component";
import { DynamicObjectChartsViewRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-charts-view/dynamicobjectapp-charts-view.component";
import { DynamicObjectAppUserDefinedFunctionPageComponent } from "../public/dynamicobjects/dynamicobjectapp-user-defined-function-page/dynamicobjectapp-user-defined-function-page.component";
import { DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent } from "../public/dynamicobjects/dynamicobjectapp-user-defined-function-angular-html/dynamicobjectapp-user-defined-function-angular-html.component";
import { AttributeDirective } from "../public/widget/utils/attributes";
@NgModule({
  declarations: [
    DynamicObjectsViewComponent,
    DynamicobjectsHomeComponent,
    DynamicObjectAppHomeComponent,
    DynamicObjectAppAddRecordComponent,
    DynamicObjectAppEditRecordComponent,
    DynamicObjectAppViewRecordComponent,
    DynamicObjectChartsViewRecordComponent,
    DynamicObjectAppUserDefinedFunctionPageComponent,
    DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent,
    AttributeDirective,
  ],
  imports: [
    CommonModule,
    PathModule,
    DynamicModuleRoutingModule,
    CommonModule,
    CardsModule,
    AngularShellModule,
    CardsButtonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NavModule,
    FooterModule,
    PieChartModule,
    BarChartModule,
    PathModule,
    TreeModule,
    AngularSlickgridModule.forRoot({
      // add any Global Grid Options/Config you might want
      // to avoid passing the same options over and over in each grids of your App
      enableAutoResize: true,
      autoResize: {
        container: "#container",
        rightPadding: 10,
      },
    }),
    NgSelectModule,
  ],
})
export class DynamicObjectModule {}
