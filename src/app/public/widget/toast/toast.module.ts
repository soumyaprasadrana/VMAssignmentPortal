// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Toast Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainer } from './portal-toast.component';
import { RouterModule } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ToastsContainer],
  imports: [CommonModule,RouterModule,NgbToastModule],
  exports: [ToastsContainer],
})
export class ToastModule {}
