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
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ShellService {
  private shell: any;
  setShell(value: any) {
    this.shell = value;
  }

  clearShell() {
    this.shell = null;
  }

  getShell(): any {
    return this.shell;
  }
  constructor() {}
}
