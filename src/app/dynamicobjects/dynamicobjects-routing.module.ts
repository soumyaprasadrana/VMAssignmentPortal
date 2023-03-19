// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Objects Module routing
 */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DynamicObjectAppHomeComponent } from "../public/dynamicobjects/dynamicobject-app-home/dynamicobject-app-home.component";
import { DynamicObjectAppAddRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-add-record/dynamicobjectapp-add-record.component";
import { DynamicObjectChartsViewRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-charts-view/dynamicobjectapp-charts-view.component";
import { DynamicObjectAppEditRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-edit-record/dynamicobjectapp-edit-record.component";
import { DynamicObjectAppUserDefinedFunctionPageComponent } from "../public/dynamicobjects/dynamicobjectapp-user-defined-function-page/dynamicobjectapp-user-defined-function-page.component";
import { DynamicObjectAppViewRecordComponent } from "../public/dynamicobjects/dynamicobjectapp-view-record/dynamicobjectapp-view-record.component";
import { DynamicobjectsHomeComponent } from "../public/dynamicobjects/dynamicobjects-home/dynamicobjects-home.component";
import { DynamicObjectsViewComponent } from "../public/dynamicobjects/dynamicobjects-view/dynamicobjects-view.component";
import { PageNotFoundHomeComponent } from "../public/widget/page-not-found-home/page-not-found-home.component";

const routes: Routes = [
  {
    path: "",
    component: DynamicObjectsViewComponent,
    children: [
      {
        path: "dash",
        component: DynamicobjectsHomeComponent,
        data: { animation: "vmm", title: "Custom Applications" },
      },
      {
        path: "app/:app",
        component: DynamicObjectAppHomeComponent,
        data: { animation: "vmm", title: "Application Home" },
      },
      {
        path: "app/:app/add",
        component: DynamicObjectAppAddRecordComponent,
        data: { animation: "vmm", title: "Add Record" },
      },
      {
        path: "app/:app/edit",
        component: DynamicObjectAppEditRecordComponent,
        data: { animation: "vmm", title: "Edit Record" },
      },
      {
        path: "app/:app/view",
        component: DynamicObjectAppViewRecordComponent,
        data: { animation: "vmm", title: "View Record" },
      },
      {
        path: "app/:app/charts",
        component: DynamicObjectChartsViewRecordComponent,
        data: { animation: "vmm", title: "View Record" },
      },
      {
        path: "app/:app/function/:fun",
        component: DynamicObjectAppUserDefinedFunctionPageComponent,
        data: { animation: "vmm", title: "Function" },
      },
      {
        path: "",
        redirectTo: "dash",
        pathMatch: "full",
      },
      {
        path: "app",
        redirectTo: "dash",
        pathMatch: "full",
      },
      {
        path: "**",
        component: PageNotFoundHomeComponent,
        data: { animation: "notFound", title: "404-Page Not Found!" },
      },
    ],
  },
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DynamicModuleRoutingModule {}
