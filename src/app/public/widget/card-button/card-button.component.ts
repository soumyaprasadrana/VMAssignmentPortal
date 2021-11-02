import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss'],
})
export class CardButttonComponent implements OnInit {
  @Input() cardHeight?: string = '200';
  @Input() cardWidth?: string = '100';
  @Input() cardRouterLink?: Array<string> = [];
  @Input() cardIconClass?: string = '';
  @Input() cardStackIcon?: string = '';
  @Input() cardTitle?: string = '';
  @Input() cardText?: string = '';
  @Input() iconColor?: string = '';
  @Input() badgeIcon?: string = 'fa fa-cog';
  @Input() cardTextClamp?: number = 2;
  @Input() cardDanger?: boolean = false;
  @Input() cardIconColor?: string = '';
  @Input() cardStackIconColor?: string = '';
  constructor() {}

  ngOnInit(): void {
    this.iconColor = this.getRandomColor();
    if (
      this.badgeIcon == '' ||
      typeof this.badgeIcon == 'undefined' ||
      this.badgeIcon == 'undefined'
    ) {
      this.badgeIcon = 'fa fa-cog';
    }
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
}
