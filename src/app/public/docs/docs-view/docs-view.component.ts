// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Charts View Component
 */
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { adminModule } from "../../widget/animations/route-animations";
import { RoutehandleService } from "../../widget/animations/routehandle.service";
@Component({
  selector: "app-docs-view",
  templateUrl: "./docs-view.component.html",
  styleUrls: [ "./docs-view.component.scss" ],
  animations: [ adminModule ],
})
export class DocsViewComponent implements OnInit,AfterViewInit {
  @ViewChild('o') o!: RouterOutlet;
  sideNavContainerHeght: number = 90;

  constructor(private routeHandle: RoutehandleService) {
    
  }
  ngAfterViewInit(): void {
       $("#wrapper").toggleClass("toggled");
  }
  ngOnInit(): void {}
  public getRouterOutletState(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  public onRouterOutletActivate(outlet: RouterOutlet) {
    this.routeHandle.setVMMRouterOutlet(outlet);
  }
}
