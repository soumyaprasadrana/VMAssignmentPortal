// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc VM Services
 */
import { Injectable } from '@angular/core';
import { VM } from '../DataModel/vm';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NodeclientService } from './nodeclient.service';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class VmsService {
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
  reset(){
    this.observable = null;
    this.promiseX = null;
    this.observable = this.getVMSObservable();
    this.promiseX = this.getDataFromNode();
  }
  getVms2(): Observable<any> {
    return this.observable;
  }
  getVms(): any {
    console.log('getVMs() :: this.needReload ::', this.needReload);
    if (this.needReload) {
      this.promiseX = this.getDataFromNode();
    }
    const promise = new Promise((resolve, reject) => {
      this.promiseX
        .then((res: any) => {
          //console.log('getVms() ', res);
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          resolve(this.parseData(res));
        })
        .catch((err: any) => {
          if (this.needReload) {
            this.setNeedRefresh(false);
          }
          reject(err);
        });
    });
    return promise;
  }
  getDataFromNode(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promise = this._client.get('api/vm/getAll', httpOptions);
    return promise;
  }
  assignVM(ip: string, user: string): any {
    //console.log('assignVM:ip>', ip, 'assignVM:user>', user);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var params: any = { ip: ip, user: user };

    //console.log('assignVM:', params);
    var httpOptions = {
      headers: headers,
    };
    return this._client.post('api/vm/assignVM', params, httpOptions);
  }
  takeSnap(hostname:any,snapName:any,snapDesc:any){
    //console.log('takesnap);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var params: any = { hostname: hostname, snapName: snapName,snapDesc:snapDesc };

    
    var httpOptions = {
      headers: headers,
    };
    return this._client.post('api/vm/takeSnap', params, httpOptions);
  }
  revertSnap(hostname:any,snapName:any,snapID:any){
    //console.log('takesnap);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var params: any = { hostname: hostname, snapName: snapName,snapID:snapID };

    
    var httpOptions = {
      headers: headers,
    };
    return this._client.post('api/vm/revertSnap', params, httpOptions);
  }
  addComment(ip: string, Comment: string): any {
    //console.log('assignVM:ip>', ip, 'assignVM:user>', user);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var params: any = { comment: Comment };

    //console.log('assignVM:', params);
    var httpOptions = {
      headers: headers,
    };
    return this._client.post(
      'api/vm/' + ip + '/comment/add',
      params,
      httpOptions
    );
  }
  assignMultipleVMS(ipList: any, user: string): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    var httpOptions = {
      headers: headers,
    };
    var data: any = { ipList: ipList, vm_user: user };
    return this._client.post('api/vm/assignMultipleVMS', data, httpOptions);
  }
  releaseMultipleVMS(ipList: any): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    var httpOptions = {
      headers: headers,
    };
    var data: any = { ipList: ipList };
    return this._client.post('api/vm/releaseMultipleVMS', data, httpOptions);
  }

  releaseVM(ip: string): any {
    //console.log('releaseVM:ip>', ip);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var params: any = { ip: ip };

    //console.log('releaseVM:', params);
    var httpOptions = {
      headers: headers,
    };
    return this._client.post('api/vm/releaseVM', params, httpOptions);
  }
  runUpdateSnapshotCount(): any {
    //console.log('releaseVM:ip>', ip);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var params: any = {  };

    //console.log('releaseVM:', params);
    var httpOptions = {
      headers: headers,
    };
    return this._client.post('api/admin/run/snapcount', params, httpOptions);
  }
  runUpdateExtradata(): any {
    //console.log('releaseVM:ip>', ip);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var params: any = {  };

    //console.log('releaseVM:', params);
    var httpOptions = {
      headers: headers,
    };
    return this._client.post('api/admin/run/extradata', params, httpOptions);
  }
  getVMSObservable(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var observable = this._client.getObservable('api/vm/getAll', httpOptions);
    return observable;
  }
  getVMSnapshots(hostname: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.get('api/vm/snapshots/' + hostname , httpOptions);
  }
  getAllSnapshots() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promisex=this._client.get('api/vm/get/snapshots'  , httpOptions);
    var resPromise=new Promise((resolve,reject)=>{
      promisex.then((res:any)=>{
        try{
          
          res=JSON.parse(res);
        }catch(e){}
        if(typeof res.status=='undefined')
            resolve(this.parseSnapshotsData(res));
        else
          reject(res);
      }).catch((err)=>{
        reject(err);
      }
      );
    })
    return resPromise;
  }
  getAllSnapshotsCount() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promisex=this._client.get('api/vm/get/snapshotscount'  , httpOptions);
    var resPromise=new Promise((resolve,reject)=>{
      promisex.then((res:any)=>{
        try{
          
          res=JSON.parse(res);
        }catch(e){}
        if(typeof res.status=='undefined')
            resolve(this.parseSnapshotsCountData(res));
        else
          reject(res);
      }).catch((err)=>{
        reject(err);
      }
      );
    })
    return resPromise;
  }
  searchSnapshots(keyword:any) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var promisex=this._client.get('api/vm/get/snapshots/'+keyword  , httpOptions);
    var resPromise=new Promise((resolve,reject)=>{
      promisex.then((res:any)=>{
        try{
          
          res=JSON.parse(res);
        }catch(e){}
        if(typeof res.status=='undefined')
            resolve(this.parseSnapshotsData(res));
        else
          reject(res);
      }).catch((err)=>{
        reject(err);
      }
      );
    })
    return resPromise;
  }
  getVMAdditionalData(ip: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.get('api/vm/' + ip + '/additionalData', httpOptions);
  }
  getRelatedVMSData(ip: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.get('api/vm/' + ip + '/relatedvms', httpOptions);
  }
  deleteVM(ip: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var data: any = {};
    return this._client.post('api/vm/delete/' + ip, data, httpOptions);
  }
  updateVMAdditionaalData(ip: string, data: any) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.post(
      'api/vm/' + ip + '/additionalData',
      data,
      httpOptions
    );
  }
  updateRelatedVMSData(ip: string, data: any) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    return this._client.post(
      'api/vm/' + ip + '/relatedvms',
      data,
      httpOptions
    );
  }


  parseData(res: any) {
    const vmDataset: VM[] = [];
    var parseRes = JSON.parse(res);
    var index = 0;
    for (var key in parseRes) {
      if (key != 'user' && key != 'protocols') {
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
          cssClass: '',
          global: '',
        };
        if (
          vmDataset[index].snap_count >= 5 &&
          vmDataset[index].snap_count <= 8
        ) {
          vmDataset[index].cssClass = 'warnSnap';
        } else if (vmDataset[index].snap_count > 8) {
          vmDataset[index].cssClass = 'alertSnap';
        }
        if (vmDataset[index].status == 'true') {
          vmDataset[index].status = 'Available';
        } else {
          vmDataset[index].status = 'Occupied';
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
  parseSnapshotsData(parseRes: any) {
    const snapshotsDataset: any[] = [];
    
    var index = 0;
    for (var key in parseRes) {
        snapshotsDataset[index] = {
          id: index,
          ip: parseRes[key].ip,
          hostname: parseRes[key].host,
          os: parseRes[key].os,
          status: parseRes[key].status,
          description: parseRes[key].desc,
          name: parseRes[key].snap,
          owner: parseRes[key].owner
        };
        
        if (snapshotsDataset[index].status == 'true' || snapshotsDataset[index].status == true) {
          snapshotsDataset[index].status = 'Available';
        } else {
          snapshotsDataset[index].status = 'Occupied';
        }
        index++;
      
    }
    return snapshotsDataset;
  }
  parseSnapshotsCountData(parseRes: any) {
    const snapshotsDataset: any[] = [];
    
    var index = 0;
    for (var key in parseRes) {
        snapshotsDataset[index] = {
          id: index,
          ip: parseRes[key].ip,
          hostname: parseRes[key].host,
          os: parseRes[key].os,
          count: parseRes[key].count,
          owner: parseRes[key].owner,
          status: parseRes[key].status
        };
        
        if (snapshotsDataset[index].status == 'true' || snapshotsDataset[index].status == true) {
          snapshotsDataset[index].status = 'Available';
        } else {
          snapshotsDataset[index].status = 'Occupied';
        }
        index++;
      
    }
    return snapshotsDataset;
  }
}
