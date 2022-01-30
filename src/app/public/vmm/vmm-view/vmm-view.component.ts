import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { vmmModule } from '../../widget/animations/route-animations';
import { RoutehandleService } from '../../widget/animations/routehandle.service';

@Component({
  selector: 'app-vmm-view',
  templateUrl: './vmm-view.component.html',
  styleUrls: ['./vmm-view.component.scss'],
  animations: [vmmModule],
})
export class VmmViewComponent implements OnInit {
  constructor(private routeHandle: RoutehandleService) {}

  ngOnInit(): void {}
  public getRouterOutletState(outlet: RouterOutlet) {
    /* //console.log("VMM Module:getRouterOutletState:");
    //console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
    */
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
