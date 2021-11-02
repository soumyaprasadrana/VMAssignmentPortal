import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDialogComponent } from './input-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LTBButtonInputDialogComponent } from './ltb-button-input-dialog.component';
@NgModule({
  declarations: [
    AlertDialogComponent,
    InputDialogComponent,
    LTBButtonInputDialogComponent,
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
  ],
})
export class AlertModule {}
