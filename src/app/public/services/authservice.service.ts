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
        var result = { status: false, message: '' };
        var headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        var httpOptions = {
          headers: headers,
        };
        var promise = this._client.post('api/checkSession', null, httpOptions);
        promise
          .then(function (res: any) {
            //console.log(
            //  'authservice- checkSession - then(resolve) ' + JSON.stringify(res)
            //  );
            if (res.status) {
              result.status = true;
            } else {
              result.status = false;
              result.message = res.message;
            }
            resolve(result);
          })
          .catch((res: any) => {
            console.log(
              'authservice- checkSession - catch(reject) ' + JSON.stringify(res)
            );
            result.status = false;
            //result.message = res.error.message ? res.error.message : '';
            reject(result);
          });
      }
    );
    return promise;
  }
  checkAuth() {
    const promise = new Promise<{ status: boolean; message: string }>(
      (resolve, reject) => {
        var result = { status: false, message: '' };
        var headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        var httpOptions = {
          headers: headers,
        };
        var promise = this._client.post('api/checkAuth', null, httpOptions);
        promise
          .then(function (res: any) {
            //console.log(
            //   'authservice- checkAuth - then(resolve) ' + JSON.stringify(res)
            // );
            if (res.status) {
              result.status = true;
            } else {
              result.status = false;
              result.message = res.message;
            }
            resolve(result);
          })
          .catch(function (res) {
            //console.log(
            //  'authservice- checkAuth - catch(reject) ' + JSON.stringify(res)
            // );
            result.status = false;
            result.message = res.error.message || '';
            reject(result);
          });
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
        var result = { status: false, message: '' };
        var headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        var httpOptions = {
          headers: headers,
        };
        var promise = this._client.post('api/logout', null, httpOptions);
        promise
          .then(function (res: any) {
            //console.log(
            //    'authservice- logout - then(resolve) ' + JSON.stringify(res)
            // );
            if (res.status) {
              result.status = true;
              window.location.reload();
            } else {
              result.status = false;
            }
            resolve(result);
          })
          .catch(function (res) {
            //console.log(
            // 'authservice- logout - catch(reject) ' + JSON.stringify(res)
            // );
            result.status = false;
            result.message = res.error.message || '';
            reject(result);
          });
      }
    );
    return promise;
  }
  getUser() {
    //console.log('Get User Called');
    var data;
    try {
      data = this.parsePermission(JSON.parse(this.getCookie('activeUser')));
    } catch (e) {
      data = {};
    }
    return data;
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
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.post('api/user/changePassword', data, httpOptions);
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
