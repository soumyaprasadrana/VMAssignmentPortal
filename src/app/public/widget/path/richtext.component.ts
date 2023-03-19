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
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
@Component({
  selector: "app-richtext",
  template: `<div class="text-center">
  <div>
  <span [ngbPopover]="richTextPopOver" [matTooltip]="'View Details'" [autoClose]="'outside'"  container="body" placement="bottom" class="btn  card badge badge-warning mui-warning"><i class="fa fa-file-text " aria-label="hidden"></i></span>
  <ng-template #richTextPopOver>
              <div class="richtext-container w-100 h-100">
                <p class="w-100" [innerHtml]="sanitizer.bypassSecurityTrustHtml(data)">
                </p>
              </div>
  </ng-template>
  
  `,
  styles: [
    `
    .richtext-container{
      overflow: scroll;
      height: 200px !important;
    }
    .card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
  }
  .customA:hover{
    color: #fff !important;
  }`,
  ],
})
export class RichTextComponent implements OnInit {
  @Input() parentObject: any = null;
  @Input() data: any = null;
  @Input() type: any = null;
  @Input() functionName: any = null;
  @Input() template: any = null;
  @Input() functionParameter1: any = null;
  @Input() functionParameter2: any = null;
  @Input() functionParameter3: any = null;
  @Input() uiprop: any = null;
  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log("=================== RichTextComponent Data ::", this.data);
  }
  callParentFunction() {
    console.log(this.data, this.functionName, this.template);
    this.parentObject[this.functionName](
      this.functionParameter1,
      this.functionParameter2,
      this.functionParameter3
    );
  }
}
