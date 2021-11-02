import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { CardButttonComponent } from './card-button.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [CardButttonComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [CardButttonComponent],
})
export class CardsButtonModule {}
