import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SlickCompositeEditorComponent } from '@slickgrid-universal/composite-editor-component';
import { Column, GridOption ,Formatters
  ,EditCommand,Filters,MultipleSelectOption,FieldType,AngularGridInstance,GridStateChange,
  GridState,unsubscribeAllObservables,Grouping,AngularSlickgridComponent, GridService
} from 'angular-slickgrid';
import { Subscription } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { VmsService
 } from '../../services/vms.service';
 import { SpinnerService } from '../../services/spinner-service';
const NB_ITEMS = 995;
const LOCAL_STORAGE_KEY = 'gridState';
const DEFAULT_PAGE_SIZE = 25;
@Component({
  selector: 'app-home-page-group',
  templateUrl: './home-page-group.component.html',
  styleUrls: ['./home-page-group.component.scss'],
 
})
export class HomePageGroupComponent implements OnInit {
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
  isGroupByChildAdded:boolean=false;
  gridService!: GridService;
  /* rxjs Subscription */
  private subscriptions: Subscription[] = [];
  
  constructor(
    private route: ActivatedRoute,private router: Router,private vms:VmsService,private spinner:SpinnerService

  ) { 
    this.compositeEditorInstance = new SlickCompositeEditorComponent();
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

    

    
    
}



renderUnsavedCellStyling(item: any, column: Column, editCommand: EditCommand) {
  if (editCommand && item && column) {
    const row = this.angularGrid.dataView.getRowByItem(item) as number;
    if (row >= 0) {
      const hash = { [row]: { [column.id]: 'unsaved-editable-field' } };
      this.angularGrid.slickGrid.setCellCssStyles(`unsaved_highlight_${[column.id]}${row}`, hash);
    }
  }
}

mockData(count: number) {
  // mock a dataset
  const mockDataset = [];
  for (let i = 0; i < count; i++) {
    
    const randomCount = Math.floor(Math.random() * 5);
    const randomCountOS = Math.floor(Math.random() * 3);
    const randomCountStatus = Math.floor(Math.random() * 3);
    var group=['Group1','Group2','Group3','Group4','Group5','Group6']
    var os=['Windows','Linux','AIX']
    var status=['Available','Occupied']
    var owner=['Soumya','Ashutosh','Hitesh']
    mockDataset[i] = {
      id:i,
      ip: '17.20.152.'+i,
      hostname: 'icdvm152' + i,
      os: os[randomCountOS],
      ver: 'Version '+i,
      group:group[randomCount],
      snap_count: Math.floor(Math.random() * 10)+1,
      ram: randomCountOS,
      status: status[randomCountStatus],
      owner:owner[randomCountStatus],
      comment:'XYZ'+ i +randomCountStatus+randomCount+randomCountOS,
      vm_owner_lab:owner[randomCountStatus]
    };
  }

  return mockDataset;
}

/** Clear the Grid State from Local Storage and reset the grid to it's original state */
clearGridStateFromLocalStorage() {
  localStorage[LOCAL_STORAGE_KEY] = null;
  this.angularGrid.gridService.resetGrid(this.columnDef);
  this.angularGrid.paginationService!.changeItemPerPage(DEFAULT_PAGE_SIZE);
}


/** Save current Filters, Sorters in LocaleStorage or DB */
saveCurrentGridState() {
  const gridState: GridState = this.angularGrid.gridStateService.getCurrentGridState();
  console.log('Client sample, last Grid State:: ', gridState);
  localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(gridState);
}


/* Define grid Options and Columns */
defineGrid(gridStatePresets?: GridState) {
  // prepare a multiple-select array to filter with
  const multiSelectFilterArray = [];
  for (let i = 0; i < NB_ITEMS; i++) {
    multiSelectFilterArray.push({ value: i, label: i });
  }

  this.columnDef = [
    { id: 'ip', name: 'IP Address', field: 'ip', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText },headerCssClass: 'gridRow'
   },
    { id: 'hostname', name: 'Hostname', field: 'hostname', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText } },
    { id: 'os', name: 'OS', field: 'os', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText } },
    { id: 'ver', name: 'OS Version', field: 'ver', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText } },
    { id: 'group', name: 'Group', field: 'group', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText } },
    { id: 'snap_count', name: 'SS #', field: 'snap_count', sortable: true,filterable: true,  type: FieldType.number,
    filter: { model: Filters.compoundInputNumber } },
    { id: 'ram', name: 'RAM', field: 'ram', sortable: true,filterable: true,   type: FieldType.number,
    filter: { model: Filters.compoundInputNumber } },
    { id: 'status', name: 'Availability', field: 'status', sortable: true,filterable: true, 
   
    
    filter: {
      // We can also add HTML text to be rendered (any bad script will be sanitized) but we have to opt-in, else it will be sanitized
      // enableRenderHtml: true,
      // collection: [{ value: '', label: '' }, { value: true, label: 'True', labelPrefix: `<i class="fa fa-check"></i> ` }, { value: false, label: 'False' }],

      collection: [{ status: '', label: '' }, { status: 'Available', label: 'Available' }, { status: 'Occupied', label: 'Occupied' }],
      customStructure: {
        value: 'status',
        label: 'label'
      },
      model: Filters.singleSelect,

      // we could add certain option(s) to the "multiple-select" plugin
      filterOptions: { autoDropWidth: true } as MultipleSelectOption,
    }
  
  
  },
    { id: 'owner', name: 'Assignee', field: 'owner', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText } },
    { id: 'comment', name: 'Comment', field: 'comment', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText } },
    { id: 'vm_owner_lab', name: 'Owner', field: 'vm_owner_lab', sortable: true,filterable: true, 
    filter: { model: Filters.compoundInputText } }
   
    
  ];
  this.columnDef.forEach((columnDef) => {
   
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
            tooltip: 'Group By '+columnDef.id+ '?',
            positionOrder: 1,
            itemUsabilityOverride: (args) => {
             
              return !(args.column.id === 'ip' || args.column.id === 'hostname' || args.column.id === 'comment' );
            },
            itemVisibilityOverride: (args) => {
              
              return !(args.column.id == 'ip' || args.column.id == 'hostname' || args.column.id === 'comment' );
            },
            action: (_e, args) => {
              console.log( "Grouping grid by "+ args.column.id +".");
              this.groupByColumn(args.column.id+'');
            }
          }
        ]
      }
    }
  
  });
  this.vmGridOptions = {
    enableAutoResize: true,
    enableSorting: true,
    enableFiltering: true,
    autoResize: {
      container: '#grid-container',
      applyResizeToContainer : true,
      rightPadding:0
    },
    enablePagination: true,
      pagination: {
        pageSizes: [5, 10, 20, 25, 50],
        pageSize: 25
      },

      enableExcelExport: true,
      excelExportOptions: {
        exportWithFormatter: false
      },
      registerExternalResources: [new ExcelExportService(), this.compositeEditorInstance],

      enableCompositeEditor: true,
      rowSelectionOptions: {
        // True (Single Selection), False (Multiple Selections)
        selectActiveRow: false
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
            title: 'Reset Grouping',
            disabled: false,
            command: 'resetGrouping',
               
            textCssClass: 'title',
            positionOrder: 90,
           
          },
          {
            iconCssClass: 'fa fa-random',
            title: 'Return Home',
            disabled: false,
            command: 'returnHome',
               
            textCssClass: 'title',
            positionOrder: 90,
           
          }
         
        ],
        // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
        onCommand: (_e, args) => {
         
          if(args.command === 'resetGrouping') {
            this.clearGridGrouping();
          }
          else if(args.command === 'returnHome') {
            this.router.navigate(['/portal/home']);
          }
        },
        onColumnsChanged: (_e, _args) => {
         // console.log('Column selection changed from Grid Menu, visible columns: ', args.columns);
        }
      },
      //Grouping
      enableGrouping: true,
      //Auto tooltip
      enableAutoTooltip: true
    }

   

    //Generating Data Set
    this.spinner.setSpinnerState(true);
    var promise = this.vms.getVms();
    promise.then((res: any[])=>{
      this.spinner.setSpinnerState(false);
      console.log("inside promise.then -< setting vmdataset");
      this.vmDataSet=res;
      console.log(res);
      this.gridService.resetGrid();
      
    }).catch((err:any)=>{
      this.spinner.setSpinnerState(true);
      console.log("error occurred "+err)
    });
    
}



