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
      var theme;
      this._client
        .get('api/config/theme', httpOptions)
        .then((res: any) => {
          theme = res.theme;
          console.log('Theme loded from server :', theme);
          this.setThemeText(theme);
          if (
            !localStorage[this.THEME_SERVER] ||
            JSON.parse(localStorage[this.THEME_SERVER])['serverTheme'] != theme
          ) {
            console.log(
              '<{Theme Service}> No Server theme and local theme is not previous server theme!= current server theme'
            );
            localStorage[this.THEME_SERVER] = JSON.stringify({
              serverTheme: theme,
            });
            localStorage.removeItem(this.THEME_LOCAL);
          }
          resolve(
            this.sanitizer.bypassSecurityTrustResourceUrl(`${theme}.css`)
          );
        })
        .catch((err) => {
          console.log('Error Occurred! Using default theme!');
          console.log(err);
          theme = 'default';
          this.setThemeText(theme);
          resolve(
            this.sanitizer.bypassSecurityTrustResourceUrl(`${theme}.css`)
          );
        });
    });
    return promise;
  }
  getQuickLinks() {
    var promise = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      var quicklinks;
      this._client
        .get('api/public/quicklinks', httpOptions)
        .then((res: any) => {
          quicklinks = res.quicklinks;
          console.log('Quick Links loded from server :', quicklinks);

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }
}
