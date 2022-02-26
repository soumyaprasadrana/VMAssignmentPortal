// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Teams Service
 */
import { Injectable } from '@angular/core';
import { Team } from '../DataModel/team';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { NodeclientService } from './nodeclient.service';
import { HttpHeaders } from '@angular/common/http';
import { UIPropService } from './properties.services';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class TeamService {
  teams: Array<Team> = [];
  promise: any;
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
  constructor(
    private _props: UIPropService,
    private _client: NodeclientService
  ) {
    this.promise = this._props.getDataFromNode();
    this.setNeedRefresh(false);
    this.subscription = this.getNeedRefreshState().subscribe((value) => {
      if (value) {
        //console.log('Spinner state:' + value.value);
        this.needReload = value.value;
      } else {
      }
    });
  }
  getTeams() {
    if (this.needReload) {
      this._props.setNeedRefresh(true);
      this.promise = this._props.getDataFromNode();
    }
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): Team[] {
        var result = JSON.parse(res);
        var teamList = result.teamList.split(':');
        var id = 1;
        var returnObject: Team[] = [];
        for (var i = 0; i < teamList.length; i++) {
          returnObject.push({
            id: id,
            team_name: teamList[i],
            team_desc: teamList[i],
          });
          id++;
        }
        ////console.log('returnObject=>', returnObject);
        return returnObject;
      }

      this.promise
        .then((res: any) => {
          ////console.log('TeamServices=>', res);
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
  getTeam(team: string) {
    const promisey = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      this._client
        .get('api/admin/getTeam/' + team, httpOptions)
        .then((res: any) => {
          //console.log('Teams Service:getTeam=>', res);
          resolve(res);
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  deleteTeam(team: any) {
    const promisey = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      this._client
        .post('api/admin/team/delete/' + team, null, httpOptions)
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
}
