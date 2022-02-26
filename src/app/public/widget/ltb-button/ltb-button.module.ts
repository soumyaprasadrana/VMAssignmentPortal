// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal SSH Tool Button Component
 */
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LtbButtonComponent } from './ltb-button.component';
import { CardsButtonModule } from '../card-button/card.button.module';
import { AlertModule } from '../alert-dialog/alert-dialog.module';

@NgModule({
  declarations: [LtbButtonComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    CardsButtonModule,
    AlertModule,
  ],
  exports: [LtbButtonComponent],
})
export class LTBButtonModule {}
