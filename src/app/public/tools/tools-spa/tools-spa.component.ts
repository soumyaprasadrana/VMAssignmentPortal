// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Tools SPA Component
 */
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { NodeclientService } from '../../services/nodeclient.service';

@Component({
  selector: 'app-tools-spa',
  templateUrl: './tools-spa.component.html',
  styleUrls: ['./tools-spa.component.scss'],
})
export class ToolsSpaComponent implements OnInit {
  cardsMetaData: any;
  constructor(
    private _client: NodeclientService,
    private _common: CommonService
  ) {
    _common.getSpaList().then(
      (res: any) => {
        this.cardsMetaData = this.parseMetadata(res.cardsMetaData);
        //console.log('api/public/sshMetadata res:', res);
      },
      (error: any) => {
        console.log('Unable to get single page applications list :', error);
      }
    );
  }
  parseMetadata(metadata: any) {
    for (var i = 0; i < metadata.length; i++) {
      //row
      for (var j = 0; j < metadata[i].length; j++) {
        //item
        if (!metadata[i][j].cardIconClass)
          metadata[i][j].cardIconClass = ' fa-firefox';
        metadata[i][j].cardRouterLink = [metadata[i][j].cardSPAName];
        metadata[i][j].cardRouterState = { data: metadata[i][j] };
      }
    }
    return metadata;
  }
  ngOnInit(): void {}
}
