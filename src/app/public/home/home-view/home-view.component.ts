import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    private _client: NodeclientService
  ) {
    if (_client.deviceIsMobile()) this.sideNavContainerHeght = 100;
  }

  ngOnInit(): void {}
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
