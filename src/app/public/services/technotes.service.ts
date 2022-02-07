import { Injectable } from '@angular/core';
import { VM } from '../DataModel/vm';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NodeclientService } from './nodeclient.service';
import { Technote } from '../DataModel/technote';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class TechnotesService {
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
    this.observable = this.getTechnotesObservable();
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
  getTechnotesObservable2(): Observable<any> {
    return this.observable;
  }
  getTechnotes(): any {
    console.log('getTecnotes() :: this.needReload ::', this.needReload);
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
    var promise = this._client.get('api/technotes/getAll', httpOptions);
    return promise;
  }

  getTechnotesObservable(): any {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var observable = this._client.getObservable(
      'api/technotes/getAll',
      httpOptions
    );
    return observable;
  }

  deleteTechnote(id: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var data: any = {};
    return this._client.post('api/technotes/delete/' + id, data, httpOptions);
  }

  parseData(res: any) {
    const technotesDataset: Technote[] = [];
    var parseRes = JSON.parse(res);
    var index = 0;
    for (var key in parseRes) {
      if (key != 'user' && key != 'protocols') {
        technotesDataset[index] = {
          id: parseRes[key].id,
          description: parseRes[key].description,
          keywords: parseRes[key].keywords,
          technotes: parseRes[key].technote,
          team: parseRes[key].team,
          is_global: parseRes[key].is_global,
        };
        index++;
      }
    }
    return technotesDataset;
  }
}
