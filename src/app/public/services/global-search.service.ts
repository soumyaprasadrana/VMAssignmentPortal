import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
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
  constructor() { }
}
