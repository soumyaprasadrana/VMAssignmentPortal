import { Injectable } from '@angular/core';
import { Team } from '../DataModel/team';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
/* VM Management System Services it will include all vm related services */
export class TeamService {
  teams: Array<Team> = [];
  constructor() {
    this.teams = this.mockData(50);

  }
  getTeams() {

    return this.teams;
  }
  mockData(count: number): Array<any> {
    // mock a dataset
    const mockDataset: Team[] = [];
    for (let i = 0; i < count; i++) {


      mockDataset[i] = {
        id: i,
        team_name: 'Team' + i,
        team_desc: 'Team Desc' + i,

      };

    }

    return mockDataset;
  }

}
