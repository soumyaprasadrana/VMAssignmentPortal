import { Component, OnInit } from '@angular/core';
import { UserConfig } from '../user.config';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  cardsMetaData: any;
  constructor() {
    this.cardsMetaData = UserConfig.cardsMetaData;
  }

  ngOnInit(): void {}
}
