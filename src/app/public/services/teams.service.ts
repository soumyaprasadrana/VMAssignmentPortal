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
  constructor(private _props: UIPropService) {
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
}
