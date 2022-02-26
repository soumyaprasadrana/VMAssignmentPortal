// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Home Page Component
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import {
  Column,
  GridOption,
  EditCommand,
  Filters,
  MultipleSelectOption,
  FieldType,
  AngularGridInstance,
  GridStateChange,
  GridState,
  Grouping,
  GridService,
  Formatter,
  CurrentColumn,
  FileType,
  MenuCommandItem,
} from 'angular-slickgrid';
import { VM } from '../../DataModel/vm';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../../services/authservice.service';
import { VmsService } from '../../services/vms.service';
import { GlobalSearchService } from '../../services/global-search.service';
import { SpinnerService } from '../../services/spinner-service';
import { UIPropService } from '../../services/properties.services';
import { UserService } from '../../services/users.service';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { AdditionalDataDialogComponent } from '../../widget/alert-dialog/additional-data-dialog';
import { NodeclientService } from '../../services/nodeclient.service';
import { FileChooseDialogComponent } from '../../widget/alert-dialog/file-choose-dialog.component';

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
  osList: any;
  osTypes: any = [];
  osVersiontypes: any = [];
  /*vms-> Virtual Management Service, gss->  Global Search Service*/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vms: VmsService,
    private gss: GlobalSearchService,
    private auth: AuthserviceService,
    private spinner: SpinnerService,
    private _props: UIPropService,
    private userService: UserService,
    private dialog: MatDialog,
    private _client: NodeclientService
  ) {
    //Load VM Data
    this.spinner.setSpinnerState(true);
    var promise = this.vms.getVms();

    //If you want to use a observable
    /* this.vms.getVms2().subscribe((data:any)=>{
      //console.log("Inside observer")  ;
      var dataSet=this.vms.parseData(data);
        //console.log(dataSet);
        this.vmDataSet=dataSet;
        this.gridService.resetGrid();
    });*/
    this._props
      .getProps()
      .then((res) => {
        //console.log('Props=>', res);
        this.properties = JSON.parse('' + res);
        this.defaultPageSizeList =
          this.properties.paginationPageSizesList.split(':');
        this.osList = this.properties.osList.split('#');
        try {
          this.osTypes.push({ osType: '', value: '' });
          this.osVersiontypes.push({ osVersionTypes: '', value: '' });
          for (var item in this.osList) {
            var temp = this.osList[item].split(':');
            this.osTypes.push({ osType: temp[0], value: temp[0] });
            this.osVersiontypes.push({
              osVersionTypes: temp[1],
              value: temp[1],
            });
          }
          this.osTypes = [
            ...new Map(
              this.osTypes.map((item: any) => [item['osType'], item])
            ).values(),
          ];
        } catch (e) {
          console.log(e);
        }

        /*console.log(
          ' this.properties.paginationPageSizesList=>',
          this.properties
        );*/
        const presets = JSON.parse(localStorage[LOCAL_STORAGE_KEY] || null);

        // use some Grid State preset defaults if you wish or just restore from Locale Storage
        // presets = presets || this.useDefaultPresets();
        this.defineGrid(presets);
        //this.auth.ensureAuth();
        promise
          .then((res: any[]) => {
            this.spinner.setSpinnerState(false);
            ////console.log('inside promise.then -< setting vmdataset');
            this.vmDataSet = res;
            ////console.log(res);
            this.isLoaded = true;
          })
          .catch((err: any) => {
            this.spinner.setSpinnerState(false);
            //console.log('error occurred ', err);
            this.isLoaded = false;
          });
      })
      .catch((error) => {
        //console.log(error);
      });

    this.subscription = this.gss.getFilterText().subscribe((text) => {
      if (text) {
        //console.log('<{Home Component}> Recieved from nav-bar :' + text.text);
        this.setGlobalFilterTextToGrid(text.text);
      } else {
      }
    });
    this.loggedUser = auth.getUser();
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
  onSelectedRowsChanged(_eventData: any, _args: any) {
    if (Array.isArray(_args.rows)) {
      this.selectedRows = _args.rows.map((idx: any) => {
        const item = this.gridObj.getDataItem(idx);
        return item.ip;
      });
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
  assign(_event: any, args: any) {
    //console.log('assign clicked');

    this.spinner.setSpinnerState(true);

    this.userService
      .getUsers()
      .then((res) => {
        var isincludedielectedRows = this.checkIsIncludes(
          this.selectedRows,
          args.dataContext.ip
        );
        this.userList = res;
        if (
          typeof this.selectedRows != 'undefined' &&
          this.selectedRows.length > 1 &&
          isincludedielectedRows
        ) {
          //console.log('selected rows true');
          args.ipList = this.selectedRows;
          this.assignMultipleVMS(this.userList, args);
        } else {
          this.getData(this.userList, args);
        }
        //this.spinner.setSpinnerState(false);
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
      });
    this.spinner.setSpinnerState(false);
  }
  getAddtionalData(_event: any, _args: any) {
    const dataContext = _args.dataContext;
    this.openAdditionalDataDialog(
      { title: 'Addtional Data', ip: dataContext.ip },
      (res: any) => {
        if (res.status == 'Success') {
          this.openDialog(
            {
              type: 'message',
              message:
                'Additional Data for VM ' +
                dataContext.ip +
                ' updated successfully.',
            },
            null
          );
        } else if (res.status == 'Failed') {
          this.openDialog(
            {
              type: 'message',
              message: res.message,
            },
            null
          );
        } else if (res.status == 500) {
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
        }
      }
    );
  }
  addComment(_event: any, args: any) {
    //const dataContext = args.dataContext;
    this.addCommentDialog(args);
  }
  updateComment(_event: any, args: any) {
    //const dataContext = args.dataContext;
    this.addCommentDialog(args, args.dataContext.comment);
  }
  deleteComment(_event: any, args: any) {
    //const dataContext = args.dataContext;
    this.vms
      .addComment(args.dataContext.ip, '')
      .then((res2: any) => {
        //console.log('Assign Result: ', res2);
        res2 = JSON.parse(res2);
        if (res2.status == 'Success') {
          this.vms.setNeedRefresh(true);
          const dataContext = args.dataContext;
          var updated: any = args.dataContext;
          updated.comment = '';
          this.angularGrid.gridService.updateItemById(dataContext.id, updated);
        } else {
          this.openDialog(
            {
              type: 'alert',
              message: res2.message,
            },
            null
          );
        }
        this.spinner.setSpinnerState(false);
      })
      .catch((error: any) => {
        this.spinner.setSpinnerState(false);
        this.openDialog(
          {
            type: 'alert',
            message: error.message,
          },
          null
        );
      });
  }
  addCommentDialog(args: any, defaultVal?: string) {
    //console.log(list);
    var defaultValue = null;
    if (defaultVal) defaultValue = defaultVal;
    this.openDialogInput(
      {
        title: 'Add Comment',
        label: 'Comment',
        bindLabel: 'comment',
        isText: true,
        titleIcon: true,
        iconClass: 'fa fa-comments-o',
        defaultValue: defaultValue,
      },
      (res: any) => {
        //console.log('data from close:', res);
        //console.log('args vm detail', args);
        res = res.dataCtrl;
        this.spinner.setSpinnerState(true);
        this.vms
          .addComment(args.dataContext.ip, res)
          .then((res2: any) => {
            //console.log('Assign Result: ', res2);
            res2 = JSON.parse(res2);
            if (res2.status == 'Success') {
              this.vms.setNeedRefresh(true);
              const dataContext = args.dataContext;
              var updated: any = args.dataContext;
              updated.comment = res;
              this.angularGrid.gridService.updateItemById(
                dataContext.id,
                updated
              );
            } else {
              this.openDialog(
                {
                  type: 'alert',
                  message: res2.message,
                },
                null
              );
            }
            this.spinner.setSpinnerState(false);
          })
          .catch((error: any) => {
            this.spinner.setSpinnerState(false);
            this.openDialog(
              {
                type: 'alert',
                message: error.message,
              },
              null
            );
          });
      }
    );
  }
  release(_event: any, args: any) {
    //console.log(this.selectedRows);
    const dataContext = args.dataContext;

    var isincludedielectedRows = this.checkIsIncludes(
      this.selectedRows,
      args.dataContext.ip
    );
    if (
      typeof this.selectedRows != 'undefined' &&
      this.selectedRows.length > 1 &&
      isincludedielectedRows
    ) {
      if (!window.confirm('Release selected vms ?')) {
        return;
      }
      args.ipList = this.selectedRows;
      this.vms
        .releaseMultipleVMS(args.ipList)
        .then((res2: any) => {
          //console.log('Assign Result: ', res2);
          res2 = JSON.parse(res2);
          var refreshRequired: boolean = false;
          if (res2.resultList) {
            var html = '<h3>Result </h3>';
            html +=
              '<table class="table table-striped dataTable ">' +
              '<th>IP</th>' +
              '<th>Status</th>' +
              '<th>Message</th>';
            for (var i = 0; i < res2.resultList.length; i++) {
              var item: any = res2.resultList[i];
              html += '<tr>';
              html += '<td>';
              html += item.ip;
              html += '</td>';

              html += '<td>';
              html += '<div>';
              if (item.status == 'Success') {
                refreshRequired = true;
                html +=
                  '<span ><i class="fa fa-check-circle text-success"></i></span>';
              } else {
                html +=
                  '<span ><i class="fa fa-times-circle text-danger"></i></span>';
              }
              html += '<span>';

              html += '</span>';
              html += '</td>';

              html += '<td>';
              if (typeof item.message != 'undefined') html += item.message;
              html += '</td>';

              html += '</tr>';
            }
            html += '</table>';
            if (refreshRequired) {
              this.openDialog(
                {
                  type: 'message',
                  message: html,
                },
                (res: any) => {
                  window.location.reload();
                }
              );
            } else {
              this.openDialog(
                {
                  type: 'message',
                  message: html,
                },
                null
              );
            }
          } else {
            this.openDialog(
              {
                type: 'alert',
                message: res2.message,
              },
              null
            );
          }
          this.spinner.setSpinnerState(false);
        })
        .catch((error: any) => {
          this.spinner.setSpinnerState(false);
          this.openDialog(
            {
              type: 'alert',
              message: error.message,
            },
            null
          );
        });
      return;
    }
    if (!window.confirm('Release VM:' + dataContext.ip + '?')) {
      return;
    }
    this.spinner.setSpinnerState(true);
    this.vms
      .releaseVM(args.dataContext.ip)
      .then((res2: any) => {
        //console.log('Release Result: ', res2);
        res2 = JSON.parse(res2);
        if (res2.status == 'Success') {
          this.vms.setNeedRefresh(true);
          const dataContext = args.dataContext;
          var updated: any = args.dataContext;
          updated.owner = '';
          updated.status = 'Available';
          this.angularGrid.gridService.updateItemById(dataContext.id, updated);
        } else {
          this.openDialog(
            {
              type: 'alert',
              message: res2.message,
            },
            null
          );
        }
        this.spinner.setSpinnerState(false);
      })
      .catch((error: any) => {
        this.spinner.setSpinnerState(false);
        this.openDialog(
          {
            type: 'alert',
            message: error.message,
          },
          null
        );
      });
  }
  edit(_event: any, args: any) {
    //console.log(args);
    var isincludedielectedRows = this.checkIsIncludes(
      this.selectedRows,
      args.dataContext.ip
    );
    if (
      typeof this.selectedRows != 'undefined' &&
      this.selectedRows.length > 1 &&
      isincludedielectedRows
    ) {
      var state = { ipList: this.selectedRows };
      this.router.navigate(['../portal/home/vmm/selectededit'], {
        state: state,
      });
      return;
    }
    this.router.navigate(['../portal/home/vmm/edit'], {
      state: args.dataContext,
    });
  }
  openSSHTools(_event: any, args: any) {
    //console.log(args);
    this.spinner.setSpinnerState(true);
    this.vms
      .getVMAdditionalData(args.dataContext.ip)
      .then((res: any) => {
        this.spinner.setSpinnerState(false);
        res = JSON.parse(res);
        //console.log('VM Additional Data Res-', res);
        if (res.status == 'SUCCESS') {
          args.dataContext.extradata = res.vmextra_data;
        }
        this.router.navigate(['../portal/home/tools/ltb'], {
          state: args.dataContext,
        });
      })
      .catch((error: any) => {
        this.spinner.setSpinnerState(false);
        this.router.navigate(['../portal/home/tools/ltb'], {
          state: args.dataContext,
        });
      });
  }
  assignMultipleVMS(list: any, args: any) {
    ////console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a user',
        label: 'Username',
        placeholder: 'Select user',
        list: list,
        bindLabel: 'user_id',
      },
      (res: any) => {
        //console.log('data from close:', res);
        //console.log('args vm detail', args);
        res = res.dataCtrl.user_id;
        this.spinner.setSpinnerState(true);
        this.vms
          .assignMultipleVMS(args.ipList, res)
          .then((res2: any) => {
            //console.log('Assign Result: ', res2);
            res2 = JSON.parse(res2);
            var refreshRequired: boolean = false;
            if (res2.resultList) {
              var html = '<h3>Result </h3>';
              html +=
                '<table class="table table-striped dataTable ">' +
                '<th>IP</th>' +
                '<th>Status</th>' +
                '<th>Message</th>';
              for (var i = 0; i < res2.resultList.length; i++) {
                var item: any = res2.resultList[i];
                html += '<tr>';
                html += '<td>';
                html += item.ip;
                html += '</td>';

                html += '<td>';
                html += '<div>';
                if (item.status == 'Success') {
                  refreshRequired = true;
                  html +=
                    '<span ><i class="fa fa-check-circle text-success"></i></span>';
                } else {
                  html +=
                    '<span ><i class="fa fa-times-circle text-danger"></i></span>';
                }
                html += '<span>';

                html += '</span>';
                html += '</td>';

                html += '<td>';
                if (typeof item.message != 'undefined') html += item.message;
                html += '</td>';

                html += '</tr>';
              }
              html += '</table>';
              if (refreshRequired) {
                this.openDialog(
                  {
                    type: 'message',
                    message: html,
                  },
                  (res: any) => {
                    window.location.reload();
                  }
                );
              } else {
                this.openDialog(
                  {
                    type: 'message',
                    message: html,
                  },
                  null
                );
              }
            } else {
              this.openDialog(
                {
                  type: 'alert',
                  message: res2.message,
                },
                null
              );
            }
            this.spinner.setSpinnerState(false);
          })
          .catch((error: any) => {
            this.spinner.setSpinnerState(false);
            this.openDialog(
              {
                type: 'alert',
                message: error.message,
              },
              null
            );
          });
      }
    );
  }

  getData(list: any, args: any) {
    //console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a user',
        label: 'Username',
        placeholder: 'Select user',
        list: list,
        bindLabel: 'user_id',
      },
      (res: any) => {
        //console.log('data from close:', res);
        //console.log('args vm detail', args);
        res = res.dataCtrl.user_id;
        this.spinner.setSpinnerState(true);
        this.vms
          .assignVM(args.dataContext.ip, res)
          .then((res2: any) => {
            //console.log('Assign Result: ', res2);
            res2 = JSON.parse(res2);
            if (res2.status == 'Success') {
              this.vms.setNeedRefresh(true);
              const dataContext = args.dataContext;
              var updated: any = args.dataContext;
              updated.owner = res;
              updated.status = 'Occupied';
              this.angularGrid.gridService.updateItemById(
                dataContext.id,
                updated
              );
            } else {
              this.openDialog(
                {
                  type: 'alert',
                  message: res2.message,
                },
                null
              );
            }
            this.spinner.setSpinnerState(false);
          })
          .catch((error: any) => {
            this.spinner.setSpinnerState(false);
            this.openDialog(
              {
                type: 'alert',
                message: error.message,
              },
              null
            );
          });
      }
    );
  }
  openAdditionalDataDialog(data: any, callback: any) {
    this.dialog
      .open(AdditionalDataDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        //console.log('res from dialog=>', res);

        if (typeof callback == 'function') {
          callback(res);
        }
      })
      .catch((err) => {
        //console.log('err from dialog=>', err);

        this.openDialog(
          {
            type: 'alert',
            message: err.message,
          },
          null
        );
      });
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
  openImportDialog(data: any, callback: any) {
    this.dialog
      .open(FileChooseDialogComponent, {
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
    if (this._client.deviceIsMobile()) {
      localStorage[LOCAL_STORAGE_KEY] = JSON.stringify({
        // the column position in the array is very important and represent
        // the position that will show in the grid
        columns: [
          { columnId: 'ip' },
          { columnId: 'status' },
          { columnId: 'owner' },
          { columnId: 'action' },
        ],
      });
      this.isDeviceMobilReset = true;
      window.location.reload();
    } else {
      localStorage[LOCAL_STORAGE_KEY] = null;
      this.angularGrid.gridService.resetGrid(this.columnDef);
      window.location.reload();
    }
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

    const statusCellFormatter: Formatter<VM> = (
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
      if (vm.status == 'Available') {
        //console.log('statusCellFormatter: Available true', vm.status);
        return {
          text: `<div style='text-align:center;width:auto;'> <span style='text-align:center;padding:5px;' class='alert show alert-success'>${value}</span></div>`,
          toolTip: value,
        };
      } else if (vm.status == 'Occupied') {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center;padding:5px;' class='alert show alert-dark'>${value}</span></div>`,
          toolTip: value,
        };
      } else {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center'>${value}</span></div>`,
          toolTip: value,
        };
      }
    };
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
    var addComment: MenuCommandItem = {
      command: 'add-domment',
      title: 'Add Comment',
      iconCssClass: 'fa fa-edit',
      // only show command to 'Delete Row' when the task is not completed
      itemVisibilityOverride: (args: any) => {
        return !args.dataContext?.completed;
      },
      action: (_event: any, args: any) => {
        const dataContext = args.dataContext;
        const row = args?.row ?? 0;
        if (
          confirm(`Do you really want to remove this vm  "${dataContext.ip}"?`)
        ) {
          this.spinner.setSpinnerState(true);
          this.vms
            .deleteVM(dataContext.ip)
            .then((res: any) => {
              res = JSON.parse(res);
              this.spinner.setSpinnerState(false);
              if (res.status == 'Success') {
                this.angularGrid.gridService.deleteItemById(dataContext.id);
                this.openDialog(
                  {
                    type: 'message',
                    message: 'VM removed successfully',
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
    };
    var tempOsFiler = {
      // We can also add HTML text to be rendered (any bad script will be sanitized) but we have to opt-in, else it will be sanitized
      // enableRenderHtml: true,
      // collection: [{ value: '', label: '' }, { value: true, label: 'True', labelPrefix: `<i class="fa fa-check"></i> ` }, { value: false, label: 'False' }],

      collection: this.osTypes,
      customStructure: {
        value: 'value',
        label: 'osType',
      },
      model: Filters.singleSelect,

      // we could add certain option(s) to the "multiple-select" plugin
      filterOptions: { autoDropWidth: true } as MultipleSelectOption,
    };
    var tempostypefilter = {
      // We can also add HTML text to be rendered (any bad script will be sanitized) but we have to opt-in, else it will be sanitized
      // enableRenderHtml: true,
      // collection: [{ value: '', label: '' }, { value: true, label: 'True', labelPrefix: `<i class="fa fa-check"></i> ` }, { value: false, label: 'False' }],

      collection: this.osVersiontypes,
      customStructure: {
        value: 'value',
        label: 'osVersionTypes',
      },
      model: Filters.singleSelect,

      // we could add certain option(s) to the "multiple-select" plugin
      filterOptions: { autoDropWidth: true } as MultipleSelectOption,
    };
    var osFilterModel;
    var osVersionTypeModel;
    if (this.osTypes) {
      osFilterModel = tempOsFiler;
    } else {
      osFilterModel = { model: Filters.compoundInputText };
    }
    if (this.osVersiontypes) {
      osVersionTypeModel = tempostypefilter;
    } else {
      osVersionTypeModel == { model: Filters.compoundInputText };
    }
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
        filter: osFilterModel,
      },
      {
        id: 'ver',
        name: 'OS Version',
        field: 'ver',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: osVersionTypeModel,
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
      /* {
        id: 'snap_count',
        name: 'SS #',
        field: 'snap_count',
        sortable: true,
        filterable: true,
        type: FieldType.number,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputNumber },
      },*/
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
        formatter: statusCellFormatter,

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

      /* {
        id: 'global',
        name: 'global',
        field: 'global',
        sortable: false,
        filterable: true,
        headerCssClass: 'hiddenWidth',
        cssClass: 'hidden',
        filter: { model: '' },
        width: 0,
      },*/
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
            command: 'assign',
            title: 'Assign',
            iconCssClass: 'fa fa-hand-pointer-o',
            positionOrder: 66,
            itemVisibilityOverride: (args: any) => {
              // console.log('itemVisibilityOverride :: ', args);
              return (
                args.dataContext.owner == null ||
                args.dataContext.owner == '' ||
                args.dataContext.owner.length == 0
              );
            },
            action: (_event, args) => this.assign(_event, args),
          },

          {
            command: 'release',
            title: 'Release',
            iconCssClass: 'fa fa-hand-pointer-o',
            positionOrder: 66,
            itemVisibilityOverride: (args: any) => {
              //console.log('itemVisibilityOverride :: ', args);
              return (
                args.dataContext.owner != null &&
                args.dataContext.owner != '' &&
                args.dataContext.owner.length > 0
              );
            },
            action: (_event, args) => this.release(_event, args),
          },
          {
            command: 'addComment',
            title: 'Add Comment',
            iconCssClass: 'fa fa fa-comments-o',
            itemVisibilityOverride: (args: any) => {
              // console.log('itemVisibilityOverride :: ', args);
              return (
                args.dataContext.comment == null ||
                args.dataContext.comment == '' ||
                args.dataContext.comment.length == 0
              );
            },
            positionOrder: 66,
            action: (_event, args) => this.addComment(_event, args),
          },
          {
            command: 'updateComment',
            title: 'Update Comment',
            iconCssClass: 'fa fa fa-comments-o',
            itemVisibilityOverride: (args: any) => {
              //console.log('itemVisibilityOverride :: ', args);
              return (
                args.dataContext.comment != null &&
                args.dataContext.comment != '' &&
                args.dataContext.comment.length > 0
              );
            },
            positionOrder: 66,
            action: (_event, args) => this.updateComment(_event, args),
          },
          {
            command: 'removeComment',
            title: 'Remove Comment',
            iconCssClass: 'fa fa fa-comments-o color-danger',
            textCssClass: 'text-italic color-danger-light',
            itemVisibilityOverride: (args: any) => {
              //console.log('itemVisibilityOverride :: ', args);
              return (
                args.dataContext.comment != null &&
                args.dataContext.comment != '' &&
                args.dataContext.comment.length > 0
              );
            },
            positionOrder: 66,
            action: (_event, args) => this.deleteComment(_event, args),
          },
          {
            command: 'edit',
            title: 'Edit',
            iconCssClass: 'fa fa-pencil',
            positionOrder: 66,
            action: (_event, args) => this.edit(_event, args),
          },
          {
            command: 'addtionaldata',
            title: 'Additiona Data',
            iconCssClass: 'fa fa-list',
            positionOrder: 66,
            action: (_event, args) => this.getAddtionalData(_event, args),
          },
          {
            command: 'sshTool',
            title: 'Open SSH Tools',
            iconCssClass: 'fa fa-terminal',
            positionOrder: 66,
            action: (_event, args) => this.openSSHTools(_event, args),
          },

          {
            command: 'delete-vm',
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
                  `Do you really want to remove this vm  "${dataContext.ip}"?`
                )
              ) {
                this.spinner.setSpinnerState(true);
                this.vms
                  .deleteVM(dataContext.ip)
                  .then((res: any) => {
                    res = JSON.parse(res);
                    this.spinner.setSpinnerState(false);
                    if (res.status == 'Success') {
                      this.vms.setNeedRefresh(true);
                      this.angularGrid.gridService.deleteItemById(
                        dataContext.id
                      );
                      this.openDialog(
                        {
                          type: 'message',
                          message: 'VM removed successfully',
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
                  //console.log('Grouping grid by ' + args.column.id + '.');
                  this.groupByColumn(args.column.id + '');
                },
              },
            ],
          },
        };
      }
    });
    console.log('this.defaultPageSizeList', this.defaultPageSizeList);
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
      registerExternalResources: [this.excelExportService],

      // enableCompositeEditor: true,
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
            iconCssClass: 'slick-gridmenu-icon fa fa-file-excel-o text-success',
            title: 'Export to Excel',
            disabled: false,
            command: 'exportExcel',

            textCssClass: 'title',
            positionOrder: 1,
          },
          {
            iconCssClass: 'slick-gridmenu-icon fa fa-file-excel-o text-success',
            title: 'Import from Excel',
            disabled: false,
            command: 'importExcel',
            itemVisibilityOverride: (args): boolean => {
              return this.loggedUser.permissions.is_admin;
            },
            textCssClass: 'title',
            positionOrder: 2,
          },
        ],
        // you can use the "action" callback and/or use "onCallback" callback from the grid options, they both have the same arguments
        onCommand: (_e: any, args: any) => {
          if (args.command === 'resetGrid') {
            this.clearGridStateFromLocalStorage();
          } else if (args.command === 'resetGrouping') {
            this.clearGridGrouping();
          } else if (args.command === 'exportExcel') {
            //console.log('excelExport :: ', this.excelExportService);
            this.openDialogInput(
              {
                title: 'Excel Export',
                label: 'Filename',
                bindLabel: 'file_name',
                isText: true,
                titleIcon: true,
                iconClass:
                  'slick-gridmenu-icon fa fa-file-excel-o text-success',
              },
              (res: any) => {
                this.excelExportService.exportToExcel({
                  filename: res.dataCtrl,
                  format: FileType.xlsx,
                });
              }
            );
          } else if (args.command === 'importExcel') {
            //console.log('excelExport :: ', this.excelExportService);
            this.openImportDialog(
              {
                title: 'Excel Import',
                label: 'Filename',
                bindLabel: 'file_name',
                isText: true,
                titleIcon: true,
                iconClass:
                  'slick-gridmenu-icon fa fa-file-excel-o text-success',
              },
              (res: any) => {
                console.log('Importexcel file :', res);
              }
            );
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
      this.vmGridOptions.presets = gridStatePresets;
    }
    // alert('gridStatePresets' + JSON.stringify(gridStatePresets));
    //  alert('this._client.deviceIsMobile():' + this._client.deviceIsMobile());
    if (!gridStatePresets && this._client.deviceIsMobile()) {
      // alert('seeting for mobile');
      this.vmGridOptions.presets = {
        // the column position in the array is very important and represent
        // the position that will show in the grid
        columns: [
          { columnId: 'ip' },
          { columnId: 'status' },
          { columnId: 'owner' },
          { columnId: 'action' },
        ],
      };
    }
    this.spinner.setSpinnerState(false);
  }
  /* Global Filter */
  setGlobalFilterTextToGrid(text: string) {
    this.angularGrid.filterService.updateFilters([
      { columnId: 'global', searchTerms: [text] },
    ]);
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

  //Group By Column
  groupByColumn(column: string) {
    //console.log('Cicked :', column);
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
    //console.log(this.gridObj);

    this.addGroupChildByColumnToTheColumnDef(column);
  }
  addGroupChildByColumnToTheColumnDef(column: string) {
    // let columns=this.gridObj.getColumns();
    this.columnDef.forEach((columnDef: any) => {
      if (columnDef.id !== column && columnDef.id !== 'action') {
        /*PUSH CHILD GROUPING MENU TO THE COLUMN HEADER MENU */
        //console.log(columnDef);

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
              //console.log('Child grouping grid by ' + args.column.id + '.');
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
      //console.log('No Parent group found adding it as parent object...');
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
