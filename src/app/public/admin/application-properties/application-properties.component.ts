import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  Column,
  Editors,
  Filters,
  Formatter,
  GridOption,
  LongTextEditorOption,
} from '@slickgrid-universal/common';
import { ActivityLog } from '../../DataModel/activitylog';
import { Property } from '../../DataModel/prop';
import { ApplicationpropsService } from '../../services/applicationprops.service';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-application-properties',
  templateUrl: './application-properties.component.html',
  styleUrls: ['./application-properties.component.scss'],
})
export class ApplicationPropertiesComponent implements OnInit {
  displayedColumns: string[] = ['prop_name', 'prop_value'];
  dataSource: any;
  updatePropList: any = {};
  isLoading: boolean = false;
  columnDef: Column[] = [];
  propDataSet!: any[];
  isModified: boolean = false;
  propGridOptions: GridOption = {
    enableSorting: true,
    enableFiltering: true,
    editable: true,
    //Auto tooltip
    enableAutoTooltip: true,
    gridHeight: 400,
    // gridWidth: 900,
    enableAutoSizeColumns: true,
  };
  ngOnInit(): void {
    const cellFormatter: Formatter<Property> = (
      _row,
      _cell,
      value,
      colDef,
      vm
    ) => {
      if (typeof value == 'undefined') {
        value = '';
      }

      return {
        text:
          "<div style='text-align:center;width:100%;'> <input value=" +
          value +
          ' ></input></div>',
        toolTip: value,
      };
    };
    this.columnDef = [
      {
        id: 'prop_name',
        name: 'Property Name',
        field: 'prop_name',
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
      },
      {
        id: 'prop_value',
        name: 'Property Value',
        field: 'prop_value',
        sortable: true,
        filterable: true,
        filter: { model: Filters.compoundInputText },

        headerCssClass: 'gridRow',
        editor: {
          model: Editors.text,
        },
      },
    ];
  }
  constructor(
    private propservice: ApplicationpropsService,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.isLoading = true;
    this._spinner.setSpinnerState(true);
    propservice
      .getgetProps()
      .then((res: any) => {
        this.isLoading = false;
        this._spinner.setSpinnerState(false);
        this.propDataSet = propservice.parseData(res);
        this.dataSource = new MatTableDataSource(this.propDataSet);
      })
      .catch((err: any) => {
        //console.log(err);
        this.isLoading = false;
        this._spinner.setSpinnerState(false);
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  propUpdate(event: any) {
    if (!this.isModified) {
      this.isModified = true;
    }
    this.updatePropList[event.prop_name] = event.prop_value;
  }
  updateProps() {
    if (
      !window.confirm(
        'Update Properties :' + JSON.stringify(this.updatePropList) + ' ?'
      )
    ) {
      return;
    }
    //console.log(this.updatePropList);
    // display form values on success
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var _promise = this._client.post(
      'api/admin/prop/update',
      this.updatePropList,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('Res', JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'Success') {
          this.openDialog(
            {
              type: 'message',
              message: 'Propperties updated successfully!',
            },
            () => {
              window.location.reload();
            }
          );
        } else {
          this._spinner.setSpinnerState(false);
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
        //console.log('Error:', err);
        this._spinner.setSpinnerState(false);
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
      .then((res: any) => {
        if (typeof callback == 'function') {
          callback();
        }
      });
  }
}
