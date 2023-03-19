// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Path Module
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PathComponent } from "./path.component";
import { RouterModule } from "@angular/router";
import { LinkComponent } from "./link.component";
import { MaterialModule } from "src/app/material.module";
import { IPComponent } from "./ip.component";
import { RichTextComponent } from "./richtext.component";
@NgModule({
  declarations: [
    PathComponent,
    LinkComponent,
    IPComponent,
    RichTextComponent,
  ],
  imports: [ CommonModule, RouterModule, MaterialModule ],
  exports: [ PathComponent, LinkComponent, IPComponent ],
})
export class PathModule {}
