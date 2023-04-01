// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Common Module
 */
import { NgModule } from "@angular/core";
import { NgxTextOverflowClampModule } from "ngx-text-overflow-clamp";
import { NgPipesModule } from "ngx-pipes";
import { NgToArrayPipeModule } from "angular-pipes";
import { RunScriptsDirective } from "./runscripts.directive";
@NgModule({
  declarations: [ RunScriptsDirective ],
  imports: [ NgxTextOverflowClampModule, NgPipesModule, NgToArrayPipeModule ],
  exports: [
    NgxTextOverflowClampModule,
    NgPipesModule,
    NgToArrayPipeModule,
    RunScriptsDirective,
  ],
})
export class AppCommonModule {}
