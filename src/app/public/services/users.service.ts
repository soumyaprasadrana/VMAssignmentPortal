// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc User Services
 */
import { Injectable } from '@angular/core';
import { User } from '../DataModel/user';
import { Observable, Subject, Subscription } from 'rxjs';
import { NodeclientService } from './nodeclient.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class UserService {
  users: Array<any> = [];
  promise: any;
  promiseTL: any;
  promiseNU: any;
  promiseTeamStats: any;
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
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    this.promise = _client.get('api/public/getUsers', httpOptions);
    this.promiseTL = _client.get('api/admin/getTeamLeads', httpOptions);
    this.promiseNU = _client.get('api/public/getNormalUsers', httpOptions);
    this.promiseTeamStats = _client.get('api/admin/teamStats', httpOptions);
    this.setNeedRefresh(false);
    this.subscription = this.getNeedRefreshState().subscribe((value) => {
      if (value) {
        //console.log('Spinner state:' + value.value);
        this.needReload = value.value;
      } else {
      }
    });
  }
  getUsers() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    if (this.needReload) {
      this.promise = this._client.get('api/public/getUsers', httpOptions);
    }
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): User[] {
        var result = JSON.parse(res);

        var id = 1;
        var returnObject: User[] = [];
        for (var user in result) {
          returnObject.push({
            id: id,
            user_name: result[user]+' ('+user+') ',
            user_id: user,
          });
          id++;
        }
        ////console.log('returnObject=>', returnObject);
        return returnObject;
      }

      this.promise
        .then((res: any) => {
          //console.log('Users Service=>', res);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  getTeamStats() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    
      this.promiseTeamStats = this._client.get(
        'api/admin/teamStats',
        httpOptions
      );
    
    const promisey = new Promise((resolve, reject) => {
      this.promiseTeamStats
        .then((res: any) => {
          //console.log('Users Service:-: Team Stats=>', res);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          resolve(res);
        })
        .catch((error: any) => {
          //console.log(error);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          reject(error);
        });
    });
    return promisey;
  }
  getTeamLeads() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    if (this.needReload) {
      this.promiseTL = this._client.get('api/admin/getTeamLeads', httpOptions);
    }
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): User[] {
        var result = JSON.parse(res);

        var id = 1;
        var returnObject: User[] = [];
        for (var user in result) {
          returnObject.push({
            id: id,
            user_name: result[user]+' ('+user+') ',
            user_id: user,
          });
          id++;
        }
        ////console.log('returnObject=>', returnObject);
        return returnObject;
      }

      this.promiseTL
        .then((res: any) => {
          //console.log('Users Service=>', res);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          //console.log(error);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          reject(error);
        });
    });
    return promisey;
  }
  getNormalUsers() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    if (this.needReload) {
      this.promiseNU = this._client.get(
        'api/public/getNormalUsers',
        httpOptions
      );
    }
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): User[] {
        var result = JSON.parse(res);

        var id = 1;
        var returnObject: User[] = [];
        for (var user in result) {
          returnObject.push({
            id: id,
            user_name: result[user]+' ('+user+') ',
            user_id: user,
          });
          id++;
        }
        ////console.log('returnObject=>', returnObject);
        return returnObject;
      }

      this.promiseNU
        .then((res: any) => {
          //console.log('Users Service=>', res);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          //console.log(error);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          reject(error);
        });
    });
    return promisey;
  }
  promoteUser(user: any) {
    const promisey = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      this._client
        .post('api/admin/promoteUser/' + user, null, httpOptions)
        .then((res: any) => {
          //console.log('Users Service:delete=>', res);
          resolve(res);
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  deleteUser(user: any) {
    const promisey = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      this._client
        .post('api/user/delete/' + user, null, httpOptions)
        .then((res: any) => {
          //console.log('Users Service:delete=>', res);
          resolve(res);
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  getUser(user: string) {
    const promisey = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      this._client
        .get('api/user/getUser/' + user, httpOptions)
        .then((res: any) => {
          //console.log('Users Service:getUser=>', res);
          resolve(res);
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  mockData(count: number): Array<any> {
    // mock a dataset
    const mockDataset: User[] = [];
    for (let i = 0; i < count; i++) {
      mockDataset[i] = {
        id: i,
        user_id: 'user' + i,
        user_name: 'username' + i,
      };
    }

    return mockDataset;
  }
}
