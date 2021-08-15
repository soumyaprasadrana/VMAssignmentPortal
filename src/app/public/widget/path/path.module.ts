import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PathComponent } from './path.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
  
@NgModule({
  declarations: [PathComponent],
  imports: [
    CommonModule,
    RouterModule ,
    NgbModule
    
  ],
  exports:[
    PathComponent
  ]
})
export class PathModule { }