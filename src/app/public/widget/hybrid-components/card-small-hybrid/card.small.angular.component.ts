// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Card Component
 */
import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { AngularSlickgridComponent } from "angular-slickgrid";
import { PathComponent } from "../../path/path.component";
@Component({
  selector: "app-card",
  template: `
        <div *ngIf="visible" class="card" [ngStyle]="{'width.px':cardWidth ,'height.px': cardHeight}">
    <div class="card-body text-center" (click)="clickHandle()">
        <span class="card-notify-badge" [ngClass]="{'card-notify-bg-danger' : cardDanger}"><i class="{{badgeIcon}}"></i></span>
        <h1 class="h4 bg-light -1 text-muted link pe-auto  center-block ">
            <span class="fa-stack">
                 <i class="{{cardIconClass}} fa-stack-2x card-icon-color" [ngStyle]="{'color':cardIconColor}"  area-label="false"></i>
                <i *ngIf="cardStackIcon" class="h5 {{cardStackIcon}} fa-stack-1x ms-1 mt-1 card-icon-color" [ngStyle]="{'color':cardStackIconColor}"></i>
            </span>
            <br>
            <span class="ms-2 mt-2 align-middle">{{cardTitle}}</span>
        </h1>
        <ng-template #tipContent>{{cardText}}</ng-template>
        <p [clamp]="cardTextClamp" [ngbTooltip]="cardTextClamp?tipContent:null" [placement]="cardTitle.includes('Dynamic Objects')?'top':'bottom'" class="card-text" container="body" >{{cardText}}</p>

    </div>
</div>

  `,
  styleUrls: [ "../../card-small/card-small.component.scss" ],
})
export class AppCardComponent implements OnInit, AfterViewInit {
  @Input() cardHeight?: string = "200";
  @Input() cardWidth?: string = "100";
  @Input() cardIconClass?: string = "";
  @Input() cardPermissions?: any;
  @Input() cardStackIcon?: string = "";
  @Input() cardTitle?: string = "";
  @Input() cardText?: string = "";
  @Input() iconColor?: string = "";
  @Input() badgeIcon?: string = "fa fa-cog";
  @Input() cardTextClamp?: number = 2;
  @Input() cardDanger?: boolean = false;
  @Input() cardIconColor?: string = "";
  @Input() cardStackIconColor?: string = "";
  @Input() callback?: any;
  @Input() parentObject?: any;
  visible: any = true;
  constructor() {}
  ngAfterViewInit(): void {
    const METHOD = "<AppCardComponent> ngAfterViewInit :: ";
    console.log(METHOD + "entry");
    console.log(METHOD + "Input() :: cardHeight", this.cardHeight);
    console.log(METHOD + "Input() :: cardWidth", this.cardWidth);
    console.log(METHOD + "Input() :: cardIconClass", this.cardIconClass);
    console.log(METHOD + "Input() :: cardPermissions", this.cardPermissions);
    console.log(METHOD + "Input() :: cardStackIcon", this.cardStackIcon);
    console.log(METHOD + "Input() :: cardTitle", this.cardTitle);
    console.log(METHOD + "Input() :: cardText", this.cardText);
    console.log(METHOD + "Input() :: iconColor", this.iconColor);
    console.log(METHOD + "Input() :: badgeIcon", this.badgeIcon);
    console.log(METHOD + "Input() :: cardTextClamp", this.cardTextClamp);
    console.log(METHOD + "Input() :: cardDanger", this.cardDanger);
    console.log(METHOD + "Input() :: cardIconColor", this.cardIconColor);
    console.log(
      METHOD + "Input() :: cardStackIconColor",
      this.cardStackIconColor
    );
    console.log(METHOD + "Input() :: callback", this.callback);
    console.log(METHOD + "Input() :: parentObject", this.parentObject);
  }

  ngOnInit(): void {
    //console.log('Card Small Component visible:', this.visible);
    this.iconColor = this.getRandomColor();
    if (
      this.badgeIcon == "" ||
      typeof this.badgeIcon == "undefined" ||
      this.badgeIcon == "undefined"
    ) {
      this.badgeIcon = "fa fa-cog";
    }
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return "#" + ("000000" + color).slice(-6);
  }
  clickHandle() {
    //console.log('clickHandle called', typeof this.callback);
    if (typeof this.callback == "function" && this.parentObject) {
      this.callback(this.parentObject);
    } else if (typeof this.callback == "function" && !this.parentObject) {
      this.callback();
    }
    return;
  }
}
