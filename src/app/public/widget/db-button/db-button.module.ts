import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DbButtonComponent } from './db-button.component';
@NgModule({
  declarations: [DbButtonComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  exports: [DbButtonComponent],
})
export class DBButtonModule {}
