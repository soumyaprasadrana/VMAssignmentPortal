// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Quick Links Component
 */
import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-quick-link",
  templateUrl: "./quick-link.component.html",
  styleUrls: [ "./quick-link.component.scss" ],
})
export class QuickLinkComponent implements OnInit {
  @Input() iconClass?: string;
  @Input() iconSrc?: any;
  @Input() linkTitle?: string;
  @Input() linkUrl?: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.iconSrc)
      this.iconSrc = this.sanitizer.bypassSecurityTrustUrl(this.iconSrc);
  }
  openLink(link: any) {
    window.open(link, "_blank");
  }
}
