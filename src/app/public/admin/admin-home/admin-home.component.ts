import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { AdminConfig } from '../admin.config';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  cardsMetaData: any;
  constructor() {
    this.cardsMetaData = AdminConfig.cardsMetaData;
  }

  ngOnInit(): void {}
}
