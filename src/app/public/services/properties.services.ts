import { Injectable } from '@angular/core';
import { VM } from '../DataModel/vm';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NodeclientService } from './nodeclient.service';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class UIPropService {
  vms: Array<any> = [];
  promiseX: any;
  observable: any;
  constructor(private _client: NodeclientService) {}

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

  getProps() {
    const promisey = new Promise((resolve, reject) => {
      this.getDataFromNode()
        .then((res: any) => {
          ////console.log('TeamServices=>', res);
          resolve(res);
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
}
