// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Route Handler
 */
import { Injectable } from '@angular/core';
import { RouterOutlet, RouterOutletContract } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutehandleService {
  homeOutlet!: RouterOutlet;
  vmmOutlet!: RouterOutlet;
  userOutlet!: RouterOutlet;
  constructor() {}

  setHomeRouterOutlet(o: RouterOutlet) {
    this.homeOutlet = o;
  }

  setUserRouterOutlet(o: RouterOutlet) {
    this.userOutlet = o;
  }

  setVMMRouterOutlet(o: RouterOutlet) {
    this.vmmOutlet = o;
  }

  getRouterOutletState() {
    //console.log("RouterHandleService: homeOutlet")
    //console.log(this.homeOutlet);
    //console.log("RouterHandleService: userOutlet")
    //console.log(this.userOutlet);
    //console.log("RouterHandleService: vmmOutlet");
    //console.log(this.vmmOutlet);
  }
  getRouterStateFromHome() {
    return (
      this.homeOutlet &&
      this.homeOutlet.activatedRouteData &&
      this.homeOutlet.activatedRouteData['animation']
    );
  }
}
