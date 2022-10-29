// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Activity Logs Service
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityLog } from '../DataModel/activitylog';
import { NodeclientService } from './nodeclient.service';

@Injectable({
  providedIn: 'root',
})
export class ActivitylogsService {
  activityLogs: Array<any> = [];
  promiseX: any;
  constructor(private _client: NodeclientService) {
    this.promiseX = this.getDataFromNode();
  }
  getActiviyLogs() {
    return this.promiseX;
  }
  getDataFromNode(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      'api/admin/activityLog/recent/0',
      httpOptions
    );
    return promise;
  }

  getNextPageDataFromNode(actiovitylogid: number): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      'api/admin/activityLog/next/' + actiovitylogid,
      httpOptions
    );
    return promise;
  }
  getPrevPageDataFromNode(actiovitylogid: number): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      'api/admin/activityLog/prev/' + actiovitylogid,
      httpOptions
    );
    return promise;
  }
  parseData(res: any) {
    const vmDataset: ActivityLog[] = [];
    var parseRes = JSON.parse(res);
    var index = 0;
    for (var key in parseRes) {
      if (key != 'user' && key != 'protocols') {
        vmDataset[index] = {
          id: index,
          activity_id: parseRes[key].activity_id,
          activity_owner: parseRes[key].activity_owner,
          activity_type: parseRes[key].activity_type,
          activity_desc: parseRes[key].activity_desc,
          activity_timestamp: parseRes[key].activity_timestamp,
          activity_status: parseRes[key].activity_status,
        };
        index++;
      }
    }
    return vmDataset;
  }
}
