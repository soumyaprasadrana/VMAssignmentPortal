// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal RowDetail Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowDetailComponent } from './row-detail-view.component';

@NgModule({
  declarations: [RowDetailComponent],
  imports: [CommonModule],
  exports: [RowDetailComponent],
  providers: [],
})
export class RowDetailModule {}
