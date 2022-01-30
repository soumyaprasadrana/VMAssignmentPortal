import { Injectable } from '@angular/core';
import { OS } from '../DataModel/os';
import { Observable, of } from 'rxjs';
import { UIPropService } from './properties.services';
@Injectable({
  providedIn: 'root',
})
/* VM Management System Services it will include all vm related services */
export class OSService {
  teams: Array<OS> = [];
  promise: any;
  constructor(private _props: UIPropService) {
    this.promise = this._props.getDataFromNode();
  }
  getOsList() {
    const promisey = new Promise((resolve, reject) => {
      function parseResult(res: any): OS[] {
        var result = JSON.parse(res);
        var osList = result.osList.split('#');
        var id = 1;
        var returnObject: OS[] = [];
        for (var i = 0; i < osList.length; i++) {
          var osL = osList[i].split(':');
          returnObject.push({
            id: id,
            os_name: osL[0],
            os_ver: osL[1],
            os_full: osL[0] + ' ' + osL[1],
          });
          id++;
        }
        ////console.log('returnObject=>', returnObject);
        return returnObject;
      }

      this.promise
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
  mockData(count: number): Array<any> {
    // mock a dataset
    const mockDataset: OS[] = [];
    for (let i = 0; i < count; i++) {
      var os_name = 'OS' + i;
      var os_ver = 'OS Ver' + i;
      mockDataset[i] = {
        id: i,
        os_name: os_name,
        os_ver: os_ver,
        os_full: os_name + ' ' + os_ver,
      };
    }

    return mockDataset;
  }
}
