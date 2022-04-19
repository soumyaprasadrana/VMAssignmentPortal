// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Object View Component
 */
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolsModule, vmmModule } from '../../widget/animations/route-animations';
import { RoutehandleService } from '../../widget/animations/routehandle.service';

@Component({
  selector: 'app-dynamicobjects-view',
  templateUrl: './dynamicobjects-view.component.html',
  styleUrls: ['./dynamicobjects-view.component.scss'],
  animations: [vmmModule],
})
export class DynamicObjectsViewComponent implements OnInit {
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
