// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
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
  listPromise:any;
  constructor(private _client: NodeclientService) {
    this.listPromise = this.getListNamesFromNode();
  }
  getSpaList() {
    return this.getSPADataFromNode();
  }
  getListsNames(){
    return this.listPromise;
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
  getListNamesFromNode(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/public/lists', httpOptions);
    return promise;
  }
  getListItems(name:string,item:any): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/public/lists/'+name, httpOptions);
    var tempP=new Promise((resolve,reject)=>{
      promise.then((res:any)=>{
        var result:any={};
        result.res=res;
        result.item=item;
        resolve(result);
      }).catch((err:any)=>{
        var result:any={};
        result.err=err;
        result.item=item;
        reject(result)
      })
    })
    return tempP;
  }
}
