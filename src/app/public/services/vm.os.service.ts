import { Injectable } from '@angular/core';
import { OS } from '../DataModel/os';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/* VM Management System Services it will include all vm related services */
export class OSService {
  teams: Array<OS> = [];
  constructor() {
    this.teams = this.mockData(50);

  }
  getOsList() {

    return this.teams;
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
        os_full: os_name + " " + os_ver

      };

    }

    return mockDataset;
  }

}
