import { Injectable } from '@angular/core';
import { RouterOutlet, RouterOutletContract } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutehandleService {
  homeOutlet!:RouterOutlet;
  vmmOutlet!:RouterOutlet;
  userOutlet!:RouterOutlet;
  constructor() { }

  setHomeRouterOutlet(o:RouterOutlet){
    this.homeOutlet=o;
  }
  
  setUserRouterOutlet(o:RouterOutlet){
    this.userOutlet=o;
  }
  
  setVMMRouterOutlet(o:RouterOutlet){
    this.vmmOutlet=o;
  }

  getRouterOutletState(){
    console.log("RouterHandleService: homeOutlet")
    console.log(this.homeOutlet);
    console.log("RouterHandleService: userOutlet")
    console.log(this.userOutlet);
    console.log("RouterHandleService: vmmOutlet");
    console.log(this.vmmOutlet);
    

  }
  getRouterStateFromHome(){
    return  this.homeOutlet && this.homeOutlet.activatedRouteData && this.homeOutlet.activatedRouteData['animation']
  }
}
