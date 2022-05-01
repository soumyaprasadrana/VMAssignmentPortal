// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Team Activity Logs Component
 */
import { Component, OnInit } from '@angular/core';
import { Column, GridOption } from '@slickgrid-universal/common';
import { Filters, Formatter, Formatters } from 'angular-slickgrid';
import { ActivityLog } from '../../DataModel/activitylog';
import { VM } from '../../DataModel/vm';
import { ActivitylogsService } from '../../services/activitylogs.service';
import { SpinnerService } from '../../services/spinner-service';

@Component({
  selector: 'app-team-activity-logs',
  templateUrl: './team-activity-logs.component.html',
  styleUrls: ['./team-activity-logs.component.scss'],
})
export class TeamActivityLogsComponent implements OnInit {
  isLoadingActivityList: boolean = false;
  endOfData: boolean = false;
  lastPage: boolean = false;
  startOfData: boolean = true;
  onNext: boolean = false;
  alDataSet!: any[];
  firstPage: any[] = [];
  /* Custom Formatter for cells to check snapshot count */

  columnDef: Column[] = [];
  alGridOptions: GridOption = {
    gridHeight:400,
    enableSorting: false,
    enableFiltering: false,
    enableExcelExport: false,
    //Auto tooltip
    enableAutoTooltip: true,
    //gridHeight: ,
    // gridWidth: 900,
    enableAutoSizeColumns: true,
    //autoHeight: true,
  };

  ngOnInit(): void {
    const cellFormatter: Formatter<ActivityLog> = (
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
        text: `<div style='text-align:center;width:auto;'><span style='text-align:center'>${value}</span></div>`,
        toolTip: value,
      };
    };
    const statuscellFormatter: Formatter<ActivityLog> = (
      _row,
      _cell,
      value,
      colDef,
      vm
    ) => {
      if (typeof value == 'undefined') {
        value = '';
      }
      if (vm.activity_status == 'SUCCESS') {
        return {
          text: `<div style='text-align:center;width:auto;'> <span style='text-align:center;padding:5px;' class='alert show alert-success'>${value}</span></div>`,
          toolTip: value,
        };
      } else if (vm.activity_status == 'FAILED') {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center;padding:5px;' class='alert show alert-danger'>${value}</span></div>`,
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
        id: 'actvity_id',
        name: 'ID',
        field: 'activity_id',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        width: 10,
      },
      {
        id: 'activity_timestamp',
        name: 'Time',
        field: 'activity_timestamp',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        width: 50,
      },
      {
        id: 'activity_type',
        name: 'Action',
        field: 'activity_type',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        width: 20,
      },
      {
        id: 'activity_owner',
        name: 'Owner',
        field: 'activity_owner',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        width: 20,
      },
      {
        id: 'activity_status',
        name: 'Status',
        field: 'activity_status',
        sortable: true,
        filterable: true,
        formatter: statuscellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
        width: 20,
      },
      {
        id: 'activity_desc',
        name: 'Details',
        field: 'activity_desc',
        sortable: true,
        filterable: true,
        formatter: cellFormatter,
        filter: { model: Filters.compoundInputText },
        headerCssClass: 'gridRow',
      },
    ];
  }
  constructor(
    private als: ActivitylogsService,
    private _spinner: SpinnerService
  ) {
    this.isLoadingActivityList = true;
    this._spinner.setSpinnerState(true);
    als
      .getActiviyLogs()
      .then((res: any) => {
        this.isLoadingActivityList = false;
        this._spinner.setSpinnerState(false);
        this.alDataSet = als.parseData(res);
        this.firstPage = [...this.alDataSet];
        if (this.alDataSet.length == 0) {
          this.endOfData = true;
        }
        if (this.alDataSet.length > 0 && this.alDataSet.length < 10) {
          this.lastPage = true;
        }
        //console.log(this.alDataSet);
      })
      .catch((err: any) => {
        //console.log(err);
        this.isLoadingActivityList = false;
        this._spinner.setSpinnerState(false);
      });
  }
  next() {
    //console.log('next');
    this.isLoadingActivityList = true;
    this.onNext = true;
    this.startOfData = false;
    this._spinner.setSpinnerState(true);
    this.als
      .getNextPageDataFromNode(
        this.alDataSet[this.alDataSet.length - 1].activity_id
      )
      .then((res: any) => {
        this.isLoadingActivityList = false;
        this._spinner.setSpinnerState(false);
        this.alDataSet = this.als.parseData(res);
        if (this.alDataSet.length == 0) {
          this.endOfData = true;
          return;
        }

        if (this.alDataSet.length > 0 && this.alDataSet.length < 10) {
          this.lastPage = true;
          return;
        }
        //console.log(this.alDataSet);
      })
      .catch((err: any) => {
        //console.log(err);
        this.isLoadingActivityList = false;
        this._spinner.setSpinnerState(false);
      });
  }
  prev() {
    //console.log('prev');
    this.isLoadingActivityList = true;
    this.endOfData = false;
    this.lastPage = false;
    this._spinner.setSpinnerState(true);
    this.als
      .getPrevPageDataFromNode(this.alDataSet[0].activity_id)
      .then((res: any) => {
        this.isLoadingActivityList = false;
        this._spinner.setSpinnerState(false);
        this.alDataSet = this.als.parseData(res).reverse();
        //console.log('Prev->', this.firstPage[0]['activity_id']);
        if (
          this.alDataSet[0]['activity_id'] == this.firstPage[0]['activity_id']
        ) {
          //console.log('Page -1');
          this.startOfData = true;
        }
        //console.log(this.alDataSet);
      })
      .catch((err: any) => {
        //console.log(err);
        this.isLoadingActivityList = false;
        this._spinner.setSpinnerState(false);
      });
  }
}
