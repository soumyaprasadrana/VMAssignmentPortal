// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Technote Services
 */
import { Injectable } from '@angular/core';
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

    const promise = new Promise((resolve, reject) => {
      resolve(
        this.parseData(
          '{"1":{"technote":"<h2>How to stop/start firewall on Redhat 8 step by step instructions<\\/h2><ol><li>To check firewall status execute the following command:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># systemctl status firewalld\\n? firewalld.service - firewalld - dynamic firewall daemon\\n   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)\\n   Active: active (running) since Sun 2018-11-25 15:08:56 EST; 8min ago\\n     Docs: man:firewalld(1)\\n Main PID: 4567 (firewalld)\\n    Tasks: 2 (limit: 24007)\\n   Memory: 24.4M\\n   CGroup: /system.slice/firewalld.service\\n           ??4567 /usr/libexec/platform-python -s /usr/sbin/firewalld --nofork --nopid\\n<\\/pre><ol><li>Stop firewall by running the following command:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># service firewalld stop\\nOR\\n# systemctl stop firewalld\\n<\\/pre><ol><li>To permanently disable firewall even after the RHEL 8 / CentOS 8 system reboot execute:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># systemctl disable firewalld\\n<\\/pre><ol><li>To start firewall after it was stopped execute:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># service firewalld start\\nOR\\n# systemctl start firewalld\\n<\\/pre><ol><li>To enable the firewall to start after the system reboot run:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># systemctl enable firewalld\\n<\\/pre>","keywords":"firewall,linux,rhel,network","description":"How to stop/start firewall on RHEL 8 / CentOS 8","is_global":true,"id":"1","team":"DEV"}}'
        )
      );
    });
    return promise;
  }
  getDataFromNode(): any {
    return new Promise((resolve, reject) => {
      resolve(
        this.parseData(
          '{"1":{"technote":"<h2>How to stop/start firewall on Redhat 8 step by step instructions<\\/h2><ol><li>To check firewall status execute the following command:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># systemctl status firewalld\\n? firewalld.service - firewalld - dynamic firewall daemon\\n   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)\\n   Active: active (running) since Sun 2018-11-25 15:08:56 EST; 8min ago\\n     Docs: man:firewalld(1)\\n Main PID: 4567 (firewalld)\\n    Tasks: 2 (limit: 24007)\\n   Memory: 24.4M\\n   CGroup: /system.slice/firewalld.service\\n           ??4567 /usr/libexec/platform-python -s /usr/sbin/firewalld --nofork --nopid\\n<\\/pre><ol><li>Stop firewall by running the following command:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># service firewalld stop\\nOR\\n# systemctl stop firewalld\\n<\\/pre><ol><li>To permanently disable firewall even after the RHEL 8 / CentOS 8 system reboot execute:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># systemctl disable firewalld\\n<\\/pre><ol><li>To start firewall after it was stopped execute:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># service firewalld start\\nOR\\n# systemctl start firewalld\\n<\\/pre><ol><li>To enable the firewall to start after the system reboot run:<\\/li><\\/ol><pre class=\\"ql-syntax\\" spellcheck=\\"false\\"># systemctl enable firewalld\\n<\\/pre>","keywords":"firewall,linux,rhel,network","description":"How to stop/start firewall on RHEL 8 / CentOS 8","is_global":true,"id":"1","team":"DEV"}}'
        )
      );
    });
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
    return new Promise((resolve, reject) => {
      resolve('{"status":"Success"}');
    });
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
