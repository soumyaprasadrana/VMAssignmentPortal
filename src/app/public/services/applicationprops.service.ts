import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivityLog } from '../DataModel/activitylog';
import { NodeclientService } from './nodeclient.service';
import { Property } from '../DataModel/prop';

@Injectable({
  providedIn: 'root',
})
export class ApplicationpropsService {
  activityLogs: Array<any> = [];
  promiseX: any;
  constructor(private _client: NodeclientService) {
    this.promiseX = this.getDataFromNode();
  }
  getgetProps() {
    return this.promiseX;
  }
  getDataFromNode(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/public/getUIProps', httpOptions);
    return promise;
  }

  parseData(res: any) {
    const propDataset: Property[] = [];
    var parseRes = JSON.parse(res);
    var index = 0;
    for (var key in parseRes) {
      propDataset[index] = {
        id: index,
        prop_name: key,
        prop_value: parseRes[key],
      };
      index++;
    }

    return propDataset;
  }
}
