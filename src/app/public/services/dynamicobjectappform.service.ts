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
import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { NodeclientService } from "./nodeclient.service";
import { Team } from "../DataModel/team";
import { User } from "../DataModel/user";
import { MatDialog } from "@angular/material/dialog";
@Injectable({
  providedIn: "root",
})
export /* VM Management System Services it will include all vm related services */
class DynamicObjectAppFormService {
  constructor(private _client: NodeclientService) {}

  getDynamicObjectAppAttributes(app: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      "api/dynamicobjectform/getAttributes/" + app,
      httpOptions
    );
    return promise;
  }
  getTeams() {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      "api/dynamicobjectform/getTeamList/",
      httpOptions
    );

    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): Team[] {
        var result = JSON.parse(res);
        var teamList = result.teamList.split(":");
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

      promise
        .then((res: any) => {
          ////console.log('TeamServices=>', res);
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  getUsers() {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };

    var promise = this._client.get(
      "api/dynamicobjectform/getUsers",
      httpOptions
    );

    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): User[] {
        var result = JSON.parse(res);

        var id = 1;
        var returnObject: User[] = [];
        for (var user in result) {
          returnObject.push({
            id: id,
            user_name: result[user] + " (" + user + ") ",
            user_id: user,
          });
          id++;
        }
        ////console.log('returnObject=>', returnObject);
        return returnObject;
      }

      promise
        .then((res: any) => {
          resolve(parseResult(res));
        })
        .catch((error: any) => {
          //console.log(error);
          reject(error);
        });
    });
    return promisey;
  }
  getListItems(name: string, item: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      "api/dynamicobjectform/lists/" + name,
      httpOptions
    );
    var tempP = new Promise((resolve, reject) => {
      promise
        .then((res: any) => {
          var result: any = {};
          result.res = res;
          result.item = item;
          resolve(result);
        })
        .catch((err: any) => {
          var result: any = {};
          result.err = err;
          result.item = item;
          reject(result);
        });
    });
    return tempP;
  }
}
