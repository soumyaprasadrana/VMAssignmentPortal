// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Tools Technotes Component
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
} from 'angular-slickgrid';
import { VM } from '../../DataModel/vm';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../../services/authservice.service';
import { SpinnerService } from '../../services/spinner-service';
import { UIPropService } from '../../services/properties.services';
import { UserService } from '../../services/users.service';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { NodeclientService } from '../../services/nodeclient.service';
import { TechnotesService } from '../../services/technotes.service';

const LOCAL_STORAGE_KEY = 'technotesGridState';
const DEFAULT_PAGE_SIZE = 25;
@Component({
  selector: 'app-tools-technotes',
  templateUrl: './tools-technotes.component.html',
  styleUrls: ['./tools-technotes.component.scss'],
})
export class ToolsTechnotesComponent implements OnInit {
  columnDef: Column[] = [];
  technotesGridOptions!: GridOption;
  technotesDataSet!: any[];
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
  defaultPageSizeList: any;

  /*technotesServie-> Virtual Management Service, gss->  Global Search Service*/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private technotesServie: TechnotesService,
    private auth: AuthserviceService,
    private spinner: SpinnerService,
    private _props: UIPropService,
    private userService: UserService,
    private dialog: MatDialog,
    private _client: NodeclientService
  ) {
    //Load Technote Data
    this.spinner.setSpinnerState(true);
    var promise = this.technotesServie.getTechnotes();

    const presets = JSON.parse(localStorage[LOCAL_STORAGE_KEY] || null);

    promise
      .then((res: any[]) => {
        this.spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting technotesDataSet', res);
        this.technotesDataSet = res;
        console.log(res);
        this.isLoaded = true;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
        this.isLoaded = false;
      });
    this.loggedUser = auth.getUser();
    this.defineGrid(presets);
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
    localStorage[LOCAL_STORAGE_KEY] = null;
    this.angularGrid.gridService.resetGrid(this.columnDef);
    window.location.reload();

    this.angularGrid.paginationService!.changeItemPerPage(DEFAULT_PAGE_SIZE);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState() {
    const gridState: GridState =
      this.angularGrid.gridStateService.getCurrentGridState();
    //console.log('Grid State before destroy :: ', gridState);
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridState);
  }

  /* Define grid Options and Columns */
  defineGrid(gridStatePresets?: GridState) {
    this.spinner.setSpinnerState(true);
    /* Custom Formatter for cells to check snapshot count */
    const cellFormatter: Formatter<VM> = (_row, _cell, value, colDef, vm) => {
      if (typeof value == 'undefined') {
        value = '';
      }

      return {
        text: `<div style='text-align:center;width:auto;color:#000;' ><span style='text-align:center'>${value}</span></div>`,
        toolTip: value,
      };
    };
    const isGlobalFormatter: Formatter<VM> = (
      _row,
      _cell,
      value,
      colDef,
      vm
    ) => {
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
    const descFormatter: Formatter<VM> = (_row, _cell, value, colDef, vm) => {
      if (typeof value == 'undefined') {
        value = '';
      }

      return {
        text: `<div style='text-align:center;width:auto;color:#000;' ><b><span style='text-align:center'>${value}</span></b></div>`,
        toolTip: value,
      };
    };
    const keywordCellFormatter: Formatter<VM> = (
      _row,
      _cell,
      value,
      colDef,
      vm
    ) => {
      if (typeof value == 'undefined') {
        value = '';
      }
      var html = '';
      var list = value.split(',');
      //console.log(list.length)

      if (list.length == 1 || value == '') {
        html = `<div style='text-align:center;width:auto;'><span style='text-align:center'>${value}</span></div>`;
      } else {
        html += `<div style='text-align:center;width:auto;height:50px;overflow-x:auto;overflow-y:hidden;'>`;
        for (var item in list) {
          html += `<span class="keyword-container ml-1">
          <span class="keyword p-1">${list[item]}</span>
      </span>`;
        }
        html += '</div>';
      }

      return {
        text: html,
        toolTip: value,
      };
    };
    this.columnDef = [
      {
        id: 'id',
        name: 'ID',
        field: 'id',
        sortable: true,
        filterable: true,
        width: 5,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
      },
      {
        id: 'description',
        name: 'Description',
        field: 'description',
        sortable: true,
        filterable: true,
        width: 60,
        formatter: descFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
      },
      {
        id: 'keywords',
        name: 'Keywords',
        field: 'keywords',
        sortable: true,
        filterable: true,
        formatter: keywordCellFormatter,
        filter: { model: Filters.compoundInputText },
      },
      {
        id: 'is_global',
        name: 'Is Global Technote?',
        field: 'is_global',
        sortable: true,
        filterable: true,
        width: 10,
        formatter: isGlobalFormatter,
      },
    ];
    if (this.loggedUser.permissions.is_admin) {
      this.columnDef.push({
        id: 'team',
        name: 'Team',
        field: 'team',
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInputText },
        formatter: cellFormatter,
      });
    }
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

        commandItems: [
          {
            command: 'view',
            title: 'Open Technote',
            iconCssClass: 'fa fa-hand-pointer-o',
            positionOrder: 66,
            action: (_event, args) =>
              /* this.openDialog(
                {
                  type: 'message',
                  message: args.dataContext.technotes,
                },
                null
              ),*/ this.router.navigate([
                '/portal/home/tools/technotes/view/',
                args.dataContext.id,
              ]),
          },

          {
            command: 'edit',
            title: 'Edit Technote',
            iconCssClass: 'fa fa-pencil',
            positionOrder: 66,
            action: (_event, args) =>
              this.router.navigate([
                '/portal/home/tools/technotes/edit/',
                args.dataContext.id,
              ]),
          },
          {
            command: 'deleteTechnote',
            title: 'Remove',
            iconCssClass: 'fa fa-times color-danger',
            cssClass: 'red',
            textCssClass: 'text-italic color-danger-light',
            // only show command to 'Delete Row' when the task is not completed
            itemVisibilityOverride: (args: any) => {
              return (
                this.loggedUser.permissions.is_admin ||
                this.loggedUser.permissions.is_teamLead ||
                this.loggedUser.permissions.delete_vm
              );
            },
            action: (_event: any, args: any) => {
              const dataContext = args.dataContext;
              const row = args?.row ?? 0;
              if (
                confirm(
                  `Do you really want to remove this technote  "${dataContext.description}"?`
                )
              ) {
                this.spinner.setSpinnerState(true);
                this.technotesServie
                  .deleteTechnote(dataContext.id)
                  .then((res: any) => {
                    res = JSON.parse(res);
                    this.spinner.setSpinnerState(false);
                    if (res.status == 'Success') {
                      this.technotesServie.setNeedRefresh(true);
                      this.angularGrid.gridService.deleteItemById(
                        dataContext.id
                      );
                      this.openDialog(
                        {
                          type: 'message',
                          message: 'Technote deleted successfully',
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
        ],
      },
    });

    console.log('this.defaultPageSizeList', this.defaultPageSizeList);
    this.technotesGridOptions = {
      rowHeight: 50,
      autoResize: {
        container: '#grid-container',
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
          : [5, 10, 20, 25, 50],
        pageSize: 25,
      },
      enableExcelCopyBuffer: false,
      enableExcelExport: false,

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
        useClickToRepositionMenu: true,
        iconCssClass: 'fa fa-bars',
        hideForceFitButton: true,
        hideSyncResizeButton: true,
        hideToggleFilterCommand: true, // show/hide internal custom commands
        menuWidth: 17,
        resizeOnShowHeaderRow: true,
        customItems: [
          // add Custom Items Commands which will be appended to the existing internal custom items
          // you cannot override an internal items but you can hide them and create your own
          // also note that the internal custom commands are in the positionOrder range of 50-60,
          // if you want yours at the bottom then start with 61, below 50 will make your command(s) show on top
          {
            iconCssClass: 'fa fa-plus-circle',
            title: 'Add Technote',
            disabled: false,
            command: 'addTechnote',
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
        ],
        // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
        onCommand: (_e: any, args: any) => {
          if (args.command === 'resetGrid') {
            this.clearGridStateFromLocalStorage();
          } else if (args.command === 'addTechnote') {
            this.addTechnote();
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
      this.technotesGridOptions.presets = gridStatePresets;
    }

    this.spinner.setSpinnerState(false);
  }

  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    ////console.log('Client sample, Grid State changed:: ', gridStateChanges);
    //alert('onSTateChanged::' + JSON.stringify(gridStateChanges));
    if (!this.isDeviceMobilReset) {
      const gridState: GridState =
        this.angularGrid.gridStateService.getCurrentGridState();
      //console.log('Grid State before destroy :: ', gridState);
      localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridState);
    }
  }
}
