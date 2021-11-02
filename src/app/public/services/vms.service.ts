import { Injectable } from '@angular/core';
import { VM } from '../DataModel/vm';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NodeclientService } from './nodeclient.service';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class VmsService {
  vms: Array<any> = [];
  promiseX: any;
  observable: any;
  constructor(private _client: NodeclientService) {
    this.promiseX = this.getDataFromNode();
    this.observable = this.getVMSObservable();
  }
  getVms2(): Observable<any> {
    return this.observable;
  }
  getVms(): any {
    const promise = new Promise((resolve, reject) => {
      this.promiseX
        .then((res: any) => {
          console.log('getVms() ', res);
          resolve(this.parseData(res));
        })
        .catch((err: any) => {
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
        vmDataset[index].global =
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
          vmDataset[index].owner;
        index++;
      }
    }
    return vmDataset;
  }
}
