import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDialogComponent } from './input-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LTBButtonInputDialogComponent } from './ltb-button-input-dialog.component';
import { PassChangeDialogComponent } from './change-pass-dialog';
import { AdditionalDataDialogComponent } from './additional-data-dialog';
import { FileChooseDialogComponent } from './file-choose-dialog.component';
@NgModule({
  declarations: [
    AlertDialogComponent,
    InputDialogComponent,
    LTBButtonInputDialogComponent,
    PassChangeDialogComponent,
    AdditionalDataDialogComponent,
    FileChooseDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertDialogComponent,
    InputDialogComponent,
    LTBButtonInputDialogComponent,
    PassChangeDialogComponent,
    AdditionalDataDialogComponent,
    FileChooseDialogComponent,
  ],
})
export class AlertModule {}
