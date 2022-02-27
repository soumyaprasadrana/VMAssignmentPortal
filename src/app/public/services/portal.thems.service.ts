// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Theme Services
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { NodeclientService } from './nodeclient.service';
@Injectable({
  providedIn: 'root',
})
export class PortalThemesService {
  themeName!: string;
  private themeO = new Subject<any>();
  THEME_SERVER = 'theme_server';
  THEME_LOCAL = 'theme';
  setThemeText(text: string) {
    this.themeO.next({ text: text });
  }
  constructor(
    private sanitizer: DomSanitizer,
    private _client: NodeclientService
  ) {}

  clearText() {
    this.themeO.next();
  }

  getFilterText(): Observable<any> {
    return this.themeO.asObservable();
  }
  getThemeUrlWithThemeName(theme: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${theme}.css`);
  }
  getThemeUrl() {
    var promise = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      var theme = 'default';
      this.setThemeText(theme);
      resolve(this.sanitizer.bypassSecurityTrustResourceUrl(`${theme}.css`));
    });
    return promise;
  }
  getQuickLinks() {
    var promise = new Promise((resolve, reject) => {
      var quicklinks = {
        quickLinksMetaData: [
          {
            linkTitle: 'Google',
            linkUrl: 'http://google.com',
            iconClass: 'fa fa-google',
          },
          {
            linkTitle: 'Firefox',
            linkUrl: 'http://firefox.com',
            iconClass: 'fa fa-firefox',
          },
        ],
      };
      resolve(quicklinks);
    });
    return promise;
  }
}
