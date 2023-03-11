// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc VM Services
 */
import { Injectable } from "@angular/core";
import { VM } from "../DataModel/vm";
import { Observable, Subject, Subscription } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { NodeclientService } from "./nodeclient.service";
@Injectable({
  providedIn: "root",
})
export /* VM Management System Services it will include all vm related services */
class VmsService {
  vms: Array<any> = [];
  promiseX: any;
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
  constructor(private _client: NodeclientService) {
    this.observable = this.getVMSObservable();
    this.promiseX = this.getDataFromNode();
    this.setNeedRefresh(false);
    this.subscription = this.getNeedRefreshState().subscribe((value) => {
      if (value) {
        //console.log('Spinner state:' + value.value);
        this.needReload = value.value;
      } else {
      }
    });
  }
  getVms2(): Observable<any> {
    return this.observable;
  }
  getVms(): any {
    console.log("getVMs() :: this.needReload ::", this.needReload);

    const promise = new Promise((resolve, reject) => {
      resolve(
        this.parseData(
          '{"22":{"owner":"","hostname":"labvm16829","ver":"Server 2012 R2","os":"Windows","ip":"192.168.0.29","comment":"","team":"FreePool","vm_owner_lab":"","status":"true","group":"Freepool","snap_count":0,"ram":16},"23":{"owner":"","hostname":"labvm16803","ver":"Server 2019","os":"Windows","ip":"192.168.0.3","comment":"JIRA Dev Env","team":"DEV","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"24":{"owner":"","hostname":"labvm16830","ver":"RHEL 7.2","os":"Linux","ip":"192.168.0.30","comment":"","team":"FreePool","vm_owner_lab":"","status":"true","group":"Freepool","snap_count":0,"ram":16},"25":{"owner":"","hostname":"labvm16831","ver":"RHEL 8","os":"Linux","ip":"192.168.0.31","comment":"","team":"FreePool","vm_owner_lab":"","status":"true","group":"Freepool","snap_count":0,"ram":32},"26":{"owner":"","hostname":"labvm16804","ver":"Server 2012 R2","os":"Windows","ip":"192.168.0.4","comment":"JIRA Test Env","team":"DEV","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"27":{"owner":"","hostname":"labvm16805","ver":"RHEL 7.2","os":"Linux","ip":"192.168.0.5","comment":"JIRA PROD Cluster Member -1","team":"DEV","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":16},"28":{"owner":"","hostname":"labvm16806","ver":"RHEL 8","os":"Linux","ip":"192.168.0.6","comment":"JIRA PROD Cluster Member -2","team":"DEV","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":32},"29":{"owner":"","hostname":"labvm16807","ver":"10","os":"Windows","ip":"192.168.0.7","comment":"JIRA Database","team":"DevOps","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"30":{"owner":"","hostname":"labvm16808","ver":"Server 2016","os":"Windows","ip":"192.168.0.8","comment":"JIRA- Application Server","team":"DevOps","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"31":{"owner":"","hostname":"labvm16809","ver":"Server 2019","os":"Windows","ip":"192.168.0.9","comment":"JIRA Dev Env","team":"DevOps","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"10":{"owner":"","hostname":"labvm16818","ver":"RHEL 8","os":"Linux","ip":"192.168.0.18","comment":"JIRA PROD Cluster Member -2","team":"QA","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":32},"11":{"owner":"","hostname":"labvm16819","ver":"10","os":"Windows","ip":"192.168.0.19","comment":"JIRA Database","team":"Support","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"12":{"owner":"","hostname":"labvm16802","ver":"Server 2016","os":"Windows","ip":"192.168.0.2","comment":"JIRA- Application Server","team":"DEV","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"13":{"owner":"","hostname":"labvm16820","ver":"Server 2016","os":"Windows","ip":"192.168.0.20","comment":"JIRA- Application Server","team":"Support","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"14":{"owner":"","hostname":"labvm16821","ver":"Server 2019","os":"Windows","ip":"192.168.0.21","comment":"JIRA Dev Env","team":"Support","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"15":{"owner":"","hostname":"labvm16822","ver":"Server 2012 R2","os":"Windows","ip":"192.168.0.22","comment":"JIRA Test Env","team":"Support","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"16":{"owner":"","hostname":"labvm16823","ver":"RHEL 7.2","os":"Linux","ip":"192.168.0.23","comment":"JIRA PROD Cluster Member -1","team":"Support","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":16},"17":{"owner":"","hostname":"labvm16824","ver":"RHEL 8","os":"Linux","ip":"192.168.0.24","comment":"JIRA PROD Cluster Member -2","team":"Support","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":32},"18":{"owner":"","hostname":"labvm16825","ver":"RHEL 8","os":"Linux","ip":"192.168.0.25","comment":"","team":"FreePool","vm_owner_lab":"","status":"true","group":"Freepool","snap_count":0,"ram":32},"19":{"owner":"","hostname":"labvm16826","ver":"10","os":"Windows","ip":"192.168.0.26","comment":"","team":"FreePool","vm_owner_lab":"","status":"true","group":"Freepool","snap_count":0,"ram":16},"1":{"owner":"","hostname":"labvm16801","ver":"10","os":"Windows","ip":"192.168.0.1","comment":"JIRA Database","team":"DEV","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"2":{"owner":"","hostname":"labvm16810","ver":"Server 2012 R2","os":"Windows","ip":"192.168.0.10","comment":"JIRA Test Env","team":"DevOps","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"3":{"owner":"","hostname":"labvm16811","ver":"RHEL 7.2","os":"Linux","ip":"192.168.0.11","comment":"JIRA PROD Cluster Member -1","team":"DevOps","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":16},"4":{"owner":"","hostname":"labvm16812","ver":"RHEL 8","os":"Linux","ip":"192.168.0.12","comment":"JIRA PROD Cluster Member -2","team":"DevOps","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":32},"5":{"owner":"","hostname":"labvm16813","ver":"10","os":"Windows","ip":"192.168.0.13","comment":"JIRA Database","team":"QA","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"6":{"owner":"","hostname":"labvm16814","ver":"Server 2016","os":"Windows","ip":"192.168.0.14","comment":"JIRA- Application Server","team":"QA","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"7":{"owner":"","hostname":"labvm16815","ver":"Server 2019","os":"Windows","ip":"192.168.0.15","comment":"JIRA Dev Env","team":"QA","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"8":{"owner":"","hostname":"labvm16816","ver":"Server 2012 R2","os":"Windows","ip":"192.168.0.16","comment":"JIRA Test Env","team":"QA","vm_owner_lab":"","status":"true","group":"JIRA","snap_count":0,"ram":16},"9":{"owner":"","hostname":"labvm16817","ver":"RHEL 7.2","os":"Linux","ip":"192.168.0.17","comment":"JIRA PROD Cluster Member -1","team":"QA","vm_owner_lab":"","status":"true","group":"JIRA-PROD","snap_count":0,"ram":16},"20":{"owner":"","hostname":"labvm16827","ver":"Server 2016","os":"Windows","ip":"192.168.0.27","comment":"","team":"FreePool","vm_owner_lab":"","status":"true","group":"Freepool","snap_count":0,"ram":16},"21":{"owner":"","hostname":"labvm16828","ver":"Server 2019","os":"Windows","ip":"192.168.0.28","comment":"","team":"FreePool","vm_owner_lab":"","status":"true","group":"Freepool","snap_count":0,"ram":16}}'
        )
      );
    });
    return promise;
  }
  getDataFromNode(): any {
    var promise = new Promise(function(resolve, reject) {
      resolve("OK");
    });
    return promise;
  }
  assignVM(ip: string, user: string): any {
    return new Promise((resolve, reject) => {
      resolve('{"status":"Success"}');
    });
  }
  addComment(ip: string, Comment: string): any {
    return new Promise((resolve, reject) => {
      resolve('{"status":"Success"}');
    });
  }
  assignMultipleVMS(ipList: any, user: string): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    var httpOptions = {
      headers: headers,
    };
    var data: any = { ipList: ipList, vm_user: user };
    return this._client.post("api/vm/assignMultipleVMS", data, httpOptions);
  }
  releaseMultipleVMS(ipList: any): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    var httpOptions = {
      headers: headers,
    };
    var data: any = { ipList: ipList };
    return this._client.post("api/vm/releaseMultipleVMS", data, httpOptions);
  }

  releaseVM(ip: string): any {
    return new Promise((resolve, reject) => {
      resolve('{"status":"Success"}');
    });
  }

  getVMSObservable(): any {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    var observable = this._client.getObservable("api/vm/getAll", httpOptions);
    return observable;
  }
  getVMAdditionalData(ip: string) {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.get("api/vm/" + ip + "/additionalData", httpOptions);
  }
  deleteVM(ip: string) {
    return new Promise((resolve, reject) => {
      resolve('{"status":"Success"}');
    });
  }
  updateVMAdditionaalData(ip: string, data: any) {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.post(
      "api/vm/" + ip + "/additionalData",
      data,
      httpOptions
    );
  }

  parseData(res: any) {
    const vmDataset: VM[] = [];
    var parseRes = JSON.parse(res);
    var index = 0;
    for (var key in parseRes) {
      if (key != "user" && key != "protocols") {
        vmDataset[index] = {
          id: index,
          ip: parseRes[key].ip,
          hostname: parseRes[key].hostname,
          os: parseRes[key].os,
          ver: parseRes[key].ver,
          group: parseRes[key].group,
          snap_count: parseRes[key].snap_count,
          ram: parseRes[key].ram,
          status: parseRes[key].status,
          owner: parseRes[key].owner,
          comment: parseRes[key].comment,
          vm_owner_lab: parseRes[key].vm_owner_lab,
          team: parseRes[key].team,
          cssClass: "",
          global: "",
        };
        if (
          vmDataset[index].snap_count >= 5 &&
          vmDataset[index].snap_count <= 8
        ) {
          vmDataset[index].cssClass = "warnSnap";
        } else if (vmDataset[index].snap_count > 8) {
          vmDataset[index].cssClass = "alertSnap";
        }
        if (vmDataset[index].status == "true") {
          vmDataset[index].status = "Available";
        } else {
          vmDataset[index].status = "Occupied";
        }
        /*vmDataset[index].global =
          vmDataset[index].ip +
          ' ' +
          vmDataset[index].hostname +
          ' ' +
          vmDataset[index].owner +
          ' ' +
          vmDataset[index].ram +
          ' ' +
          vmDataset[index].snap_count +
          ' ' +
          vmDataset[index].os +
          ' ' +
          vmDataset[index].ver +
          ' ' +
          vmDataset[index].group +
          ' ' +
          vmDataset[index].status +
          ' ' +
          vmDataset[index].owner;*/
        index++;
      }
    }
    return vmDataset;
  }
  restartSnapshotService(): any {
    return new Promise(() => {});
  }
  runUpdateExtradata(): any {
    return new Promise(() => {});
  }
  runUpdateSnapshotCount(): any {
    return new Promise(() => {});
  }
  getRelatedVMSData(ip: any): any {
    return new Promise(() => {});
  }
  searchSnapshots(ip: any): any {
    return new Promise(() => {});
  }
  getVMSnapshots(hostname: any): any {
    return new Promise(() => {});
  }
  getAllSnapshots(): any {
    return new Promise(() => {});
  }
  getAllSnapshotsCount(): any {
    return new Promise(() => {});
  }
  revertSnap(hostname: any, name: any, snapid: any): any {
    return new Promise(() => {});
  }
  takeSnap(hostname: any, snapname: any, desc: any): any {
    return new Promise(() => {});
  }
  updateRelatedVMSData(ip: any, data: any): any {
    return new Promise(() => {});
  }
}
