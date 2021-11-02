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
