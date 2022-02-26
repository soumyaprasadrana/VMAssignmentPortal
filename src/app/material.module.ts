// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Angular Material Module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppCommonModule } from './public/widget/utils/common.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFileUploaderModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AppCommonModule,
    MatTooltipModule,
    MatTableModule,
    QuillModule,
  ],
  exports: [
    AngularFileUploaderModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AppCommonModule,
    MatTooltipModule,
    MatTableModule,
    QuillModule,
  ],
})
export class MaterialModule {}
