// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Properties Services
 */
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NodeclientService } from './nodeclient.service';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class UIPropService {
  vms: Array<any> = [];
  promiseX: any;
  observable: any;
  private needRefresh = new Subject<any>();
  subscription: Subscription;
  private needReload: any;
  promise?: Promise<unknown>;
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
    this.subscription = this.getNeedRefreshState().subscribe((value) => {
      if (value) {
        //console.log('Spinner state:' + value.value);
        this.needReload = value.value;
      } else {
      }
    });
  }

  getDataFromNode(): any {
    return new Promise((resolve, reject) => {
      resolve(
        '{"osList":"Windows:Server 2016#Windows:Server 2008 R2#Windows:Server 2012#Windows:Server 2012R2#Windows:Server 2019#Windows:10#Linux:RHEL 6#Linux:RHEL 7#Linux:RHEL 7.2#Linux:RHEL 7.4#Linux:RHEL 7.6#Linux:RHEL 7.7#Linux:RHEL 7.8#Linux:RHEL 8#Linux:Ubuntu 14#Linux:Ubuntu 16#Linux:Ubuntu 18#AIX:7.2#AIX:7.1#NA:NA","warnSnapshot":"5","paginationPageSize":"25","teamList":"DEV:DevOps:FreePool:QA:Support","alertSnapshot":"9","paginationPageSizesList":"25:50:75:100:125"}'
      );
    });
  }

  getProps() {
    const promisey = new Promise((resolve, reject) => {
      resolve(
        '{"osList":"Windows:Server 2016#Windows:Server 2008 R2#Windows:Server 2012#Windows:Server 2012R2#Windows:Server 2019#Windows:10#Linux:RHEL 6#Linux:RHEL 7#Linux:RHEL 7.2#Linux:RHEL 7.4#Linux:RHEL 7.6#Linux:RHEL 7.7#Linux:RHEL 7.8#Linux:RHEL 8#Linux:Ubuntu 14#Linux:Ubuntu 16#Linux:Ubuntu 18#AIX:7.2#AIX:7.1#NA:NA","warnSnapshot":"5","paginationPageSize":"25","teamList":"DEV:DevOps:FreePool:QA:Support","alertSnapshot":"9","paginationPageSizesList":"25:50:75:100:125"}'
      );
    });
    return promisey;
  }
}
