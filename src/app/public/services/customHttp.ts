import { Observable, of, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SpinnerService } from './spinner-service';
import { filter } from 'rxjs/operators';
import { MATH_PIPES } from 'ngx-pipes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  previousUrl: string = '';
  currentUrl: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      this.router.navigateByUrl(`/portal/login`).then(() => {
        var parent = this.route.parent;
        console.log(
          'Unauthorized Request found from :',
          this.previousUrl,
          ' Navigated to:',
          this.currentUrl
        );
        if (
          this.previousUrl != '' &&
          this.currentUrl != '' &&
          this.previousUrl != this.currentUrl
        )
          window.location.reload();
      });

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of({ message: err.message }); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.

    // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
    return next.handle(req).pipe(catchError((x) => this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }
}
