import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { SlickCompositeEditorComponent } from '@slickgrid-universal/composite-editor-component';
import {
  Column,
  GridOption,
  Formatters,
  EditCommand,
  Filters,
  MultipleSelectOption,
  FieldType,
  AngularGridInstance,
  GridStateChange,
  GridState,
  unsubscribeAllObservables,
  Grouping,
  AngularSlickgridComponent,
  GridService,
  Formatter,
  CurrentColumn,
} from 'angular-slickgrid';
import { VM } from '../../DataModel/vm';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../../services/authservice.service';
import { VmsService } from '../../services/vms.service';
import { GlobalSearchService } from '../../services/global-search.service';
import { SpinnerService } from '../../services/spinner-service';
import { UIPropService } from '../../services/properties.services';

const NB_ITEMS = 995;
const LOCAL_STORAGE_KEY = 'gridState';
const DEFAULT_PAGE_SIZE = 25;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  columnDef: Column[] = [];
  vmGridOptions!: GridOption;
  vmDataSet!: any[];
  compositeEditorInstance!: SlickCompositeEditorComponent;
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
  /* rxjs Subscription */
  private subscription!: Subscription;
  /*vms-> Virtual Management Service, gss->  Global Search Service*/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vms: VmsService,
    private gss: GlobalSearchService,
    private auth: AuthserviceService,
    private spinner: SpinnerService,
    private _props: UIPropService
  ) {
    this._props
      .getProps()
      .then((res) => {
        console.log('Props=>', res);
        this.properties = JSON.parse('' + res);
      })
      .catch((error) => {
        console.log(error);
      });

    this.compositeEditorInstance = new SlickCompositeEditorComponent();
    this.subscription = this.gss.getFilterText().subscribe((text) => {
      if (text) {
        console.log('<{Home Component}> Recieved from nav-bar :' + text.text);
        this.setGlobalFilterTextToGrid(text.text);
      } else {
      }
    });
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

  ngOnInit(): void {
    const presets = JSON.parse(localStorage[LOCAL_STORAGE_KEY] || null);

    // use some Grid State preset defaults if you wish or just restore from Locale Storage
    // presets = presets || this.useDefaultPresets();
    this.defineGrid(presets);
    //this.auth.ensureAuth();
  }

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
  assign() {
    console.log('assign clicked');
  }
  release() {
    console.log('release clicked');
  }
  edit(_event: any, args: any) {
    console.log(args);
    this.router.navigate(['../portal/home/vmm/edit'], {
      state: args.dataContext,
    });
  }

  /** Clear the Grid State from Local Storage and reset the grid to it's original state */
  clearGridStateFromLocalStorage() {
    localStorage[LOCAL_STORAGE_KEY] = null;
    this.angularGrid.gridService.resetGrid(this.columnDef);
    this.angularGrid.paginationService!.changeItemPerPage(DEFAULT_PAGE_SIZE);
  }

  /** Save current Filters, Sorters in LocaleStorage or DB */
  saveCurrentGridState() {
    const gridState: GridState =
      this.angularGrid.gridStateService.getCurrentGridState();
    console.log('Client sample, last Grid State:: ', gridState);
    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridState);
  }

  /* Define grid Options and Columns */
  defineGrid(gridStatePresets?: GridState) {
    this.spinner.setSpinnerState(true);
    // prepare a multiple-select array to filter with
    const multiSelectFilterArray = [];
    for (let i = 0; i < NB_ITEMS; i++) {
      multiSelectFilterArray.push({ value: i, label: i });
    }
    /* Custom Formatter for cells to check snapshot count */
    const cellFormatter: Formatter<VM> = (_row, _cell, value, colDef, vm) => {
      if (typeof value == 'undefined') {
        value = '';
      }
      if (
        vm.snap_count >= this.properties.warnSnapshot &&
        vm.snap_count <= this.properties.alertSnapshot
      ) {
        return {
          text: `<div style='text-align:center;width:auto;'> <span  class='warnSnapshot'>${value}</span></div>`,
          toolTip: value,
        };
      } else if (vm.snap_count > this.properties.alertSnapshot) {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center' class='alertSnapshot'>${value}</span></div>`,
          toolTip: value,
        };
      } else {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center'>${value}</span></div>`,
          toolTip: value,
        };
      }
    };
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
      },
      {
        id: 'hostname',
        name: 'Hostname',
        field: 'hostname',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
      },
      {
        id: 'os',
        name: 'OS',
        field: 'os',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
      },
      {
        id: 'ver',
        name: 'OS Version',
        field: 'ver',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
      },
      {
        id: 'group',
        name: 'Group',
        field: 'group',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
      },
      {
        id: 'snap_count',
        name: 'SS #',
        field: 'snap_count',
        sortable: true,
        filterable: true,
        type: FieldType.number,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputNumber },
      },
      {
        id: 'ram',
        name: 'RAM',
        field: 'ram',
        sortable: true,
        filterable: true,
        type: FieldType.number,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputNumber },
      },
      {
        id: 'status',
        name: 'Availability',
        field: 'status',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,

        filter: {
          // We can also add HTML text to be rendered (any bad script will be sanitized) but we have to opt-in, else it will be sanitized
          // enableRenderHtml: true,
          // collection: [{ value: '', label: '' }, { value: true, label: 'True', labelPrefix: `<i class="fa fa-check"></i> ` }, { value: false, label: 'False' }],

          collection: [
            { status: '', label: '' },
            { status: 'Available', label: 'Available' },
            { status: 'Occupied', label: 'Occupied' },
          ],
          customStructure: {
            value: 'status',
            label: 'label',
          },
          model: Filters.singleSelect,

          // we could add certain option(s) to the "multiple-select" plugin
          filterOptions: { autoDropWidth: true } as MultipleSelectOption,
        },
      },
      {
        id: 'owner',
        name: 'Assignee',
        field: 'owner',
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInputText },
        formatter: cellFormatter,
      },
      {
        id: 'comment',
        name: 'Comment',
        field: 'comment',
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInputText },
        formatter: cellFormatter,
      },
      {
        id: 'vm_owner_lab',
        name: 'Owner',
        field: 'vm_owner_lab',
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInputText },
        formatter: cellFormatter,
      },

      {
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
              command: 'assign',
              title: 'Assign',
              iconCssClass: 'fa fa-pencil',
              positionOrder: 66,
              action: () => this.assign(),
            },
            {
              command: 'edit',
              title: 'Edit',
              iconCssClass: 'fa fa-pencil',
              positionOrder: 66,
              action: (_event, args) => this.edit(_event, args),
            },
            {
              command: 'release',
              title: 'Release',
              iconCssClass: 'fa fa-clone',
              positionOrder: 66,
              action: () => this.release(),
            },

            {
              command: 'delete-vm',
              title: 'Remove',
              positionOrder: 64,
              iconCssClass: 'fa fa-times color-danger',
              cssClass: 'red',
              textCssClass: 'text-italic color-danger-light',
              // only show command to 'Delete Row' when the task is not completed
              itemVisibilityOverride: (args) => {
                return !args.dataContext?.completed;
              },
              action: (_event, args) => {
                const dataContext = args.dataContext;
                const row = args?.row ?? 0;
                if (
                  confirm(
                    `Do you really want to remove this vm  with "${dataContext.ip}"`
                  )
                ) {
                  this.angularGrid.gridService.deleteItemById(dataContext.id);
                }
              },
            },
          ],
        },
      },
      {
        id: 'global',
        name: 'global',
        field: 'global',
        sortable: false,
        filterable: true,
        headerCssClass: 'hiddenWidth',
        cssClass: 'hidden',
        filter: { model: '' },
        width: 0,
      },
    ];
    /* Used to hide last global column */
    var mappedColumnDefinitions: CurrentColumn[] = [];
    this.columnDef.forEach((col) => {
      if (col.id !== 'action' && col.id !== 'global') {
        mappedColumnDefinitions.push({ columnId: col.id + '' });
      }
    });
    mappedColumnDefinitions.pop();

    this.columnDef.forEach((columnDef) => {
      if (columnDef.id !== 'action') {
        columnDef.header = {
          menu: {
            items: [
              {
                iconCssClass: 'fa fa-object-group',

                // you can disable a command with certain logic
                // HOWEVER note that if you use "itemUsabilityOverride" has precedence when it is defined
                // disabled: (columnDef.id === 'completed'),

                title: 'Group By', // use "title" as plain string OR "titleKey" when using a translation key
                command: 'groupBy',
                tooltip: 'Group By ' + columnDef.id + '?',
                positionOrder: 1,
                itemUsabilityOverride: (args) => {
                  return !(
                    args.column.id === 'ip' ||
                    args.column.id === 'hostname' ||
                    args.column.id === 'comment' ||
                    args.column.id === 'action'
                  );
                },
                itemVisibilityOverride: (args) => {
                  return !(
                    args.column.id == 'ip' ||
                    args.column.id == 'hostname' ||
                    args.column.id === 'comment' ||
                    args.column.id === 'action'
                  );
                },
                action: (_e, args) => {
                  console.log('Grouping grid by ' + args.column.id + '.');
                  this.groupByColumn(args.column.id + '');
                },
              },
            ],
          },
        };
      }
    });
    this.vmGridOptions = {
      enableSorting: true,
      enableFiltering: true,
      autoResize: {
        container: '#grid-container',
        applyResizeToContainer: true,
        rightPadding: 0,
      },
      enableAutoResize: true,
      enablePagination: true,
      pagination: {
        pageSizes: [5, 10, 20, 25, 50],
        pageSize: 25,
      },

      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: false,
      },
      registerExternalResources: [
        new ExcelExportService(),
        this.compositeEditorInstance,
      ],

      enableCompositeEditor: true,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false,
      },

      enableCheckboxSelector: true,
      enableRowSelection: true,
      multiSelect: false,
      checkboxSelector: {
        hideInFilterHeaderRow: false,
        hideInColumnTitleRow: true,
      },

      editCommandHandler: (item, column, editCommand) => {
        // composite editors values are saved as array, so let's convert to array in any case and we'll loop through these values
        const prevSerializedValues = Array.isArray(
          editCommand.prevSerializedValue
        )
          ? editCommand.prevSerializedValue
          : [editCommand.prevSerializedValue];
        const serializedValues = Array.isArray(editCommand.serializedValue)
          ? editCommand.serializedValue
          : [editCommand.serializedValue];
        const editorColumns = this.columnDef.filter(
          (col) => col.editor !== undefined
        );

        const modifiedColumns: Column[] = [];
        prevSerializedValues.forEach((_val, index) => {
          const prevSerializedValue = prevSerializedValues[index];
          const serializedValue = serializedValues[index];

          if (prevSerializedValue !== serializedValue) {
            const finalColumn = Array.isArray(editCommand.prevSerializedValue)
              ? editorColumns[index]
              : column;
            this.editedItems[this.vmGridOptions.datasetIdPropertyName || 'id'] =
              item; // keep items by their row indexes, if the row got edited twice then we'll keep only the last change
            this.angularGrid.slickGrid.invalidate();
            editCommand.execute();

            this.renderUnsavedCellStyling(item, finalColumn, editCommand);
            modifiedColumns.push(finalColumn);
          }
        });

        // queued editor only keeps 1 item object even when it's a composite editor,
        // so we'll push only 1 change at the end but with all columns modified
        // this way we can undo the entire row change (for example if user changes 3 field in the editor modal, then doing a undo last change will undo all 3 in 1 shot)
        this.editQueue.push({ item, columns: modifiedColumns, editCommand });
      },
      // when using the cellMenu, you can change some of the default options and all use some of the callback methods
      enableCellMenu: true,

      //Grid custom menu
      gridMenu: {
        // we could disable the menu entirely by returning false depending on some code logic
        menuUsabilityOverride: (_args) => true,

        // use the click event position to reposition the grid menu (defaults to false)
        // basically which offset do we want to use for reposition the grid menu,
        // option1 is where we clicked (true) or option2 is where the icon button is located (false and is the defaults)
        // you probably want to set this to True if you use an external grid menu button BUT set to False when using default grid menu
        useClickToRepositionMenu: true,
        iconCssClass: 'fa fa-bars',
        hideForceFitButton: true,
        hideSyncResizeButton: true,
        hideToggleFilterCommand: false, // show/hide internal custom commands
        menuWidth: 17,
        resizeOnShowHeaderRow: true,
        customItems: [
          // add Custom Items Commands which will be appended to the existing internal custom items
          // you cannot override an internal items but you can hide them and create your own
          // also note that the internal custom commands are in the positionOrder range of 50-60,
          // if you want yours at the bottom then start with 61, below 50 will make your command(s) show on top
          {
            iconCssClass: 'fa fa-times text-danger',
            title: 'Reset Grid',
            disabled: false,
            command: 'resetGrid',

            textCssClass: 'title',
            positionOrder: 90,
          },
          {
            iconCssClass: 'fa fa-times text-danger',
            title: 'Reset Grouping',
            disabled: false,
            command: 'resetGrouping',

            textCssClass: 'title',
            positionOrder: 90,
          },
          {
            iconCssClass: 'fa fa-object-group',
            title: 'Switch to group',
            disabled: false,
            command: 'switchToGrouping',

            textCssClass: 'title',
            positionOrder: 90,
          },
        ],
        // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
        onCommand: (_e, args) => {
          if (args.command === 'resetGrid') {
            this.clearGridStateFromLocalStorage();
          } else if (args.command === 'switchToGrouping') {
            this.router.navigate(['/portal/home/group']);
          } else if (args.command === 'resetGrouping') {
            this.clearGridGrouping();
          }
        },
        onColumnsChanged: (_e, _args) => {
          // console.log('Column selection changed from Grid Menu, visible columns: ', args.columns);
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
      this.vmGridOptions.presets = gridStatePresets;
    }

    //Generating Data Set

    var promise = this.vms.getVms();
    promise
      .then((res: any[]) => {
        this.spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting vmdataset');
        this.vmDataSet = res;
        console.log(res);
        this.gridService.resetGrid();
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        console.log('error occurred ', err);
      });

    //If you want to use a observable
    /* this.vms.getVms2().subscribe((data:any)=>{
      console.log("Inside observer")  ;
      var dataSet=this.vms.parseData(data);
        console.log(dataSet);
        this.vmDataSet=dataSet;
        this.gridService.resetGrid();
    });*/
  }
  /* Global Filter */
  setGlobalFilterTextToGrid(text: string) {
    this.angularGrid.filterService.updateFilters([
      { columnId: 'global', searchTerms: [text] },
    ]);
  }
  /** Dispatched event of a Grid State Changed event */
  gridStateChanged(gridStateChanges: GridStateChange) {
    console.log('Client sample, Grid State changed:: ', gridStateChanges);
    // localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridStateChanges.gridState);
  }

  //Group By Column
  groupByColumn(column: string) {
    console.log('Cicked :', column);
    let c = column.toUpperCase();

    this.dataviewObj.setGrouping([
      {
        getter: column,
        formatter: (g) =>
          `${c} : ${g.value}  <span style="color:green">(${g.count} items)</span>`,
        aggregateCollapsed: false,
        lazyTotalsCalculation: true,
      } as Grouping,
    ]);

    // you need to manually add the sort icon(s) in UI
    this.angularGrid.filterService.setSortColumnIcons([
      { columnId: column, sortAsc: true },
    ]);
    this.gridObj.invalidate(); // invalidate all rows and re-render
    this.collapseAllGroups();
    console.log(this.gridObj);

    this.addGroupChildByColumnToTheColumnDef(column);
  }
  addGroupChildByColumnToTheColumnDef(column: string) {
    // let columns=this.gridObj.getColumns();
    this.columnDef.forEach((columnDef: any) => {
      if (columnDef.id !== column && columnDef.id !== 'action') {
        /*PUSH CHILD GROUPING MENU TO THE COLUMN HEADER MENU */
        console.log(columnDef);

        if (!this.isGroupByChildAdded) {
          columnDef.header.menu.items.push({
            iconCssClass: 'fa fa-object-group',

            // you can disable a command with certain logic
            // HOWEVER note that if you use "itemUsabilityOverride" has precedence when it is defined
            // disabled: (columnDef.id === 'completed'),

            title: 'Group By Child', // use "title" as plain string OR "titleKey" when using a translation key
            command: 'groupByChild',
            tooltip: 'Add child group by to existing grouping data ?',
            positionOrder: 2,
            itemUsabilityOverride: (args: { column: { id: string } }) => {
              return !(
                args.column.id === 'ip' ||
                args.column.id === 'hostname' ||
                args.column.id === 'comment'
              );
            },
            itemVisibilityOverride: (args: { column: { id: string } }) => {
              return !(
                args.column.id == 'ip' ||
                args.column.id == 'hostname' ||
                args.column.id === 'comment'
              );
            },
            action: (_e: any, args: { column: { id: string } }) => {
              console.log('Child grouping grid by ' + args.column.id + '.');
              this.groupByColumnAddChild(args.column.id + '');
            },
          });
        }
      }
    });

    // this.gridObj.setColumns(columns);
    this.isGroupByChildAdded = true;
    this.columnDef = this.columnDef.slice();
  }
  /* Help to add child grouping to parent groups*/
  groupByColumnAddChild(column: string) {
    /* Store the existing grouping set */
    let list = this.dataviewObj.getGrouping();
    if (list.length == 0) {
      console.log('No Parent group found adding it as parent object...');
    }
    let c = column.toUpperCase();
    list.push({
      getter: column,
      formatter: (g) =>
        `${c} : ${g.value}  <span style="color:green">(${g.count} items)</span>`,
      aggregateCollapsed: false,
      lazyTotalsCalculation: true,
    } as Grouping);
    this.dataviewObj.setGrouping(list);

    // you need to manually add the sort icon(s) in UI
    this.angularGrid.filterService.setSortColumnIcons([
      { columnId: column, sortAsc: true },
    ]);
    this.gridObj.invalidate(); // invalidate all rows and re-render
    this.expandAllGroups();
  }
  //Clear Grouping
  clearGrouping() {
    this.dataviewObj.setGrouping([]);
  }
  //Collapse grouping
  collapseAllGroups() {
    this.dataviewObj.collapseAllGroups();
  }
  //Expand Groups
  expandAllGroups() {
    this.dataviewObj.expandAllGroups();
  }
  clearGridGrouping() {
    this.dataviewObj.setGrouping([]);
  }
}
