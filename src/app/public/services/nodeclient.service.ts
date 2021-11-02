import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Config } from '../../app.config';
import { AnyCnameRecord } from 'dns';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NodeclientService {
  constructor(private http: HttpClient, private config: Config) {}

  post(apiPath: string, params: HttpParams | null, httpOptions: any | null) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.config.apiUrl;
      const url = apiURL + '/' + apiPath;
      console.log('URL for login:' + url);
      console.log(JSON.stringify(httpOptions));
      this.http
        .post(url, { params }, httpOptions)
        .toPromise()
        .then((res: any) => {
          console.log('nodeclient- post - resolve', res);
          // callback(res);
          resolve(res);
        })
        .catch((err) => {
          //  callback(err);
          console.log('nodeclient- post - reject');
          reject(err);
        });
    });

    return promise;
  }

  get(apiPath: string, httpOptions: any | null) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.config.apiUrl;
      const url = apiURL + '/' + apiPath;
      console.log('URL for GET:' + url);
      console.log(JSON.stringify(httpOptions));
      this.http
        .get(url, httpOptions)
        .toPromise()
        .then(function (res) {
          console.log('nodeclient- get - resolve');
          // callback(res);
          resolve(res);
        })
        .catch(function (err) {
          //  callback(err);
          console.log('nodeclient- get - reject');
          reject(err);
        });
    });

    return promise;
  }

  getObservable(apiPath: string, httpOptions: any | null) {
    return this.http.get(apiPath, httpOptions).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        return err;
      })
    );
  }
}
