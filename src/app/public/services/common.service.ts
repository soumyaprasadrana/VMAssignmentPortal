import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityLog } from '../DataModel/activitylog';
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
