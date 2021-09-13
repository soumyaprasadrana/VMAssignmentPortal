import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
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
  constructor() { }
}
