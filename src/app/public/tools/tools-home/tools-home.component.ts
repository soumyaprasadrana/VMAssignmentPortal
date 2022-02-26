// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Tools Home Component
 */
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
