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
import { Component, OnInit, Input } from "@angular/core";
import { AuthserviceService } from "../../services/authservice.service";

@Component({
  selector: "app-card-small",
  templateUrl: "./card-small.component.html",
  styleUrls: [ "./card-small.component.scss" ],
})
export class CardSmallComponent implements OnInit {
  @Input() cardHeight?: string = "200";
  @Input() cardWidth?: string = "100";
  @Input() cardRouterLink?: Array<string> = [];
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
  @Input() cardRouterState?: any;

  loggedUser: any;
  visible: any = true;
  constructor(private _auth: AuthserviceService) {
    this.loggedUser = _auth.getUser();
  }

  ngOnInit(): void {
    //console.log("Card Small Component cardRouterState:", this.cardRouterState);
    if (this.cardPermissions && typeof this.cardPermissions == "function") {
      this.visible = this.cardPermissions(this.loggedUser);
    }
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
