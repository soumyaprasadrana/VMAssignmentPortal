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
  ApplicationRef,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
} from "@angular/core";
import { AngularSlickgridComponent } from "angular-slickgrid";
import { PathComponent } from "../../path/path.component";
@Component({
  selector: "app-silk-grid",
  template: `
        <div id="grid-container">
            <div id="slik-grid-shell">
            </div>
            <angular-slickgrid gridId="{{gridId}}" [columnDefinitions]="columnDefinitions" [gridOptions]="gridOptions" [dataset]="dataset" (onAngularGridCreated)="onAngularGridCreated($event.detail)" (onGridStateChanged)="onGridStateChanged($event.detail)" (onBeforeGridDestroy)="onBeforeGridDestroy()"
                (onSelectedRowsChanged)="onSelectedRowsChanged($event.detail.eventData, $event.detail.args)">
            </angular-slickgrid>
        </div>
  `,
})
export class SlikGridComponent implements OnInit, AfterViewInit {
  @Input() gridId?: any;
  @Input() columnDefinitions?: any;
  @Input() gridOptions?: any;
  @Input() dataset?: any;
  @Input() onAngularGridCreated?: any = () => {};
  @Input() onGridStateChanged?: any = () => {};
  @Input() onBeforeGridDestroy?: any = () => {};
  @Input() onSelectedRowsChanged?: any = () => {};
  slikGridCompRef: ComponentRef<AngularSlickgridComponent> | null | undefined;
  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}
  ngAfterViewInit(): void {
    const METHOD = "<SlikGridHybridComponent> ngAfterViewInit :: ";
    console.log(METHOD + "entry");
    console.log(METHOD + "Input() :: gridId", this.gridId);
    console.log(
      METHOD + "Input() :: columnDefinitions",
      this.columnDefinitions
    );
    console.log(METHOD + "Input() :: gridOptions", this.gridOptions);
    console.log(METHOD + "Input() :: dataset", this.dataset);
    console.log(
      METHOD + "Input() :: onAngularGridCreated",
      this.onAngularGridCreated
    );
    console.log(
      METHOD + "Input() :: onGridStateChanged",
      this.onGridStateChanged
    );
    console.log(
      METHOD + "Input() :: onBeforeGridDestroy",
      this.onBeforeGridDestroy
    );
    console.log(
      METHOD + "Input() :: onSelectedRowsChanged",
      this.onSelectedRowsChanged
    );
    if (
      !this.gridId ||
      !this.gridOptions ||
      !this.columnDefinitions ||
      !this.dataset
    ) {
      throw new Error(
        `Missing required attributes ! Attribute Missing : ${this.gridId
          ? ""
          : "gridId"} ${this.gridOptions ? "" : "gridOptions"} ${this
          .columnDefinitions
          ? ""
          : "columnDefinitions"} ${this.dataset ? "" : "dataset"}`
      );
    } //else {
    //this.createAngularComponent();
    //}
  }

  ngOnInit(): void {}

  createAngularComponent() {
    const METHOD = "<SlikGridHybridComponent> createAngularComponent :: ";
    console.log(METHOD + "entry");
    const compFactory = this.resolver.resolveComponentFactory(
      AngularSlickgridComponent
    );
    this.slikGridCompRef = compFactory.create(
      this.injector,
      [],
      "#slik-grid-shell"
    );
    console.log(METHOD + "::" + " this.slikGridCompRef ", this.slikGridCompRef);
    let ngCompInstance = this.slikGridCompRef && this.slikGridCompRef.instance;
    console.log(METHOD + "::" + " ngCompInstance ", ngCompInstance);
    if (ngCompInstance) {
      const compRequiredMetadata: any = {};
      if (this.gridId) compRequiredMetadata["gridId"] = this.gridId;
      if (this.columnDefinitions)
        compRequiredMetadata["columnDefinitions"] = this.columnDefinitions;
      if (this.gridOptions)
        compRequiredMetadata["gridOptions"] = this.gridOptions;
      if (this.onAngularGridCreated)
        compRequiredMetadata[
          "onAngularGridCreated"
        ] = this.onAngularGridCreated;
      if (this.onGridStateChanged)
        compRequiredMetadata["onGridStateChanged"] = this.onGridStateChanged;
      if (this.onBeforeGridDestroy)
        compRequiredMetadata["onBeforeGridDestroy"] = this.onBeforeGridDestroy;
      if (this.onSelectedRowsChanged)
        compRequiredMetadata[
          "onSelectedRowsChanged"
        ] = this.onSelectedRowsChanged;
      if (this.dataset) compRequiredMetadata["dataset"] = this.dataset;
      console.log(
        METHOD + "::" + " compRequiredMetadata ",
        compRequiredMetadata
      );
      Object.assign(ngCompInstance, compRequiredMetadata);
    }
    this.appRef.attachView(this.slikGridCompRef.hostView);
  }
}
