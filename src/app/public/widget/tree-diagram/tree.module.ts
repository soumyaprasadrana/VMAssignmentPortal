// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Tree Path Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-diagram.component';
import { RouterModule } from '@angular/router';
import { SnapViewComponent } from './snap-diagram.component';

@NgModule({
  declarations: [TreeViewComponent,SnapViewComponent],
  imports: [CommonModule, RouterModule],
  exports: [TreeViewComponent,SnapViewComponent],
})
export class TreeModule {}
