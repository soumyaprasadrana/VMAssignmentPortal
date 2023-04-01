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
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { css } from "jquery";
import { DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent } from "../../dynamicobjects/dynamicobjectapp-user-defined-function-angular-html/dynamicobjectapp-user-defined-function-angular-html.component";
import { AuthserviceService } from "../../services/authservice.service";
import { ShellService } from "../../services/shell-service";
import { UserDefinedFunctionsService } from "../../services/userdefinedfunctions.service";
import { PathComponent } from "../path/path.component";

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
  pathCompRef!:ComponentRef<PathComponent>;
  loggedUser: any;
  visible: any = true;
  isLoaded:boolean = false;
  constructor(
    private _auth: AuthserviceService,
    private sanitizer: DomSanitizer,
    private _shell: ShellService,
    private _funService: UserDefinedFunctionsService,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {
    console.log("<AngularShellComponent> :: constructor ::");
    this.loggedUser = _auth.getUser();
    _shell.clearShell();
    _shell.setShell(this);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("<AngularShellComponent> :: ngOnChanges ::",changes);
  }
  ngAfterViewInit(): void {
    console.log("<AngularShellComponent> :: ngAfterViewInit ::");

    if (
            typeof this.context.angularScript != "undefined" &&
            typeof this.context.angularScript == "function"
          ){
            console.log("<AngularShellComponent> :: ngAfterViewInit ::" + " angularScript :: before")
            this.context.angularScript(
              this.context,
              this._funService.getUtils()
            );
             if (
            typeof this.context.angularBootstrapScript != "undefined" &&
            typeof this.context.angularBootstrapScript == "function"
            ){
               console.log("<AngularShellComponent> :: ngAfterViewInit ::" + " angularBootstrapScript :: before")
              this.context.angularBootstrapScript(
              this.context,
              this._funService.getUtils()
            );
            console.log("<AngularShellComponent> :: ngAfterViewInit ::" + " angularBootstrapScript :: after")
            }
            console.log("<AngularShellComponent> :: ngAfterViewInit ::" + " angularScript :: after")
            }
    //View has beeen initialized now we can bind events
    if (this.context.eventBindings) {
      console.log("<AngularShellComponent> :: ngAfterViewInit :: found event bindings ::");
      for (var item in this.context.eventBindings) {
        console.log(
          "<AngularShellComponent> :: ngAfterViewInit :: found event bindings :: item :: ",
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
    
    //Process post render of angular path components
    try {
      console.log("<AngularShellComponent> :: ngAfterViewInit :: createAngularComponents :: before");
      this.createAngularComponent();
      console.log("<AngularShellComponent> :: ngAfterViewInit :: createAngularComponents :: after");
    } catch (e) {}
    // Process Render Angular Components
    try {
      if(this.context.angularComponents){
          console.log("<AngularShellComponent> :: ngAfterViewInit :: renderAngularComponents :: before");
          this.renderAngularComponents(this.context.angularComponents);
          console.log("<AngularShellComponent> :: ngAfterViewInit :: renderAngularComponents :: after");
      }
    } catch (e) {console.log(e);}
    if (
      this.context.templateScript &&
      typeof this.context.templateScript == "function"
    ) {
      console.log("<AngularShellComponent> :: ngAfterViewInit :: templateScript :: before");
      this.context.templateScript(this.context, this._funService.getUtils());
      console.log("<AngularShellComponent> :: ngAfterViewInit :: templateScript :: after");
    }
  }
  renderAngularComponents(angularComponents:any) {
    const METHOD = "<AngularShellComponent> :: renderAngularComponents";
    
    for(var key in angularComponents){
      console.log(METHOD + "::" + " key ",key)
      var compMeta = angularComponents[key];
      console.log(METHOD + "::" + " compMeta ",compMeta);
      let ngCompRef:ComponentRef<DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent>;
      try {
        const compFactory = this.resolver.resolveComponentFactory(DynamicObjectAppUserDefinedFunctionANgularHTMLPageComponent);
        ngCompRef = compFactory.create(this.injector, [], '#'+key);
        console.log(METHOD + "::" + " ngCompRef ",ngCompRef);
        let ngCompInstance = ngCompRef && ngCompRef.instance;
        console.log(METHOD + "::" + " ngCompInstance ",ngCompInstance);
        if(ngCompInstance){
          const compRequiredMetadata :any = {context:this.context};
          if(compMeta.type)
            compRequiredMetadata['elementType'] = compMeta.type;
          if(compMeta.attributes)
            compRequiredMetadata['attributes'] = compMeta.attributes;
          if(compMeta.model)
            compRequiredMetadata['model'] = compMeta.model;
          if(compMeta.click)
            compRequiredMetadata['click'] = compMeta.click;
          if(typeof compMeta.ngIf != 'undefined')
            compRequiredMetadata['ngIf'] = compMeta.ngIf;
          else
            compRequiredMetadata['ngIf'] = true;
          if(compMeta.ngStyle)
            compRequiredMetadata['ngStyle'] = compMeta.ngStyle;
          if(compMeta.innerHtml)
            compRequiredMetadata['innerHTML'] = compMeta.innerHtml;
          if(compMeta.ngClass)
            compRequiredMetadata['ngClass'] = compMeta.ngClass;
          console.log(METHOD + "::" + " compRequiredMetadata ",compRequiredMetadata);
          Object.assign(ngCompInstance,compRequiredMetadata);
        }

        this.appRef.attachView(ngCompRef.hostView);

      }catch(e){console.log(e)}

    }
  }
  // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  createAngularComponent() {
    const compFactory = this.resolver.resolveComponentFactory(PathComponent);
    this.pathCompRef = compFactory.create(this.injector, [], 'app-path');

    this.appRef.attachView(this.pathCompRef.hostView);
    
  }

  ngOnInit(): void {
    const METHOD = "<AngularShellComponent> :: ngonInit";
    console.log(METHOD + "::" + " grid ",this.grid);
    console.log(METHOD + "::" + " row ",this.row);
    console.log(METHOD + "::" + " template ",this.template);
    
    if (
      this.context.templateScriptBefore &&
      typeof this.context.templateScriptBefore == "function"
    ) {
      try{
      console.log(METHOD + "::" + " templateScriptBefore  :: before");  
      this.context.templateScriptBefore(
        this.context,
        this._funService.getUtils()
      );
      console.log(METHOD + "::" + " templateScriptBefore  :: after");  
      }catch(e){console.log(e);}
    }
    console.log(METHOD + "::" + " templateSanitized  :: before");  
    this.templateSanitized = this.sanitizer.bypassSecurityTrustHtml(
      this.template(this.context, this.grid, this.row)
    );
    console.log(METHOD + "::" + " templateSanitized  :: after");  
    console.log(METHOD + "::" + " context  :: ",this.context);
    console.log(METHOD + "::" + " template  :: ",this.template);
    console.log(METHOD + "::" + " parentObject  :: ",this.parentObject);
    console.log(METHOD + "::" + " grid  :: ",this.grid);
    console.log(METHOD + "::" + " row  :: ",this.row);  
    this.isLoaded = true;
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
    const METHOD = "<AngularShellComponent> :: render";
    console.log("============= ANGULAR SHELL RENDER TEMPLATE ============");
    console.log("======== DEBUG0 ======== ", context);
    this.context = context;
    if (
      this.context.templateScriptBefore &&
      typeof this.context.templateScriptBefore == "function"
    ) {
      try{
      this.context.templateScriptBefore(
        this.context,
        this._funService.getUtils()
      );
      }catch(e){console.log(e);}
    }
    this.templateSanitized = this.sanitizer.bypassSecurityTrustHtml(
      this.template(this.context, this.grid, this.row)
    );console.log(METHOD + "::" + " templateSanitized  :: after");  
    console.log(METHOD + "::" + " context  :: ",this.context);
    console.log(METHOD + "::" + " template  :: ",this.template);
    console.log(METHOD + "::" + " parentObject  :: ",this.parentObject);
    console.log(METHOD + "::" + " grid  :: ",this.grid);
    console.log(METHOD + "::" + " row  :: ",this.row);
    setTimeout(() => {
       console.log("<AngularShellComponent> :: re-render ::");

    if (
            typeof this.context.angularScript != "undefined" &&
            typeof this.context.angularScript == "function"
          ){
            console.log("<AngularShellComponent> :: re-render ::" + " angularScript :: before")
            this.context.angularScript(
              this.context,
              this._funService.getUtils()
            );
             if (
            typeof this.context.angularBootstrapScript != "undefined" &&
            typeof this.context.angularBootstrapScript == "function"
            ){
               console.log("<AngularShellComponent> :: re-render ::" + " angularBootstrapScript :: before")
              this.context.angularBootstrapScript(
              this.context,
              this._funService.getUtils()
            );
            console.log("<AngularShellComponent> :: re-render ::" + " angularBootstrapScript :: after")
            }
            console.log("<AngularShellComponent> :: re-render ::" + " angularScript :: after")
            }
    //View has beeen initialized now we can bind events
    if (this.context.eventBindings) {
      console.log("<AngularShellComponent> :: re-render :: found event bindings ::");
      for (var item in this.context.eventBindings) {
        console.log(
          "<AngularShellComponent> :: re-render :: found event bindings :: item :: ",
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
    
    //Process post render of angular path components
    try {
      console.log("<AngularShellComponent> :: re-render :: createAngularComponents :: before");
      this.createAngularComponent();
      console.log("<AngularShellComponent> :: re-render :: createAngularComponents :: after");
    } catch (e) {}
    // Process Render Angular Components
    try {
      if(this.context.angularComponents){
          console.log("<AngularShellComponent> :: re-render :: renderAngularComponents :: before");
          this.renderAngularComponents(this.context.angularComponents);
          console.log("<AngularShellComponent> :: re-render :: renderAngularComponents :: after");
      }
    } catch (e) {console.log(e);}
    if (
      this.context.templateScript &&
      typeof this.context.templateScript == "function"
    ) {
      console.log("<AngularShellComponent> :: re-render :: templateScript :: before");
      this.context.templateScript(this.context, this._funService.getUtils());
      console.log("<AngularShellComponent> :: re-render :: templateScript :: after");
    }
    },300);
  }

 
}
