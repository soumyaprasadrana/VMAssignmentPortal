// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Link Component
 */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-link',
  template: `<div class="text-center"><a style="cursor:pointer" class="a" (click)="callParentFunction()" [innerHtml]="template"></a></div>`,
  
})
export class LinkComponent implements OnInit {
  @Input() parentObject:any=null;
  @Input() data:any=null;
  @Input() functionName:any=null;
  @Input() template:any=null;
  @Input() functionParameter1:any=null;
  @Input() functionParameter2:any=null;
  @Input() functionParameter3:any=null;
  constructor(private router: Router) {
   
  }

  ngOnInit(): void {}
  callParentFunction(){
    console.log(this.data,this.functionName,this.template);
    this.parentObject[this.functionName](this.functionParameter1,this.functionParameter2,this.functionParameter3);
  }
  
}
