import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-link',
  templateUrl: './quick-link.component.html',
  styleUrls: ['./quick-link.component.scss'],
})
export class QuickLinkComponent implements OnInit {
  @Input() iconClass?: string;
  @Input() iconSrc?: string;
  @Input() linkTitle?: string;
  @Input() linkUrl?: string;

  constructor() {}

  ngOnInit(): void {}
  openLink(link: any) {
    window.open(link, '_target');
  }
}
