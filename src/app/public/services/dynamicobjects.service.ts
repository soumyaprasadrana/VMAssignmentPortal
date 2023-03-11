// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Objects App Services
 */
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NodeclientService } from './nodeclient.service';
import { DynamicObject } from '../DataModel/dynamicobject';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class DynamicObjectsService {
  vms: Array<any> = [];
  promiseX: any;
  observable: any;
  private needRefresh = new Subject<any>();
  subscription: Subscription;
  private needReload: any;

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
    this.observable = this.getDynamicObjectsObservable();
    this.promiseX = this.getDataFromNode();
    this.setNeedRefresh(false);
    this.subscription = this.getNeedRefreshState().subscribe((value) => {
      if (value) {
        //console.log('Spinner state:' + value.value);
        this.needReload = value.value;
      } else {
      }
    });
  }
  getDynamicObjectsObservable2(): Observable<any> {
    return this.observable;
  }
  getDynamicObjectAppRecords(app:any):any{
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/dynamicobjects/'+app+'/getAll', httpOptions);
    return promise;
  }
  getDynamicObjects(): any {
    console.log('getDynamicObjects() :: this.needReload ::', this.needReload);
    if (this.needReload) {
      this.promiseX = this.getDataFromNode();
    }
    const promise = new Promise((resolve, reject) => {
      this.promiseX
        .then((res: any) => {
          //console.log('getVms() ', res);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          resolve(this.parseData(res));
        })
        .catch((err: any) => {
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          reject(err);
        });
    });
    return promise;
  }
  getDynamicObject(id:any): any {
    console.log('getDynamicObject() :: this.needReload ::');
   
      var tnp = this.getDynamicObjectFromNode(id);
    
    const promise = new Promise((resolve, reject) => {
      tnp
        .then((res: any) => {
          //console.log('getVms() ', res);
        
          resolve(res);
        })
        .catch((err: any) => {
          
          reject(err);
        });
    });
    return promise;
  }
  getDataFromNode(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/dynamicobjects/getAll', httpOptions);
    return promise;
  }
  getDynamicObjectFromNode(id:any): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/dynamicobjects/get/'+id, httpOptions);
    return promise;
  }

  getDynamicObjectsObservable(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var observable = this._client.getObservable(
      'api/dynamicobjects/getAll',
      httpOptions
    );
    return observable;
  }

  deleteDynamicObject(id: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var data: any = {};
    return this._client.post('api/dynamicobjects/delete/' + id, data, httpOptions);
  }

  parseData(res: any) {
    const DynamicObjectsDataset: DynamicObject[] = [];
    var parseRes = JSON.parse(res);
    var index = 0;
    for (var key in parseRes) {
      if (key != 'user' && key != 'protocols') {
        DynamicObjectsDataset[index] = {
          id: index,
          name: parseRes[key].name,
          description: parseRes[key].description,
          scope:parseRes[key].scope.toUpperCase(),
          status:parseRes[key].status
        };
        index++;
      }
    }
    return DynamicObjectsDataset;
  }
}
