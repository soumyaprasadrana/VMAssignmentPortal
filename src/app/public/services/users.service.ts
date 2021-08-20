import { Injectable } from '@angular/core';
import { User } from '../DataModel/user';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/* VM Management System Services it will include all vm related services */
export class UserService {
  users: Array<any> = [];
  constructor() {
    this.users = this.mockData(500);

  }
  getUsers() {

    return this.users;
  }
  mockData(count: number): Array<any> {
    // mock a dataset
    const mockDataset: User[] = [];
    for (let i = 0; i < count; i++) {


      mockDataset[i] = {
        id: i,
        user_id: 'user' + i,
        user_name: 'username' + i,

      };

    }

    return mockDataset;
  }

}
