// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Docs Module
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocsRoutingModule } from "./docs-routing.module";
import { MaterialModule } from "../material.module";
import { DocsHomeComponent } from "../public/docs/docs-dasboard/docs-home.component";
import { DocsViewComponent } from "../public/docs/docs-view/docs-view.component";
import { RouterModule } from "@angular/router";
import { NavModule } from "../public/widget/nav/nav.module";
import { PathModule } from "../public/widget/path/path.module";
import { ADMINModule } from "../admin/admin.module";
import { AdminHomeComponent } from "../public/admin/admin-home/admin-home.component";
import { VmmHomeComponent } from "../public/vmm/vmm-home/vmm-home.component";
import { UserHomeComponent } from "../public/user/user-home/user-home.component";
import { SnapshotsHomeComponent } from "../public/snapshots/snapshots-home/snapshots-home.component";
@NgModule({
  declarations: [ DocsHomeComponent, DocsViewComponent ],
  imports: [
    RouterModule,
    DocsRoutingModule,
    CommonModule,
    MaterialModule,
    ADMINModule,
    NavModule,
    PathModule,
  ],
  providers: [
    AdminHomeComponent,
    VmmHomeComponent,
    UserHomeComponent,
    SnapshotsHomeComponent,
  ],
})
export class DocsModule {}
