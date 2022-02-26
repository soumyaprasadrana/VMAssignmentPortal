// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Home View Component
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { NodeclientService } from '../../services/nodeclient.service';
import { homeModule } from '../../widget/animations/route-animations';
import { RoutehandleService } from '../../widget/animations/routehandle.service';
@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  animations: [homeModule],
  providers: [RouterOutlet],
})
export class HomeViewComponent implements OnInit {
  @ViewChild('o') o!: RouterOutlet;
  sideNavContainerHeght: number = 90;
  constructor(
    private routeHandle: RoutehandleService,
    private _client: NodeclientService,
    private router: Router,
    private auth: AuthserviceService
  ) {
    if (_client.deviceIsMobile()) this.sideNavContainerHeght = 100;
  }

  ngOnInit(): void {
    /* Session check for home module*/
    var promise = this.auth.checkSession();
    promise
      .then((result) => {
        //Auth Intrceptor will handle if unauhorized
      })
      .catch((result) => {});
  }
  public getRouterOutletState(outlet: RouterOutlet) {
    ////console.log("Home Module:getRouterOutletState:");
    ////console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);

    ////console.log("calling get router");
    //this.routeHandle.getRouterOutletState();
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
  public onRouterOutletActivate(outlet: RouterOutlet) {
    this.routeHandle.setHomeRouterOutlet(outlet);
  }
}
