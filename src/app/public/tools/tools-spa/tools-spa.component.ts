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
    var res = {
      cardsMetaData: [
        [
          {
            cardTitle: 'Monaco Text Compare',
            cardWidth: 300,
            cardText:
              "Monaco is the tool drive microsoft visula studio code editing. Check it's github page for more details",
            cardHeight: 200,
            cardSPAName: 'textcompare',
            cardIconClass: 'fa fa-list-alt ',
            badgeIcon: 'fa fa-firefox ',
            cardTextClamp: 3,
          },
          {
            cardTitle: 'Prettier',
            cardWidth: 300,
            cardText:
              "Monaco is the tool drive microsoft visula studio code editing. Check it's github page for more details",
            cardHeight: 200,
            cardSPAName: 'prettier',
            cardIconClass: 'fa fa-file-code-o',
            badgeIcon: 'fa fa-pencil-square-o ',
            cardTextClamp: 3,
          },
          {
            cardTitle: 'Android Asset Studio',
            cardWidth: 300,
            cardText:
              "A collection of tools to easily generate assets such as launcher icons for your Android app.Check out it's github repository",
            cardHeight: 200,
            cardSPAName: 'androidassetstudio',
            cardIconClass: 'fa fa-android',
            badgeIcon: 'fa fa-pencil-square-o ',
            cardTextClamp: 3,
          },
        ],
      ],
    };
    this.cardsMetaData = this.parseMetadata(res.cardsMetaData);
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
