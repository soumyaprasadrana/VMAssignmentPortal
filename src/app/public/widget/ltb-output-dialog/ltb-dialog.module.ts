// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal SSH Tools Dialog Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LtbOutputDialogComponent } from './ltb-output-dialog.component';
@NgModule({
  declarations: [LtbOutputDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LtbOutputDialogComponent],
})
export class LTBDialogModule {}
