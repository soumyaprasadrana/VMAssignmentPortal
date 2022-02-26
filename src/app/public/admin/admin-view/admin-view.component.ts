// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Admin View Component
 */
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { adminModule } from '../../widget/animations/route-animations';
import { RoutehandleService } from '../../widget/animations/routehandle.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  animations: [adminModule],
})
export class AdminViewComponent implements OnInit {
  constructor(private routeHandle: RoutehandleService) {}

  ngOnInit(): void {}
  public getRouterOutletState(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  public onRouterOutletActivate(outlet: RouterOutlet) {
    this.routeHandle.setVMMRouterOutlet(outlet);
  }
}
