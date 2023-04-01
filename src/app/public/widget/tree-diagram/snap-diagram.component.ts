// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Tree Diagram Component
 */
import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { throwToolbarMixedModesError } from "@angular/material/toolbar";

@Component({
  selector: "app-snap-view",
  template: `
  <div class="treeNode">

<div style="cursor: pointer;" (click)="toggleSelectedSnap(snap)">

<svg stroke="null" y="19.1" x="20.41176" height="18" width="18" viewBox="-1 -1 18 18" id="svg_1509">

    <defs id="svg_1497" stroke="null">

     <style id="svg_1496" stroke="null">.gbcls-1{fill:#356f8c}.gbcls-2{fill:#fff}.gbcls-3{fill:#1b5c7e}.gbcls-4{fill:#cbd9e0}.gbcls-5{fill:#62a420}</style>

    </defs>

    <path stroke="null" id="svg_1498" d="m11,0l-9,0l0,9l9,0l0,-9z" class="gbcls-1"/>

    <path stroke="null" id="svg_1499" d="m10,1l0,7l-7,0l0,-7l7,0" class="gbcls-2"/>

    <path stroke="null" id="svg_1500" d="m14,4l-9,0l0,9l9,0l0,-9z" class="gbcls-3"/>

    <path stroke="null" id="svg_1501" d="m14,4l-9,0l0,9l9,0l0,-9z" class="gbcls-1"/>

    <path stroke="null" id="svg_1502" d="m13,5l0,7l-7,0l0,-7l7,0" class="gbcls-2"/>

    <path stroke="null" id="svg_1503" d="m9,6l-9,0l0,9l9,0l0,-9z" class="gbcls-3"/>

    <path stroke="null" id="svg_1504" d="m9,6l-9,0l0,9l9,0l0,-9z" class="gbcls-1"/>

    <path stroke="null" id="svg_1505" d="m8,7l0,7l-7,0l0,-7l7,0" class="gbcls-2"/>

    <path stroke="null" id="svg_1506" d="m10,5l1,0l0,3l-1,0l0,-3zm-4,7l0,-5l-1,0l0,6l2,0l0,-1l-1,0z" class="gbcls-4"/>

    <path stroke="null" id="svg_1507" d="m14,8.61l-4.17,-2.09a4.14,4.14 0 0 0 -1.72,-0.52c-0.77,0 -1.36,0.49 -1.31,2l0,7l2.2,0l0,-2l5,0l0,-4.39z" class="gbcls-2"/>

    <path stroke="null" id="svg_1508" d="m16,11.07a0.91,0.91 0 0 0 -0.22,-0.17l-6.34,-3.49a2.6,2.6 0 0 0 -1.16,-0.41a0.24,0.24 0 0 0 -0.14,0a1.58,1.58 0 0 0 -0.14,1l0,7a1.47,1.47 0 0 0 0.14,0.93a0.34,0.34 0 0 0 0.22,0.06a2.5,2.5 0 0 0 1.08,-0.36l6.34,-3.49a0.91,0.91 0 0 0 0.22,-0.14l0,-0.93z" class="gbcls-5"/>

  

   

   </svg>

   

              {{snap.name}} 
              </div>

              <div *ngIf="snap.isCurrent" style="margin-left:40px">

              <div class="icon">

              <i class="fa ms-4 fa-map-marker badge bg-warning" style="color:#fff" area-label="hidden"> </i></div>

   </div>

</div>

    <div style="list-style: circle;">

     

    <div style="margin-left: 20px;" *ngFor="let item of snap.child" >
    <app-snap-view [parentObject]="parentObject" [snap]="item"></app-snap-view>
    </div>

             

    </div>
    `,
  styles: [
    `
  .treeNode{

    width: max-content;

}

.treeNode:Hover{

   

     background-color: azure;



}

.icon{

width: 20px;

height: 20px;

-webkit-border-radius: 4px;

-moz-border-radius: 4px;

border-radius: 4px;

cursor: pointer;

-webkit-transition: background .6s cubic-bezier(.19, 1, .22, 1);

-moz-transition: background .6s cubic-bezier(.19, 1, .22, 1);

-ms-transition: background .6s cubic-bezier(.19, 1, .22, 1);

-o-transition: background .6s cubic-bezier(.19, 1, .22, 1);

}

  `,
  ],
})
export class SnapViewComponent implements OnInit {
  @Input() parentObject?: any;
  @Input() snap?: any;
  constructor() {}
  toggleSelectedSnap(snap: any) {
    this.parentObject.toggleSelectedSnap(snap);
  }
  ngOnInit() {}
}
