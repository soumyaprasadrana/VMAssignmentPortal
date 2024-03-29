// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-10-30 18:30:37
 * @desc Dynamic Object App Record Component
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
  GridState,
  GridService,
  Formatter,
  FileType,
  SlickGrid,
  Formatters,
  AngularUtilService,
} from 'angular-slickgrid';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../../services/authservice.service';
import { SpinnerService } from '../../services/spinner-service';
import { UIPropService } from '../../services/properties.services';
import { UserService } from '../../services/users.service';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { NodeclientService } from '../../services/nodeclient.service';
import { DynamicObjectAppService } from '../../services/dynamicobjectapp.service';
import { CommonService } from '../../services/common.service';
import { SlickCustomTooltip } from '@slickgrid-universal/custom-tooltip-plugin';
import { DomSanitizer } from '@angular/platform-browser';
import { RichTextComponent } from '../../widget/path/richtext.component';
import { ToastService } from '../../widget/toast/toast-service';
import { Clipboard } from '@angular/cdk/clipboard';
import { UserDefinedFunctionsService } from '../../services/userdefinedfunctions.service';
import { HttpHeaders } from '@angular/common/http';
import { UserDefinedFunctionDialogComponent } from '../../widget/alert-dialog/userdefinedfunction-dialog.component';
import { YornDialogComponent } from '../../widget/alert-dialog/yorn-dialog.component';
@Component({
  selector: 'app-dynamicobject-app-home',
  templateUrl: './dynamicobject-app-home.component.html',
  styleUrls: ['./dynamicobject-app-home.component.scss'],
})
export class DynamicObjectAppHomeComponent implements OnInit {
  columnDef: Column[] = [];
  dynamicobjectappGridOptions!: GridOption;
  dynamicobjectappDataSet!: any[];
  attributeList!: any[];
  funList!:any[];
  userDefinedFunList : any [] = [];
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
  /* rxjs Subscription */
  private subscription!: Subscription;
  selectedRows: any;
  loggedUser: any;
  isDeviceMobilReset: boolean = false;
  defaultPageSizeList: any = [];
  app: any;
  LOCAL_STORAGE_KEY = 'dynamicobjectappGridState';
  DEFAULT_PAGE_SIZE = 25;
  listsScope: any = {};
  isGoingToReset: boolean = false;
  enableform: boolean = false;
  hasUserDefinedFunction:boolean =false;
  /*dynamicobjectappServie-> Virtual Management Service, gss->  Global Search Service*/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dynamicobjectappServie: DynamicObjectAppService,
    private auth: AuthserviceService,
    private spinner: SpinnerService,
    private _props: UIPropService,
    private userService: UserService,
    private dialog: MatDialog,
    private _client: NodeclientService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer,
    private angularUtilService: AngularUtilService,
    private clipboard: Clipboard,
    private toastService:ToastService,
    private funService : UserDefinedFunctionsService
  ) {
    this.app = this.route.snapshot.params.app;
    //Check if application has enable for form submission
    console.log("from router state enable form :: ",history.state);
    if (typeof history.state.enableform != "undefined") {
      console.log("from router state enable form :: ",history.state.enableform);
      this.enableform = history.state.enableform;
    }else{
       var pr=this.dynamicobjectappServie.checkFormEnabled(this.app);
       pr.then((res:any)=>{
        res = JSON.parse(res);
        if(res.enableform){
          this.enableform = res.enableform;
        }
       });
    }
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    var httpOptions = {
      headers: headers,
    };
    var attributeListPromise: any[] = [];
     attributeListPromise.push(this._client
      .get("api/config/redirectToUserdefinedFunctions", httpOptions)
      .then((res: any) => {
        if (res.redirectToUserdefinedFunctions) {
            if(res.redirectToUserdefinedFunctions.hasOwnProperty(this.app)){
              this.router.navigate(['function/'+res.redirectToUserdefinedFunctions[this.app]],{relativeTo:this.route,state:{reload:true}});
            }
        }}));
    
    //Load Technote Data
    this.spinner.setSpinnerState(true); 
    //Load Functions Metadata
    var funPromise =  this.dynamicobjectappServie.getDynamicObjectAppFunctions(
      this.app
    );
    attributeListPromise.push(funPromise);
    funPromise.then((res:any)=>{
      res = JSON.parse(res);
        //console.log(res);
        if (res.status) {
          this.funList = res.data; 
           for (var item in this.funList) {
            if (
              this.funList[item].isUserDefined.value 
            ) {
              this.hasUserDefinedFunction = true;
              this.userDefinedFunList.push(this.funList[item]);
            }
           }
           this.funService.reset();
           this.funService.setApp(this.app);
           this.funService.setParent(this);
           attributeListPromise.push(this.funService.init(this.userDefinedFunList,this));
           
           console.log("=============== FUNSERVICE AFTER INIT =============")
        }
        else {
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
          
        }
    }).catch((err: any) => {
        console.log('error occurred ', err);  
      });  
    this.LOCAL_STORAGE_KEY += '_' + this.app;
    var promiseR = this.dynamicobjectappServie.getDynamicObjectAppRecords(
      this.app
    );
    var promise = this.dynamicobjectappServie.getDynamicObjectAppAttributes(
      this.app
    );
    const presets = JSON.parse(localStorage[this.LOCAL_STORAGE_KEY] || null);
    
    promise
      .then((res: any) => {
        this.spinner.setSpinnerState(false);
        //console.log('inside promise.then -< setting attributes', res);
        res = JSON.parse(res);
        //console.log(res);
        if (res.status) {
          this.attributeList = res.data;
          /*Checking for List type attributes*/
          for (var item in this.attributeList) {
            if (
              this.attributeList[item].type.value.toString().includes('list')
            ) {
              var listArr = this.attributeList[item].type.value
                .toString()
                .split(':');
              var listName = listArr[listArr.length - 1];
              attributeListPromise.push(
                this.commonService
                  .getListItems(listName, item)
                  .then((res: any) => {
                    if (res.res != null && res.res.length != 0) {
                      this.listsScope[this.attributeList[res.item].name.value] =
                        res.res;
                      console.log(
                        'Lists loaded for application : ',
                        this.listsScope
                      );
                    } else {
                      if (this.attributeList[res.item].required) {
                        this.openDialog(
                          {
                            type: 'alert',
                            message:
                              'List load failed for a mandatory field: ' +
                              this.attributeList[res.item].alias.value +
                              '.You may face issue while adding new record,please contact system administrator.',
                          },
                          null
                        );
                      } else {
                        this.openDialog(
                          {
                            type: 'warn',
                            message:
                              'List load failed for field: ' +
                              this.attributeList[res.item].alias.value +
                              '.',
                          },
                          null
                        );
                      }
                    }
                  })
                  .catch((err: any) => {
                    console.log(err);
                    if (this.attributeList[err.item].required) {
                      this.openDialog(
                        {
                          type: 'alert',
                          message:
                            'List load failed for a mandatory field: ' +
                            this.attributeList[err.item].alias.value +
                            '.You may face issue while adding new record,please contact system administrator.',
                        },
                        null
                      );
                    } else {
                      this.openDialog(
                        {
                          type: 'warn',
                          message:
                            'List load failed for field: ' +
                            this.attributeList[err.item].alias.value +
                            '.',
                        },
                        null
                      );
                    }
                  })
              );
            }
          }
          Promise.all(attributeListPromise)
            .then((res: any) => {
              console.log('Promise all ', res);
              this.initDataLoad(promiseR, presets);
            })
            .catch((err: any) => {
              console.log(err);
            });
        } else {
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
          this.isLoaded = false;
          this.isDataloadFailed = true;
        }
      })
      .catch((err: any) => {
        //console.log(err);
        this.spinner.setSpinnerState(false);
        console.log('error occurred ', err);
        this.isLoaded = false;
      });
    this.loggedUser = auth.getUser();
  }
  initDataLoad(promiseR: any, presets: any) {
    this._props.getProps().then((res) => {
      //console.log('Props=>', res);
      this.properties = JSON.parse('' + res);
      var PageSizeList = this.properties.paginationPageSizesList.split(':');
      try {
        for (var item in PageSizeList) {
          this.defaultPageSizeList.push(parseInt(PageSizeList[item]));
        }
      } catch (e) {
        console.log(e);
      }
      promiseR
        .then((res: any) => {
          this.spinner.setSpinnerState(false);
          //console.log('inside promise.then -< setting dynamicobjectappDataSet', res);
          res = JSON.parse(res);
          //console.log(res);
          if (res.status) {
            this.dynamicobjectappDataSet = this.parseObjectRecords(res.data);
            //console.log(this.dynamicobjectappDataSet);
            this.isLoaded = true;
            this.defineGrid(presets);
          } else {
            this.openDialog(
              {
                type: 'alert',
                message: res.message,
              },
              null
            );
            this.isLoaded = false;
            this.isDataloadFailed = true;
          }
        })
        .catch((err: any) => {
          this.spinner.setSpinnerState(false);
          console.log('error occurred ', err);
          this.isLoaded = false;
        });
    });
  }
  parseObjectRecords(data: any): any[] {
    var temp: any[] = [];
    var uniqueid = 1;

 for (var item in data) {
      var tempitem = data[item];
      tempitem.id = uniqueid;
      //tempitem = this.encodeRow(tempitem);
      temp.push(tempitem);
      uniqueid++;
    }
    return temp;
  }
  encodeRow(row:any){
    console.log("encodeRow :: ",row)
    for(var key in row){
      console.log("encodeRow :: row :: key :: before",key,row[key]);
      row[key] = this.encodeHTML(row[key]);
      console.log("encodeRow :: row :: key ::",key,row[key]);
    }
    return row;
  }
  encodeHTML(s:string) {
    if(typeof s == 'string')
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    else
      return s;
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

  addRecord() {
    var state = { attributes: this.attributeList };
    this.router.navigate(['add'], { relativeTo: this.route, state: state });
  }
  viewCharts() {
    var state = {
      attributes: this.attributeList,
      recordData: this.dynamicobjectappDataSet,
    };
    this.router.navigate(['charts'], { relativeTo: this.route, state: state });
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
  openUserDefinedFunctionDialog(data: any, callback: any) {
    this.dialog
      .open(UserDefinedFunctionDialogComponent, {
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
    localStorage[this.LOCAL_STORAGE_KEY] = null;
    this.isGoingToReset = true;
    this.angularGrid.gridService.resetGrid(this.columnDef);
    window.location.reload();

    this.angularGrid.paginationService!.changeItemPerPage(
      this.DEFAULT_PAGE_SIZE
    );
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState() {
    if (!this.isGoingToReset) {
      const gridState: GridState =
        this.angularGrid.gridStateService.getCurrentGridState();
      //console.log('Grid State before destroy :: ', gridState);
      localStorage[this.LOCAL_STORAGE_KEY] = JSON.stringify(gridState);
    }
  }

  /* Define grid Options and Columns */
  defineGrid(gridStatePresets?: GridState) {
    this.spinner.setSpinnerState(true);
    /* Custom Formatter for cells to check snapshot count */
    const cellFormatterDefault: Formatter = (_row, _cell, value, colDef) => {
      if (typeof value == 'undefined') {
        value = '';
      }

      return {
        text: `<div style='text-align:center;width:auto;color:#000;' ><span style='text-align:center'>${value}</span></div>`,
        toolTip: value,
      };
    };
    const cellFormatterDefaultRichText: Formatter = (_row, _cell, value, colDef) => {
      if (typeof value == 'undefined') {
        value = '';
      }

      return {
        text: `<div style='text-align:center;width:auto;color:#000;' ><span style='text-align:center'>${value}</span></div>`,
        toolTip: '',
      };
    };
    const richTextCellFormatterDefault: Formatter = (
      _row,
      _cell,
      value,
      colDef
    ) => {
      if (typeof value == 'undefined') {
        value = '';
      }

      return {
        text: `<ng-template #richTextPopOver>
        <p class="p" >${this.sanitizer.bypassSecurityTrustHtml(value)} </p></ng-template><div [ngbPopover]="richTextPopOver"   placement="bottom" style='text-align:center;width:auto;color:#000;' ><span style='text-align:center' innerHtml="${this.sanitizer.bypassSecurityTrustHtml(value)}"></span></div>`,
        toolTip: value,
      };
    };
    const cellFormaterValueIcon: Formatter = (_row, _cell, value, colDef) => {
      if (typeof value == 'undefined') {
        value = '';
      }
      var html = '';
      if (value == true) {
        html += `<i style=" color: #5cb85c;" class="fa fa-check-circle"></i>`;
      } else {
        html += `<i style="color:#f90000;" class="fa fa-times-circle"></i>`;
      }

      return {
        text: `<div style='text-align:center;width:auto;color:#000;' ><span style='text-align:center'>${html}</span></div>`,
        toolTip: value,
      };
    };
    var getDataFromList: any = (attrName: any, value: any) => {
      var res = '';
      for (var item in this.listsScope[attrName]) {
        var list_item = this.listsScope[attrName][item];
        if (list_item.value.toString() == value.toString()) {
          if (typeof list_item.template == 'undefined') res = list_item.text;
          else res = list_item.template;
          break;
        }
      }
      return res;
    };
    const listAttributeCellFormaterValue: Formatter = (
      _row,
      _cell,
      value,
      colDef
    ) => {
      if (typeof value == 'undefined' || value == null) {
        value = '';
      }
      value =
        getDataFromList(colDef.field, value) != ''
          ? getDataFromList(colDef.field, value)
          : value;

      return {
        text: `<div style='text-align:center;width:auto;color:#000;' ><span style='text-align:center'>${value}</span></div>`,
        toolTip: value,
      };
    };

    this.columnDef = [];
    for (var item in this.attributeList) {
      var formatter = cellFormatterDefault;
      if (this.attributeList[item].type.value.toString().includes('list')) {
        formatter = listAttributeCellFormaterValue;
      }
      if (this.attributeList[item].type.value == 'richtext') {
        this.columnDef.push({
          id: this.attributeList[item].name.value,
          name: this.attributeList[item].alias.value,
          field: this.attributeList[item].name.value,
          sortable: true,
          filterable: true,
          formatter: cellFormatterDefaultRichText,
          filter: { model: Filters.compoundInputText },
          headerCssClass: 'gridRow',
         customTooltip: {
            hideArrow: true,
           headerFormatter: this.headerFormatter.bind(this) as Formatter,
        //    formatter: this.tooltipFormatter.bind(this) as Formatter,
          },
        asyncPostRender: this.renderAngularComponentForRichTextCell.bind(this),
          params: {
            component: RichTextComponent,
            angularUtilService: this.angularUtilService,
          }
        });
      } else if (this.attributeList[item].type.value == 'autokey') {
        this.columnDef.push({
          id: this.attributeList[item].name.value,
          name: this.attributeList[item].alias.value,
          field: this.attributeList[item].name.value,
          sortable: true,
          filterable: true,
          formatter: Formatters.alignCenter,
          filter: { model: Filters.compoundInputNumber },
          headerCssClass: 'gridRow',
          customTooltip: {
            hideArrow: true,
            headerFormatter: this.headerFormatter.bind(this) as Formatter,
          },
        });
      }
      else if (this.attributeList[item].type.value.toString().includes('list')) {
        this.columnDef.push({
          id: this.attributeList[item].name.value,
          name: this.attributeList[item].alias.value,
          field: this.attributeList[item].name.value,
          sortable: true,
          filterable: true,
          formatter: listAttributeCellFormaterValue,
          filter: { model: Filters.compoundInputText },
          headerCssClass: 'gridRow',
          customTooltip: {
            hideArrow: true,
            headerFormatter: this.headerFormatter.bind(this) as Formatter,
          },
        });
      } 
      
      else {
        this.columnDef.push({
          id: this.attributeList[item].name.value,
          name: this.attributeList[item].alias.value,
          field: this.attributeList[item].name.value,
          sortable: true,
          filterable: true,
          formatter: Formatters.alignCenter,
          filter: { model: Filters.compoundInputText },
          headerCssClass: 'gridRow',
          customTooltip: {
            hideArrow: true,
            headerFormatter: this.headerFormatter.bind(this) as Formatter,
          },
        });
      }
    }
    var commandItemsForGrid: any = [
      {
        command: 'view',
        title: 'Open ',
        iconCssClass: 'fa fa-hand-pointer-o',
        positionOrder: 66,
        action: (_event: any, args: any) =>
          /* this.openDialog(
            {
              type: 'message',
              message: args.dataContext.dynamicobjectapp,
            },
            null
          ),*/ this.router.navigate(['view'], {
            relativeTo: this.route,
            state: { recordData: args.dataContext },
          }),
      },

      {
        command: 'edit',
        title: 'Edit ',
        iconCssClass: 'fa fa-pencil',
        positionOrder: 66,
        action: (_event: any, args: any) =>
          this.router.navigate(['edit'], {
            relativeTo: this.route,
            state: { recordData: args.dataContext },
          }),
      },
      {
        command: 'deleteRecord',
        title: 'Remove',
        iconCssClass: 'fa fa-times color-danger',
        cssClass: 'red',
        textCssClass: 'text-italic color-danger-light',
        // only show command to 'Delete Row' when the task is not completed
        itemVisibilityOverride: (args: any) => {
          return true; /*(
            this.loggedUser.permissions.is_admin ||
            this.loggedUser.permissions.is_teamLead ||
            this.loggedUser.permissions.delete_vm
          );*/
        },
       action: async (_event: any, args: any) => {
          const dataContext = args.dataContext;
          const row = args?.row ?? 0;
          let userConfirmation = await this.openYornDialog({
      title: "Prompt",
      message: `<p class="mb-3"><strong>Do you really want to remove this record  "${JSON.stringify(
                dataContext
              )}" ?</strong></p>`,
    });
    if (userConfirmation) {
  
            this.spinner.setSpinnerState(true);
            this.dynamicobjectappServie
              .deleteDynamicObjectAppRecord(this.app, dataContext)
              .then((res: any) => {
                res = JSON.parse(res);
                this.spinner.setSpinnerState(false);
                if (res.status == 'Success') {
                  this.angularGrid.gridService.deleteItemById(dataContext.id);
                  this.openDialog(
                    {
                      type: 'message',
                      message: 'Record removed successfully',
                    },
                    null
                  );
                } else {
                  this.openDialog(
                    {
                      type: 'alert',
                      message: res.message,
                    },
                    null
                  );
                }
              })
              .catch((err: any) => {
                this.spinner.setSpinnerState(false);
                this.openDialog(
                  {
                    type: 'alert',
                    message: err.message,
                  },
                  null
                );
              });
          }
        },
      },
    ];
    

    //console.log('this.defaultPageSizeList', this.defaultPageSizeList);
   var commandItems : any =  [
          // add Custom Items Commands which will be appended to the existing internal custom items
          // you cannot override an internal items but you can hide them and create your own
          // also note that the internal custom commands are in the positionOrder range of 50-60,
          // if you want yours at the bottom then start with 61, below 50 will make your command(s) show on top
          {
            iconCssClass: 'fa fa-plus-circle activated',
            title: 'Add Record',
            disabled: false,
            command: 'addRecord',
            textCssClass: 'title',
            positionOrder: 1,
          },
          {
            iconCssClass: 'fa fa-pie-chart activated',
            title: 'Charts',
            disabled: false,
            command: 'viewCharts',
            textCssClass: 'title',
            positionOrder: 1,
          },
          {
            iconCssClass: 'slick-gridmenu-icon fa fa-file-excel-o text-success',
            title: 'Export to Excel',
            disabled: false,
            command: 'exportExcel',

            textCssClass: 'title',
            positionOrder: 1,
          },
          {
            iconCssClass: 'fa fa-times text-danger',
            title: 'Reset Grid',
            disabled: false,
            command: 'resetGrid',

            textCssClass: 'title',
            positionOrder: 90,
          },
        ];
     
    if(this.enableform){
      commandItems.push({
        iconCssClass: 'fa fa-copy primary-text-color',
        title: 'Copy Form Submission Link',
        disabled: false,
        command: 'formSubmissionLink',
        textCssClass: 'title',
        positionOrder: 91,
      });
    }
    if(this.hasUserDefinedFunction){
      for(var fun of this.userDefinedFunList){
        console.log(fun);
        if(fun.context.value == 'grid'){
          commandItems.push({
            iconCssClass: 'fa fa-copy primary-text-color',
            title: fun.name.value,
            disabled: false,
            command: 'userDefinedFunctionClick',
            functionMetadata: fun,
            textCssClass: 'title',
            positionOrder: 91,
          })
        }else if(fun.context.value == 'row'){
          commandItemsForGrid.push( {
        command: 'userDefinedFunctionClick',
        title: fun.name.value,
        iconCssClass: 'fa fa-copy primary-text-color',
        positionOrder: 99,
        functionMetadata: fun,
        action: (_event: any, args: any) =>{
          if(args.item.functionMetadata.isDialog.value){
            this.openUserDefinedFunctionDialog({
              _funService: this.funService,
              _fun: args.item.functionMetadata.type.value,
              row: args.dataContext
            },null)
          }else{
              this.router.navigate(['function/'+args.item.functionMetadata.type.value], { relativeTo: this.route,state:{row: args.dataContext}});
          }
          }     
          });
      
        }
      }
    }

    //console.log(this.columnDef);
    this.columnDef.push({
      id: 'action',
      name: 'Action',
      field: 'action',
      width: 70,
      minWidth: 70,
      maxWidth: 70,
      excludeFromExport: true,
      excludeFromHeaderMenu: true,
      formatter: () =>
        `<div class="button-style margin-auto" style="width: 35px;"><span class="fa fa-chevron-down text-primary"></span></div>`,
      cellMenu: {
        hideCloseButton: false,
        width: 175,

        commandItems: commandItemsForGrid,
      },
    });
    this.dynamicobjectappGridOptions = {
      gridHeight: '95%',
      autoResize: {
        container: '#dynamicobject-app-grid-container',
        applyResizeToContainer: true,
        rightPadding: 0,
      },
      //forceFitColumns:true,
      contextMenu: {
        hideClearAllGrouping: true,
        commandItems: commandItemsForGrid,
      },
      enableSorting: true,
      enableAutoResize: true,
      enableFiltering: true,
      enablePagination: true,
      enableAsyncPostRender: true, // for the Angular PostRenderer, don't forget to enable it
      asyncPostRenderDelay: 0,
      pagination: {
        pageSizes: this.defaultPageSizeList
          ? this.defaultPageSizeList
          : [5, 10, 20, 25, 50],
        pageSize: 25,
      },
      enableExcelCopyBuffer: true,
      enableExcelExport: true,
      exportOptions: {
        // set at the grid option level, meaning all column will evaluate the Formatter (when it has a Formatter defined)
        exportWithFormatter: true,
        sanitizeDataExport: true,
      },
      registerExternalResources: [
        new SlickCustomTooltip(),
        this.excelExportService,
      ],
      customTooltip: {
        hideArrow: true,
        headerFormatter: this.headerFormatter.bind(this) as Formatter,
      },
      autoTooltipOptions: {
        enableForHeaderCells: true,
      },
      enableCheckboxSelector: false,
      enableRowSelection: false,
      multiSelect: false,

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
        hideForceFitButton: false,
        hideSyncResizeButton: false,
        hideToggleFilterCommand: true, // show/hide internal custom commands
        menuWidth: 17,
        resizeOnShowHeaderRow: true,
        commandItems: commandItems,
        // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
        onCommand: (_e: any, args: any) => {
          if (args.command === 'resetGrid') {
            this.clearGridStateFromLocalStorage();
          } else if (args.command === 'addRecord') {
            this.addRecord();
          } else if (args.command === 'viewCharts') {
            this.viewCharts();
          } else if (args.command === 'exportExcel') {
            //console.log('excelExport :: ', this.excelExportService);

            this.excelExportService.exportToExcel({
              filename:
                this.app + '_' + new Date().toTimeString().replace(' ', '_'),
              format: FileType.xlsx,
            });
          }
          else if(args.command == 'formSubmissionLink'){
            const routerLink = ['/portal/customappform/', this.app];
            const appUrl = this.router.serializeUrl(
                this.router.createUrlTree(routerLink)
            );
            var currentAbsoluteUrl = window.location.href;
            var currentRelativeUrl = this.router.url;
            var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
            var baseUrl = currentAbsoluteUrl.substring(0, index);
            var res=this.clipboard.copy(baseUrl+appUrl);
            console.log(res);
            if(res)
              this.toastService.showSuccess(baseUrl+appUrl+' copied to clipboard.',10000);
          }
          else if(args.command == 'userDefinedFunctionClick'){
            if(args.item.functionMetadata.isDialog.value){
            this.openUserDefinedFunctionDialog({
              _funService: this.funService,
              _fun: args.item.functionMetadata.type.value,
              row: null
            },null)
          }else{
            this.router.navigate(['function/'+args.item.functionMetadata.type.value], { relativeTo: this.route });
          }
          }
        },
        onColumnsChanged: (_e: any, _args: any) => {
          // //console.log('Column selection changed from Grid Menu, visible columns: ', args.columns);
        },
      },
      //Grouping
      enableGrouping: true,
      //Auto tooltip
      enableAutoTooltip: true,
      /*Hide last column by setting preset column
      presets: {
        columns: 
          mappedColumnDefinitions
        
      }*/
    };

    // reload the Grid State with the grid options presets
    if (gridStatePresets) {
      this.dynamicobjectappGridOptions.presets = gridStatePresets;
    }
    if(this.hasUserDefinedFunction)
      this.funService.setGrid(this.dynamicobjectappDataSet)
    this.spinner.setSpinnerState(false);
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    ////console.log('Client sample, Grid State changed:: ', gridStateChanges);
    //alert('onSTateChanged::' + JSON.stringify(gridStateChanges));
    if (!this.isDeviceMobilReset && !this.isGoingToReset) {
      const gridState: GridState =
        this.angularGrid.gridStateService.getCurrentGridState();
      //console.log('Grid State before destroy :: ', gridState);s
      localStorage[this.LOCAL_STORAGE_KEY] = JSON.stringify(gridState);
    }
  }
  tooltipFormatter(
    row: number,
    cell: number,
    value: any,
    column: Column,
    dataContext: any,
    grid: SlickGrid
  ) {
    console.log('Inside ToolTipFormatter :: ');
    if (typeof dataContext[column.id] != 'undefined')
      return `<div style='max-height:500px;max-width:500px;height:auto;width:auto;overflow:auto;'><p>${
        dataContext[column.id]
      }</p></div>
        `;
    else return '';
  }
  headerFormatter(
    row: number,
    cell: number,
    value: any,
    column: Column,
    dataContext: any,
    grid: SlickGrid
  ) {
    return ``;
  }
  renderAngularComponentForRichTextCell(cellNode: HTMLElement, row: number, dataContext: any, colDef: any) {
    console.log("============ DEBUG0 render richtext component called",colDef)
    if (colDef.params.component) {
      const componentOutput = this.angularUtilService.createAngularComponent(colDef.params.component);
       
      Object.assign(componentOutput.componentRef.instance, { data: dataContext[colDef.field],uiprop:this.properties });  
      // use a delay to make sure Angular ran at least a full cycle and make sure it finished rendering the Component
      setTimeout(() => $(cellNode).empty().html(componentOutput.domElement));
    }
  }
  openYornDialog(data: any) {
    return this.dialog
      .open(YornDialogComponent, {
        data: data,
        panelClass: "app-dialog-class",
      })
      .afterClosed()
      .toPromise();
  }
}
