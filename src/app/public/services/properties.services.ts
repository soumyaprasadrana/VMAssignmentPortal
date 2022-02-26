// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Properties Services
 */
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
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
  private needRefresh = new Subject<any>();
  subscription: Subscription;
  private needReload: any;
  promise: Promise<unknown>;
  setNeedRefresh(value: boolean) {
    this.needRefresh.next({ value: value });
  }

  clearneedRefreshState() {
    this.needRefresh.next();
  }

  getNeedRefreshState(): Observable<any> {
    return this.needRefresh.asObservable();
  }
  constructor(private _client: NodeclientService) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    this.promise = this._client.get('api/public/getUIProps', httpOptions);
    this.setNeedRefresh(false);
    this.subscription = this.getNeedRefreshState().subscribe((value) => {
      if (value) {
        //console.log('Spinner state:' + value.value);
        this.needReload = value.value;
      } else {
      }
    });
  }

  getDataFromNode(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    if (this.needReload) {
      this.promise = this._client.get('api/public/getUIProps', httpOptions);
    }
    if (this.needReload) {
      this.setNeedRefresh(false);
    }
    return this.promise;
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
