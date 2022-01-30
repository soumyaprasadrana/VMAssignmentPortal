import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { GroupByPipe } from 'ngx-pipes';
@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.scss'],
})
export class TeamStatsComponent implements OnInit {
  list: any = [];
  temp: any = {};
  constructor(private us: UserService) {
    us.getTeamStats()
      .then((res: any) => {
        res = JSON.parse(res);
        for (var key in res) {
          this.list.push(res[key]);
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  ngOnInit(): void {}
}
