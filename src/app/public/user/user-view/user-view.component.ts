// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc User View Component
 */
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserModule } from '../../widget/animations/route-animations';
import { RoutehandleService } from '../../widget/animations/routehandle.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  animations: [UserModule],
})
export class UserViewComponent implements OnInit {
  constructor(private routeHandle: RoutehandleService) {}

  ngOnInit(): void {}
  public getRouterOutletState(outlet: RouterOutlet) {
    /*//console.log("User Module:getRouterOutletState:");
    //console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
    //console.log("calling get router");
    this.routeHandle.getRouterOutletState();*/

    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
  public onRouterOutletActivate(outlet: RouterOutlet) {
    this.routeHandle.setUserRouterOutlet(outlet);
  }
}
