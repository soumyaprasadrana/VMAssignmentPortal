import { Component, OnInit } from '@angular/core';
import { ToolConfig } from '../tools.config';

@Component({
  selector: 'app-tools-home',
  templateUrl: './tools-home.component.html',
  styleUrls: ['./tools-home.component.scss'],
})
export class ToolsHomeComponent implements OnInit {
  cardsMetaData: any;
  constructor() {
    this.cardsMetaData = ToolConfig.cardsMetaData;
  }

  ngOnInit(): void {}
}
