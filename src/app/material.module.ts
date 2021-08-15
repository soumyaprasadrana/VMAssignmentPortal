import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule } from '@angular/material/button';
  import { MatIconModule}  from '@angular/material/icon';
  import {MatListModule } from '@angular/material/list';
  import {MatSidenavModule } from '@angular/material/sidenav';
  import {MatToolbarModule} from '@angular/material/toolbar';
  import {MatInputModule} from '@angular/material/input';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatGridListModule } from '@angular/material/grid-list'; 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  exports:[
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
     MatInputModule,
    MatFormFieldModule,
    MatGridListModule
  ]
})
export class MaterialModule { }