//Group By Column
groupByColumn(column:string) {
  console.log("Cicked :",column);
  let c=column.toUpperCase();

  this.dataviewObj.setGrouping([{
    getter: column,
    formatter: (g) => `${c} : ${g.value}  <span style="color:green">(${g.count} items)</span>`,
    aggregateCollapsed: false,
    lazyTotalsCalculation: true
  } as Grouping]);
 
  
  // you need to manually add the sort icon(s) in UI
  this.angularGrid.filterService.setSortColumnIcons([{ columnId: column, sortAsc: true }]);
  this.gridObj.invalidate(); // invalidate all rows and re-render
  this.collapseAllGroups();
  console.log(this.gridObj)
  
 this.addGroupChildByColumnToTheColumnDef(column)

}
addGroupChildByColumnToTheColumnDef(column: string){
  // let columns=this.gridObj.getColumns();
  this.columnDef.forEach((columnDef: any) => {
    if(columnDef.id !== column ){
    /*PUSH CHILD GROUPING MENU TO THE COLUMN HEADER MENU */
    console.log(columnDef);
    
    if(!this.isGroupByChildAdded){
    columnDef.header.menu.items.push({
      iconCssClass: 'fa fa-object-group',

      // you can disable a command with certain logic
      // HOWEVER note that if you use "itemUsabilityOverride" has precedence when it is defined
      // disabled: (columnDef.id === 'completed'),

      title: 'Group By Child', // use "title" as plain string OR "titleKey" when using a translation key
      command: 'groupByChild',
      tooltip: 'Add child group by to existing grouping data ?',
      positionOrder: 2,
      itemUsabilityOverride: (args: { column: { id: string; }; }) => {
       
        return !(args.column.id === 'ip' || args.column.id === 'hostname' || args.column.id === 'comment' );
      },
      itemVisibilityOverride: (args: { column: { id: string; }; }) => {
        
        return !((args.column.id == 'ip' || args.column.id == 'hostname' || args.column.id === 'comment' ) );
      },
      action: (_e: any, args: { column: { id: string; }; }) => {
        console.log( "Child grouping grid by "+ args.column.id +".");
        this.groupByColumnAddChild(args.column.id+'');
      }
    });
  }
  }
  });
  
 // this.gridObj.setColumns(columns);
 this.isGroupByChildAdded=true;
 this.columnDef = this.columnDef.slice();
}
/* Help to add child grouping to parent groups*/
groupByColumnAddChild( column: string){
  
  /* Store the existing grouping set */
  let list = this.dataviewObj.getGrouping();
  if(list.length==0){
    console.log("No Parent group found adding it as parent object...");
  }
  let c= column.toUpperCase();
  list.push({
    getter: column,
    formatter: (g) => `${c} : ${g.value}  <span style="color:green">(${g.count} items)</span>`,
    aggregateCollapsed: false,
    lazyTotalsCalculation: true
  } as Grouping);
  this.dataviewObj.setGrouping(list);

  // you need to manually add the sort icon(s) in UI
  this.angularGrid.filterService.setSortColumnIcons([{ columnId: column, sortAsc: true }]);
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
clearGridGrouping(){
  this.dataviewObj.setGrouping([]);
}




}
