// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Snapshots Grid Component
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  Column,
  GridOption,
  EditCommand,
  Filters,
  AngularGridInstance,
  GridStateChange,
  GridService,
  Formatter,
  FileType,
  SlickGrid,
} from 'angular-slickgrid';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../../services/authservice.service';
import { SpinnerService } from '../../services/spinner-service';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { NodeclientService } from '../../services/nodeclient.service';
import { VmsService } from '../../services/vms.service';
import { ToastService } from '../../widget/toast/toast-service';
import { SlickCustomTooltip } from '@slickgrid-universal/custom-tooltip-plugin';

@Component({
  selector: 'app-snapshots-grid',
  templateUrl: './snapshots-grid.html',
  styleUrls: ['./snapshots-grid.scss'],
})
export class SnapshotsGridComponent implements OnInit {
  columnDef: Column[] = [];
  gridOptions!: GridOption;
  gridDataset!: any[];
  isLoaded: boolean = false;
  isDataloadFailed: boolean = false;
  angularGrid!: AngularGridInstance;
  editQueue: any[] = [];
  editedItems: any = {};
  isGridEditable = true;
  isCompositeDisabled = false;
  isMassSelectionDisabled = true;
  gridObj: any;
  dataviewObj: any;
  gridService!: GridService;
  isGroupByChildAdded: boolean = false;
  properties: any = {};
  userList: any = [];
  excelExportService: any = new ExcelExportService();
  customTooltipService:any = new SlickCustomTooltip();
  /* rxjs Subscription */
  private subscription!: Subscription;
  selectedRows: any;
  loggedUser: any;
  isDeviceMobilReset: boolean = false;
  defaultPageSizeList: any;
  isSnapshotCount: boolean =false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vms:VmsService,
    private spinner: SpinnerService,
    private dialog: MatDialog,
    private _client: NodeclientService,
    private auth:AuthserviceService,
    private toastService:ToastService
  ) {
    this.loggedUser=auth.getUser();
    //Load All Snapshots Data
    this.spinner.setSpinnerState(true);
    if(typeof history.state.action != 'undefined'){
      if(history.state.action=='search'){
        this.spinner.setSpinnerState(false);
        this.openDialogInput({
          title: 'Search Snapshots',
          label: 'Keyword',
          placeholder: 'Enter keyword',
          isText:true,
          closeCallback: () => {
            this.router.navigate(['..'],{relativeTo:this.route});
          }
        },(res:any)=>{
          this.spinner.setSpinnerState(true);
          var promise = this.vms.searchSnapshots(res.dataCtrl);
    promise
      .then((res:any) => {
        this.spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting gridDataSet', res);
        this.gridDataset = res;
        console.log(res);
        this.defineGrid();
        this.isLoaded = true;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        console.log('error occurred ', err);
        try{
          err=JSON.parse(err);
        }catch(e){}
        if(this.loggedUser.useToast){
          this.toastService.showDanger(err.message,5000);
          this.router.navigate([".."],{relativeTo:this.route});
        }
        else{
          this.openDialog({
            type:'alert',
            message: err.message
          },()=>{
            this.router.navigate([".."],{relativeTo:this.route});
          })
        }
        
        this.isLoaded = false;
        
      });
        });
      }
    else if(history.state.action=='all'){
      var promise = this.vms.getAllSnapshots();
       promise
      .then((res:any) => {
        this.spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting gridDataSet', res);
        this.gridDataset = res;
        console.log(res);
        this.defineGrid();
        this.isLoaded = true;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        console.log('error occurred ', err);
        try{
          err=JSON.parse(err);
        }catch(e){}
        if(this.loggedUser.useToast){
          this.toastService.showDanger(err.message,5000);
          this.router.navigate([".."],{relativeTo:this.route});
        }
        else{
          this.openDialog({
            type:'alert',
            message: err.message
          },()=>{
            this.router.navigate([".."],{relativeTo:this.route});
          })
        }
        this.isLoaded = false;
      });
    }
    else if(history.state.action=='count'){
      var promise = this.vms.getAllSnapshotsCount();
       promise
      .then((res:any) => {
        this.spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting gridDataSet', res);
        this.gridDataset = res;
        console.log(res);
        this.isSnapshotCount=true;
        this.defineGrid();
        this.isLoaded = true;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        console.log('error occurred ', err);
        try{
          err=JSON.parse(err);
        }catch(e){}
        if(this.loggedUser.useToast){
          this.toastService.showDanger(err.message,5000);
          this.router.navigate([".."],{relativeTo:this.route});
        }
        else{
          this.openDialog({
            type:'alert',
            message: err.message
          },()=>{
            this.router.navigate([".."],{relativeTo:this.route});
          })
        }
        this.isLoaded = false;
      });
    }
    }
    
    else{
      this.spinner.setSpinnerState(false);
      if(this.loggedUser.useToast){
        this.toastService.showDanger("No action selected!",5000);
        this.router.navigate([".."],{relativeTo:this.route});
      }
      else{
        this.openDialog({
          type:'alert',
          message: "No action selected!"
        },()=>{
          this.router.navigate([".."],{relativeTo:this.route});
        })
      }
    }
    
  }
  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataviewObj = angularGrid.dataView;
    this.gridService = angularGrid.gridService;
    const delay = 100; // delay in milliseconds
    this.angularGrid.resizerService.resizeGrid(delay);
  }

  ngOnDestroy() {
    // also unsubscribe all Angular Subscriptions
  }

  ngOnInit(): void {}

  renderUnsavedStylingOnAllVisibleCells() {
    for (const lastEdit of this.editQueue) {
      if (lastEdit) {
        const { item, columns, editCommand } = lastEdit;
        if (Array.isArray(columns)) {
          columns.forEach((col) => {
            this.renderUnsavedCellStyling(item, col, editCommand);
          });
        }
      }
    }
  }

  renderUnsavedCellStyling(
    item: any,
    column: Column,
    editCommand: EditCommand
  ) {
    if (editCommand && item && column) {
      const row = this.angularGrid.dataView.getRowByItem(item) as number;
      if (row >= 0) {
        const hash = { [row]: { [column.id]: 'unsaved-editable-field' } };
        this.angularGrid.slickGrid.setCellCssStyles(
          `unsaved_highlight_${[column.id]}${row}`,
          hash
        );
      }
    }
  }
  checkIsIncludes(list: any, key: string) {
    //console.log('checkIsIncludes :: ', list);
    for (var item in list) {
      //console.log(item);
      if (list[item] == key) return true;
    }
    return false;
  }

  addTechnote() {
    this.router.navigate(['/portal/home/tools/technotes/add']);
  }
  openDialog(data: any, callback: any) {
    this.dialog
      .open(AlertDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        if (typeof callback == 'function') {
          callback(res);
        }
      });
  }
  openDialogInput(data: any, callback: any) {
    this.dialog
      .open(InputDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',

        width: '500px',
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        //console.log(res);
        if (typeof callback == 'function' && res != '' && res != null) {
          callback(res);
        }
      });
  }

  /** Clear the Grid State from Local Storage and reset the grid to it's original state */
  clearGridStateFromLocalStorage() {
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState() {
  }

  /* Define grid Options and Columns */
  defineGrid() {
    this.spinner.setSpinnerState(true);
    /* Custom Formatter for cells to check snapshot count */
    const cellFormatter: Formatter<any> = (_row, _cell, value, colDef, vm) => {
      if (typeof value == 'undefined') {
        value = '';
      }

      return {
        text: `<div style='text-align:center;width:auto;color:#000;' ><span  class="badge" style='text-align:center'>${value}</span></div>`,
        toolTip: value,
      };
    };
    const statusCellFormatter: Formatter<any> = (
      _row,
      _cell,
      value,
      colDef,
      vm
    ) => {
      if (typeof value == 'undefined') {
        value = '';
      }
      //console.log(
      //    'statusCellFormatter: Available true',
      //  vm.status,
      //   'Ce;ll no:',
      //  _cell
      //  );
      if (vm.status == 'Available' || vm.status == 'true' || vm.status == true) {
        //console.log('statusCellFormatter: Available true', vm.status);
        return {
          text: `<div style='text-align:center;width:auto;'> <span style='text-align:center;padding:5px;' class='badge badge-success'>Available</span></div>`,
          toolTip: value,
        };
      } else if (vm.status == 'Occupied' || vm.status == 'false' || vm.status == false) {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center;padding:5px;' class='badge badge-secondary'>Occupied</span></div>`,
          toolTip: value,
        };
      } else {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center'>${value}</span></div>`,
          toolTip: value,
        };
      }
    };
    if(!this.isSnapshotCount){
    this.columnDef = [
      {
        id: 'name',
        name: 'Name',
        field: 'name',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'description',
        name: 'Description',
        field: 'description',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'ip',
        name: 'IP Address',
        field: 'ip',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      
      {
        id: 'hostname',
        name: 'Hostname',
        field: 'hostname',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'os',
        name: 'OS',
        field: 'os',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'status',
        name: 'Status',
        field: 'status',
        sortable: true,
        filterable: true,
        formatter: statusCellFormatter,
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      
      {
        id: 'owner',
        name: 'Assignee',
        field: 'owner',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      
    ];
  }
  else{
    this.columnDef = [
      {
        id: 'ip',
        name: 'IP Address',
        field: 'ip',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      
      {
        id: 'hostname',
        name: 'Hostname',
        field: 'hostname',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'os',
        name: 'OS',
        field: 'os',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'count',
        name: 'Count',
        field: 'count',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'status',
        name: 'Status',
        field: 'status',
        sortable: true,
        filterable: true,
        formatter: statusCellFormatter,
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      {
        id: 'owner',
        name: 'Assignee',
        field: 'owner',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        customTooltip:{
          hideArrow:true,
          headerFormatter:this.headerFormatter.bind(this) as Formatter
        }
      },
      
    ];
  }
    console.log('this.defaultPageSizeList', this.defaultPageSizeList);
    this.gridOptions = {
      gridHeight:'95%',
      autoResize: {
        container: '#snapshots-grid-container',
        applyResizeToContainer: true,
        rightPadding: 0,
      },
      enableSorting: true,
      enableAutoResize: true,
      enableFiltering: true,
      enablePagination: true,
      pagination: {
        pageSizes: this.defaultPageSizeList
          ? this.defaultPageSizeList
          : [50,100,200,400,1000,10000],
        pageSize: 25,
      },
      enableExcelCopyBuffer: true,
      enableExcelExport: true,
      enableCheckboxSelector: false,
      enableRowSelection: false,
      multiSelect: false,
      registerExternalResources: [this.customTooltipService,this.excelExportService],

      // when using the cellMenu, you can change some of the default options and all use some of the callback methods
      enableCellMenu: true,
      //Grid custom menu
      gridMenu: {
        hideExportExcelCommand: true,
        // we could disable the menu entirely by returning false depending on some code logic
        menuUsabilityOverride: (_args: any) => true,
        
        // use the click event position to reposition the grid menu (defaults to false)
        // basically which offset do we want to use for reposition the grid menu,
        // option1 is where we clicked (true) or option2 is where the icon button is located (false and is the defaults)
        // you probably want to set this to True if you use an external grid menu button BUT set to False when using default grid menu
        
        iconCssClass: 'fa fa-bars',
        hideForceFitButton: true,
        hideSyncResizeButton: true,
        hideToggleFilterCommand: true, // show/hide internal custom commands
        menuWidth: 17,
        resizeOnShowHeaderRow: true,
        commandItems: [
          // add Custom Items Commands which will be appended to the existing internal custom items
          // you cannot override an internal items but you can hide them and create your own
          // also note that the internal custom commands are in the positionOrder range of 50-60,
          // if you want yours at the bottom then start with 61, below 50 will make your command(s) show on top
        
          {
            iconCssClass: 'slick-gridmenu-icon fa fa-file-excel-o text-success',
            title: 'Export to Excel',
            disabled: false,
            command: 'exportExcel',

            textCssClass: 'title',
            positionOrder: 1,
          },
        ],
        // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
        onCommand: (_e: any, args: any) => {
          if (args.command === 'resetGrid') {
            this.clearGridStateFromLocalStorage();
          } 
          else if (args.command === 'exportExcel') {
            //console.log('excelExport :: ', this.excelExportService);
            
            this.excelExportService.exportToExcel({
              filename: 'Snapshot_List'+'_'+new Date().toTimeString().replace(' ','_'),
              format: FileType.xlsx,
            });
          }
        },
        onColumnsChanged: (_e: any, _args: any) => {
          // //console.log('Column selection changed from Grid Menu, visible columns: ', args.columns);
        },
      },
      //Auto tooltip
      enableAutoTooltip: true,
      /*Hide last column by setting preset column
      presets: {
        columns: 
          mappedColumnDefinitions
        
      }*/
    };
    this.spinner.setSpinnerState(false);
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
   
  }
  headerFormatter(row: number, cell: number, value: any, column: Column, dataContext: any, grid: SlickGrid) {
    return '';
 }
}
