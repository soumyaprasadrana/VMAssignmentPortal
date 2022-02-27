// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Auth Services Service
 */
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NodeclientService } from './nodeclient.service';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private _client: NodeclientService, private router: Router) {}

  login(username: string, password: string) {
    const promise = new Promise<{ status: boolean; message: string }>(
      (resolve, reject) => {
        var result = { status: false, message: '' };

        var headers = new HttpHeaders({
          Authorization: 'Basic ' + btoa(username + ':' + password),
          'Content-Type': 'application/json',
        });

        var httpOptions = {
          headers: headers,
        };

        var promise = this._client.post('api/login', null, httpOptions);
        promise
          .then(function (res: any) {
            //console.log('authservice- login - then ' + JSON.stringify(res));
            if (res.status) {
              result.status = true;
            } else {
              result.status = false;
              result.message = res.message;
            }
            resolve(result);
          })
          .catch(function (err) {
            //console.log('authservice- login - catch ' + JSON.stringify(err));
            result.status = false;
            result.message = err.error.message;
            reject(result);
          });
      }
    );
    return promise;
  }

  checkSession() {
    const promise = new Promise<{ status: boolean; message: string }>(
      (resolve, reject) => {
        var result = { status: true, message: '' };
        resolve(result);
      }
    );
    return promise;
  }
  checkAuth() {
    const promise = new Promise<{ status: boolean; message: string }>(
      (resolve, reject) => {
        var result = { status: true, message: '' };
        resolve(result);
      }
    );
    return promise;
  }
  ensureAuth() {
    var promise = this.checkAuth();
    promise
      .then((result) => {
        if (!result.status) {
          this.router.navigate(['/portal/login']).then(() => {
            //alert('Going to reload');
            window.location.reload();
          });
        }
      })
      .catch((result) => {
        //Handle error case
        this.router.navigate(['/portal/login']).then(() => {
          // alert('Going to reload');
          window.location.reload();
        });
      });
  }
  signOut() {
    const promise = new Promise<{ status: boolean; message: string }>(
      (resolve, reject) => {
        var result = { status: true, message: '' };
        resolve(result);
      }
    );
    return promise;
  }
  getUser() {
    console.log('Get User Called');
    var data;
    var temp = {
      activeUser: {
        name: 'admin',
        permissions: {
          linux_toolbox: '1',
          add_vm: '1',
          db2_toolbox: '1',
          assign_vm: '1',
          user_team: 'ADMIN',
          is_admin: '1',
          update_user: '1',
          user_id: 'admin',
          delete_vm: '1',
          delete_snapshot: '1',
          is_teamLead: '0',
          add_snapshot: '1',
          create_user: '1',
          update_vm: '1',
          delete_user: '1',
          release_vm: '1',
        },
      },
    };

    return this.parsePermission(temp.activeUser);
  }
  parsePermission(user: any) {
    //console.log('Inside parsePermission');
    var permission = user.permissions;
    //console.log('permissions::', permission);
    Object.keys(permission).forEach((e) => {
      //console.log(`key=${e}  value=${permission[e]}`);
      if (permission[e] == '0' || permission[e] == 0) {
        permission[e] = false;
      } else if (permission[e] == '1' || permission[e] == 1) {
        permission[e] = true;
      }
    });
    user.permissions = permission;
    //console.log('user.permissions::', permission);
    return user;
  }
  changePassword(data: any) {
    return new Promise((resolve, reject) => {
      resolve('{"status":"Success"}');
    });
  }

  /**
   * get cookie
   * @param {string} name
   * @returns {string}
   */
  public getCookie(name: string) {
    const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
