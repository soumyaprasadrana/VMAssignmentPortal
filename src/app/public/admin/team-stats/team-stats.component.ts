// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Team Stats Component
 */
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
