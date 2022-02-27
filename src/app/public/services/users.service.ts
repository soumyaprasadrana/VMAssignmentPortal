// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
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
      resolve(
        parseResult(
          '{"support_tl":"Support TL","devops_tl":"Devops TL","qa_tl":"QA TL","dev_tl":"Dev Team Lead","dev_user1":"Dev User1","admin":"Administrator","dev_user2":"DEV USER2","support_user1":"SUPPORT USER1","qa_user1":"QA USER1","support_user2":"SUPPORT USER2","devops_user1":"DEVOPS USER1","qa_user2":"QA USER2","devops_user2":"DEVOPS USER2"}'
        )
      );
    });
    return promisey;
  }
  getTeamStats() {
    const promisey = new Promise((resolve, reject) => {
      resolve(
        '[{"update_user":"1","user_id":"support_tl","delete_vm":"1","user_name":"Support TL","is_teamLead":"1","create_user":"1","user_team":"Support","delete_user":"1"},{"update_user":"1","user_id":"devops_tl","delete_vm":"1","user_name":"Devops TL","is_teamLead":"1","create_user":"1","user_team":"DevOps","delete_user":"1"},{"update_user":"1","user_id":"qa_tl","delete_vm":"1","user_name":"QA TL","is_teamLead":"1","create_user":"1","user_team":"QA","delete_user":"1"},{"update_user":"1","user_id":"dev_tl","delete_vm":"1","user_name":"Dev Team Lead","is_teamLead":"1","create_user":"1","user_team":"DEV","delete_user":"1"},{"update_user":"0","user_id":"dev_user1","delete_vm":"0","user_name":"Dev User1","is_teamLead":"0","create_user":"0","user_team":"DEV","delete_user":"0"},{"update_user":"0","user_id":"dev_user2","delete_vm":"1","user_name":"DEV USER2","is_teamLead":"0","create_user":"0","user_team":"DEV","delete_user":"1"},{"update_user":"0","user_id":"support_user1","delete_vm":"0","user_name":"SUPPORT USER1","is_teamLead":"0","create_user":"0","user_team":"Support","delete_user":"1"},{"update_user":"1","user_id":"qa_user1","delete_vm":"0","user_name":"QA USER1","is_teamLead":"0","create_user":"1","user_team":"QA","delete_user":"0"},{"update_user":"1","user_id":"support_user2","delete_vm":"0","user_name":"SUPPORT USER2","is_teamLead":"0","create_user":"0","user_team":"Support","delete_user":"0"},{"update_user":"1","user_id":"devops_user1","delete_vm":"1","user_name":"DEVOPS USER1","is_teamLead":"0","create_user":"0","user_team":"DevOps","delete_user":"0"},{"update_user":"0","user_id":"qa_user2","delete_vm":"0","user_name":"QA USER2","is_teamLead":"0","create_user":"1","user_team":"QA","delete_user":"1"},{"update_user":"0","user_id":"devops_user2","delete_vm":"1","user_name":"DEVOPS USER2","is_teamLead":"0","create_user":"1","user_team":"DevOps","delete_user":"0"}]'
      );
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
      resolve(
        parseResult(
          '{"support_tl":"Support TL","devops_tl":"Devops TL","qa_tl":"QA TL","dev_tl":"Dev Team Lead"}'
        )
      );
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
      resolve(
        parseResult(
          '{"support_user1":"SUPPORT USER1","qa_user1":"QA USER1","support_user2":"SUPPORT USER2","dev_user1":"Dev User1","dev_user2":"DEV USER2","devops_user1":"DEVOPS USER1","qa_user2":"QA USER2","devops_user2":"DEVOPS USER2"}'
        )
      );
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
