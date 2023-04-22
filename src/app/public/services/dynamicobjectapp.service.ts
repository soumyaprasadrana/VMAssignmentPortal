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
import { DynamicObject } from "../DataModel/dynamicobject";
@Injectable({
  providedIn: "root",
})
export /* VM Management System Services it will include all vm related services */
class DynamicObjectAppService {
  constructor(private _client: NodeclientService) {}
  checkFormEnabled(app: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      "api/dynamicobjects/" + app + "/formenabled",
      httpOptions
    );
    return promise;
  }
  getDynamicObjectAppRecords(app: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      "api/dynamicobjects/" + app + "/getAll",
      httpOptions
    );
    return promise;
  }

  addDynamicObjectAppRecord(app: any, dataContext: any) {
    const promise = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        "Content-Type": "application/json",
      });

      var httpOptions = {
        headers: headers,
      };
      var metaDataTobeSent: any = {};
      var attributeList: [] = [];
      this.getDynamicObjectAppAttributes(app).then((res: any) => {
        res = JSON.parse(res);
        if (res.status) {
          attributeList = this.filterAttributes(res.data);
          attributeList.forEach((item: any) => {
            metaDataTobeSent[item.name.value] = item.type.value;
          });
          var reqBodyToBeSent: any = {
            form: dataContext,
            metadata: metaDataTobeSent,
          };
          var _promise = this._client.post(
            "api/dynamicobjects/" + app + "/add",
            reqBodyToBeSent,
            httpOptions
          );
          resolve(_promise);
        } else {
          resolve(null);
        }
      });
    });
    return promise;
  }

  updateDynamicObjectAppRecord(app: any, dataContext: any) {
    const promise = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        "Content-Type": "application/json",
      });

      var httpOptions = {
        headers: headers,
      };
      var metaDataTobeSent: any = {};
      var attributeList: [] = [];
      this.getDynamicObjectAppAttributes(app).then((res: any) => {
        res = JSON.parse(res);
        if (res.status) {
          attributeList = this.filterAttributes(res.data);
          attributeList.forEach((item: any) => {
            metaDataTobeSent[item.name.value] = item.type.value;
          });
          var reqBodyToBeSent: any = {
            form: dataContext,
            metadata: metaDataTobeSent,
          };
          var _promise = this._client.post(
            "api/dynamicobjects/" + app + "/update",
            reqBodyToBeSent,
            httpOptions
          );
          resolve(_promise);
        } else {
          resolve(null);
        }
      });
    });
    return promise;
  }

  filterAttributes(list: any): any {
    var newList = [];
    for (var item in list) {
      if (list[item].type.value != "autokey") newList.push(list[item]);
    }
    return newList;
  }
  deleteDynamicObjectAppRecord(app: any, dataContext: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.post(
      "api/dynamicobjects/" + app + "/delete",
      dataContext,
      httpOptions
    );
    return promise;
  }
  getDynamicObjectAppAttributes(app: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      "api/dynamicobjects/" + app + "/attributes",
      httpOptions
    );
    return promise;
  }
  getDynamicObjectAppFunctions(app: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get(
      "api/dynamicobjects/" + app + "/functions",
      httpOptions
    );
    return promise;
  }
}
