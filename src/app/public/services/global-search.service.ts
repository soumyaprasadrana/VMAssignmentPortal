// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Global Search Services
 */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalSearchService {
  private filter = new Subject<any>();
  setFilterText(text: string) {
    this.filter.next({ text: text });
  }

  clearText() {
    this.filter.next();
  }

  getFilterText(): Observable<any> {
    return this.filter.asObservable();
  }
  constructor() {}
}
