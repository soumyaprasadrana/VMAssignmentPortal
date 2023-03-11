// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc PortalToastConfigService Services
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { NodeclientService } from './nodeclient.service';
@Injectable({
  providedIn: 'root',
})
export class PortalToastConfigService {
  useToast!: boolean;
  constructor(
    private _client: NodeclientService
  ) {}

  
  getStatus() {
    var promise = new Promise((resolve, reject) => {
      var headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      var httpOptions = {
        headers: headers,
      };
      
      this._client
        .get('api/config/useToast', httpOptions)
        .then((res: any) => {
          this.useToast = res.usetoast;
          resolve(this.useToast);
        })
        .catch((err) => {
          console.log('Error Occurred! Using default value!');
          this.useToast=true;
          resolve(this.useToast);
        });
    });
    return promise;
  }
  
}
