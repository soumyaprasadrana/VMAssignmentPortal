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
