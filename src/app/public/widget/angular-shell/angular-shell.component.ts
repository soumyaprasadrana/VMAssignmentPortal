// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Card Component
 */
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewContainerRef,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent } from "../../dynamicobjects/dynamicobjectapp-user-defined-function-angular-html/dynamicobjectapp-user-defined-function-angular-html.component";
import { AuthserviceService } from "../../services/authservice.service";
import { ShellService } from "../../services/shell-service";
import { UserDefinedFunctionsService } from "../../services/userdefinedfunctions.service";

@Component({
  selector: "app-angular-shell",
  templateUrl: "./angular-shell.component.html",
})
export class AngularShellComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() template?: any;
  @Input() controller?: any;
  @Input() context?: any;
  @Input() parentObject?: any;
  @Input() callback?: any;
  @Input() grid?: any;
  @Input() row?: any;
  templateSanitized: any;
  loggedUser: any;
  visible: any = true;
  constructor(
    private _auth: AuthserviceService,
    private sanitizer: DomSanitizer,
    private _shell: ShellService,
    private _funService: UserDefinedFunctionsService,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {
    this.loggedUser = _auth.getUser();
    _shell.clearShell();
    _shell.setShell(this);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("SHELL ON CHANGE :: ", changes);
  }
  ngAfterViewInit(): void {
    //View has beeen initialized now we can bind events
    if (this.context.eventBindings) {
      console.log("<AngularShellComponent> :: found event bindings ::");
      for (var item in this.context.eventBindings) {
        console.log(
          "<AngularShellComponent> :: found event bindings :: item :: ",
          item
        );
        try {
          const onClickFun = this.context.eventBindings[item].event;
          const eventName = this.context.eventBindings[item].type;
          this.elementRef.nativeElement
            .querySelector("#" + item)
            .addEventListener(eventName, () => {
              onClickFun(this.context, event);
            });
        } catch (e) {}
      }
    }
    if (
      this.context.templateScript &&
      typeof this.context.templateScript == "function"
    ) {
      this.context.templateScript(this.context, this._funService.getUtils());
    }
    //Process post render of angular components
    //this.renderAngularComponent();
  }
  ngOnInit(): void {
    console.log("============= ANGULAR SHELL PROCESS TEMPLATE ");
    console.log("======== DEBUG0 ======== ", this.grid);
    console.log("======== DEBUG1 ======== ", this.row);
    if (
      this.context.templateScriptBefore &&
      typeof this.context.templateScriptBefore == "function"
    ) {
      this.context.templateScriptBefore(
        this.context,
        this._funService.getUtils()
      );
    }
    this.templateSanitized = this.sanitizer.bypassSecurityTrustHtml(
      this.template(this.context, this.grid, this.row)
    );
    console.log("ANGULAR SHELL INIT ");
    console.log(this.context);
    console.log(this.template);
    console.log(this.parentObject);
    console.log(this.grid);
    console.log(this.row);
  }

  clickHandle() {
    //console.log('clickHandle called', typeof this.callback);
    if (typeof this.callback == "function" && this.parentObject) {
      this.callback(this.parentObject);
    } else if (typeof this.callback == "function" && !this.parentObject) {
      this.callback();
    }
    return;
  }
  render(context: any) {
    console.log("============= ANGULAR SHELL RENDER TEMPLATE ");
    console.log("======== DEBUG0 ======== ", context);
    this.context = context;
    if (
      this.context.templateScriptBefore &&
      typeof this.context.templateScriptBefore == "function"
    ) {
      this.context.templateScriptBefore(
        this.context,
        this._funService.getUtils()
      );
    }
    this.templateSanitized = this.sanitizer.bypassSecurityTrustHtml(
      this.template(this.context, this.grid, this.row)
    );
    console.log("ANGULAR SHELL RE RENDER ");
    console.log(this.context);
    console.log(this.template);
    console.log(this.parentObject);
    console.log(this.grid);
    console.log(this.row);
    setTimeout(() => {
      if (this.context.eventBindings) {
        console.log("<AngularShellComponent> :: found event bindings ::");
        for (var item in this.context.eventBindings) {
          console.log(
            "<AngularShellComponent> :: found event bindings :: item :: ",
            item
          );
          const onClickFun = this.context.eventBindings[item].event;
          const eventName = this.context.eventBindings[item].type;
          this.elementRef.nativeElement
            .querySelector("#" + item)
            .addEventListener(eventName, () => {
              onClickFun(this.context, event);
            });
        }
      }
      if (
        this.context.templateScript &&
        typeof this.context.templateScript == "function"
      ) {
        this.context.templateScript(this.context, this._funService.getUtils());
      }
    });
  }
}
