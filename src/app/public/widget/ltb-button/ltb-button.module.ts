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
