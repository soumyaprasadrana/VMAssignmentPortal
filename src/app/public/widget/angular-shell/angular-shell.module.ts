// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Card Module
 */
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../../material.module";
import { FormsModule } from "@angular/forms";
import { AngularShellComponent } from "./angular-shell.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
@NgModule({
  declarations: [ AngularShellComponent ],
  imports: [ CommonModule, MaterialModule, FormsModule, RouterModule ],
  exports: [ AngularShellComponent ],
})
export class AngularShellModule {}
