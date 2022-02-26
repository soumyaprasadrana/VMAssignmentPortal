// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Tools SPA Component
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-tools-spa-app',
  templateUrl: './tools-spa-app.component.html',
  styleUrls: ['./tools-spa-app.component.scss'],
})
export class ToolsSpaAppComponent implements OnInit {
  app!: string;
  appIcon!: string;
  appName!: string;
  isLoaded: boolean = false;
  isDataloadFailed: boolean = false;
  dotsubscription!: Subscription;
  dotCount = 1;
  dots: string = '.';
  constructor(private actRoute: ActivatedRoute, private router: Router) {
    this.app = this.actRoute.snapshot.params.app;
    if (typeof history.state.data != 'undefined') {
      if (typeof history.state.data.cardIconClass != 'undefined') {
        this.appIcon = history.state.data.cardIconClass;
        this.appName = history.state.data.cardTitle;
      } else {
        this.appIcon = 'fa fa-taxi';
        this.appName = this.app;
      }
    } else {
      this.appIcon = 'fa fa-taxi';
      this.appName = this.app;
    }
    const source = interval(500);
    this.dotsubscription = source.subscribe((val) => {
      if (!this.isLoaded && !this.isDataloadFailed) this.dots = this.getDots();
    });
    console.log('contructor finished');
  }
  getDots() {
    console.log('called get Dots');
    var res = '';
    for (var i = 0; i < this.dotCount; i++) {
      res += '.';
    }
    this.dotCount += 1;
    if (this.dotCount == 8) {
      this.dotCount = 1;
    }
    return res;
  }
  ngOnDestroy() {
    this.dotsubscription.unsubscribe();
  }
  ngOnInit(): void {
    setTimeout(() => {
      console.log('init finished');
      const routerLink = ['/portal/spa/', this.app];
      const appUrl = this.router.serializeUrl(
        this.router.createUrlTree(routerLink)
      );
      console.log(appUrl);
      window.open(appUrl, '_blank');
      this.router.navigate(['/portal/home/tools/spa']);
    }, 4000);
  }
}
