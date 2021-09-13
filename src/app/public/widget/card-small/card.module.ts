import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { CardSmallComponent } from './card-small.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [CardSmallComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [CardSmallComponent],
})
export class CardsModule {}
