// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Spinner Services
 */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isLoading = new Subject<any>();
  setSpinnerState(value: boolean) {
    this.isLoading.next({ value: value });
  }

  clearState() {
    this.isLoading.next();
  }

  getSpinnerState(): Observable<any> {
    return this.isLoading.asObservable();
  }
  constructor() {}
}
