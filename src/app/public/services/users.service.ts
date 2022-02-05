import { Injectable } from '@angular/core';
import { User } from '../DataModel/user';
import { Observable, of } from 'rxjs';
import { NodeclientService } from './nodeclient.service';
import { HttpHeaders } from '@angular/common/http';
import { Team } from '../DataModel/team';

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
  }
  getUsers() {
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): User[] {
        var result = JSON.parse(res);

        var id = 1;
        var returnObject: User[] = [];
        for (var user in result) {
          returnObject.push({
            id: id,
            user_name: user,
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
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  getTeamStats() {
    const promisey = new Promise((resolve, reject) => {
      this.promiseTeamStats
        .then((res: any) => {
          //console.log('Users Service:-: Team Stats=>', res);
          resolve(res);
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  getTeamLeads() {
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): User[] {
        var result = JSON.parse(res);

        var id = 1;
        var returnObject: User[] = [];
        for (var user in result) {
          returnObject.push({
            id: id,
            user_name: user,
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
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  getNormalUsers() {
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): User[] {
        var result = JSON.parse(res);

        var id = 1;
        var returnObject: User[] = [];
        for (var user in result) {
          returnObject.push({
            id: id,
            user_name: user,
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
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          //console.log(error);
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
