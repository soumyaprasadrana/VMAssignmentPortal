// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal IP Component
 */
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-ip",
  template: `<div class="text-center">
  <div>
  <table>
  <tr>
  <td class="left-align">
  <span [ngbPopover]="warnPopOver" [autoClose]="'outside'"  container="body" placement="right" *ngIf="type=='warn'" class="btn  card badge bg-warning mui-warning"><i class="fa fa-warning" aria-label="hidden"></i></span>
  <span [ngbPopover]="alertPopOver" [autoClose]="'outside'"  container="body" placement="right" *ngIf="type=='alert'" class="btn card badge bg-danger customA mui-danger"><i class="fa fa-warning" aria-label="hidden"></i></span>
  </td>
  <td>
  <!--<span   (click)="callParentFunction()" [innerHtml]="template">
  </span>-->
  </td>
  </tr>
  </table>
  </div>
  </div>
  <ng-template #warnPopOver>
                <p >
                  <span><span class="badge bg-warning">[WARNING]</span><br> No of snapshots of this vm is more than allowed no of snapshots i.e. {{uiprop.warnSnapshot}}.</span>
                </p>
  </ng-template>
  <ng-template #alertPopOver>
                <p >
                <span><span class="badge bg-danger">[ALERT]</span> <span class="badge bg-primary">[NEED ATTENTION]</span><br> No of snapshots of this vm is more than allowed no of snapshots i.e {{uiprop.alertSnapshot}}.</span>
                </p>
  </ng-template>
  `,
  styles: [
    `.card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
  .customA:hover{
    color: #fff !important;
  }`,
  ],
})
export class IPComponent implements OnInit {
  @Input() parentObject: any = null;
  @Input() data: any = null;
  @Input() type: any = null;
  @Input() functionName: any = null;
  @Input() template: any = null;
  @Input() functionParameter1: any = null;
  @Input() functionParameter2: any = null;
  @Input() functionParameter3: any = null;
  @Input() uiprop: any = null;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  callParentFunction() {
    console.log(this.data, this.functionName, this.template);
    this.parentObject[this.functionName](
      this.functionParameter1,
      this.functionParameter2,
      this.functionParameter3
    );
  }
}
