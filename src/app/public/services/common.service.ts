// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Common Service
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NodeclientService } from './nodeclient.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  promiseX: any;
  constructor(private _client: NodeclientService) {
    this.promiseX = this.getSPADataFromNode();
  }
  getSpaList() {
    return this.promiseX;
  }
  getSPADataFromNode(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/public/spaMetadata', httpOptions);
    return promise;
  }
}
