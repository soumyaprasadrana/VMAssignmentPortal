import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDialogComponent } from './input-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [AlertDialogComponent, InputDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AlertDialogComponent, InputDialogComponent],
})
export class AlertModule {}
