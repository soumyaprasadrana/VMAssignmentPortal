import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { adminModule } from '../../widget/animations/route-animations';
import { RoutehandleService } from '../../widget/animations/routehandle.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  animations: [adminModule]
})
export class AdminViewComponent implements OnInit {

  constructor(private routeHandle:RoutehandleService) { }

  ngOnInit(): void {
  }
  public getRouterOutletState(outlet: RouterOutlet) {
     return  outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
   }
 
   public onRouterOutletActivate(outlet : RouterOutlet){
     this.routeHandle.setVMMRouterOutlet(outlet);
   }
}
