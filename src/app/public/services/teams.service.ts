import { Injectable } from '@angular/core';
import { Team } from '../DataModel/team';
import { Observable, of } from 'rxjs';
import { NodeclientService } from './nodeclient.service';
import { HttpHeaders } from '@angular/common/http';
import { UIPropService } from './properties.services';
import { async } from '@angular/core/testing';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class TeamService {
  teams: Array<Team> = [];
  promise: any;
  constructor(
    private _props: UIPropService,
    private _client: NodeclientService
  ) {
    this.promise = this._props.getDataFromNode();
  }
  getTeams() {
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
        //console.log('returnObject=>', returnObject);
        return returnObject;
      }

      this.promise
        .then((res: any) => {
          //console.log('TeamServices=>', res);
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          console.log(error);
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
          console.log('Teams Service:getTeam=>', res);
          resolve(res);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
}
