import { Component, OnInit } from '@angular/core';
import { ToolsLTBConfig } from './tools-ltb.config';
@Component({
  selector: 'app-tools-ltb',
  templateUrl: './tools-ltb.component.html',
  styleUrls: ['./tools-ltb.component.scss'],
})
export class ToolsLtbComponent implements OnInit {
  cardsMetaData: any;
  constructor() {
    this.cardsMetaData = ToolsLTBConfig.cardsMetaData;
  }

  ngOnInit(): void {}
}
