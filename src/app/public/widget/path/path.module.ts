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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathComponent } from './path.component';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './link.component';
import { MaterialModule } from 'src/app/material.module';
@NgModule({
  declarations: [PathComponent,LinkComponent],
  imports: [CommonModule, RouterModule,MaterialModule],
  exports: [PathComponent,LinkComponent],
})
export class PathModule {}
