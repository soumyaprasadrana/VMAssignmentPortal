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
import { Column,Formatter, GridOption } from '@slickgrid-universal/common';
import { Filters, Formatters } from 'angular-slickgrid';
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
    gridHeight:380,
    autoResize: {
      container: '#grid-container2',
      applyResizeToContainer: true,
      rightPadding: 0,
    },
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
    const cellFormatter: Formatter<any> = (
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
        text: `<div style='text-align:center;width:auto;'><span style='text-align:center' class="badge">${value}</span></div>`,
        toolTip: value,
      };
    };
    const statuscellFormatter: Formatter<any> = (
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
          text: `<div style='text-align:center;width:auto;'> <span style='text-align:center;padding:5px;' class='badge badge-success'>${value}</span></div>`,
          toolTip: value,
        };
      } else if (vm.activity_status == 'FAILED') {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center;padding:5px;' class='badge badge-danger'>${value}</span></div>`,
          toolTip: value,
        };
      }else if (vm.activity_status == 'PENDING' || vm.activity_status == 'RUNNING') {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center;padding:5px;' class='badge badge-warning'>${value}</span></div>`,
          toolTip: value,
        };
      } else {
        return {
          text: `<div style='text-align:center;width:auto;'><span style='text-align:center' class="badge">${value}</span></div>`,
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
    this.isLoadingActivityList = false;
    this._spinner.setSpinnerState(false);
    this.alDataSet = als.parseData(
      '[{"activity_owner":"admin","activity_type":"ADDTECHNOTE","activity_desc":"Successfully added How to stop/start firewall on RHEL 8 / CentOS 8 to Technote list by admin.","activity_id":"52","activity_timestamp":"Sun Feb 27 19:51:15 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ASSIGNVM","activity_desc":"192.168.0.12 has been assigned to admin by admin.","activity_id":"51","activity_timestamp":"Sun Feb 27 19:33:36 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  support_user2,requested by admin.","activity_id":"50","activity_timestamp":"Sun Feb 27 18:44:08 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  support_user1,requested by admin.","activity_id":"49","activity_timestamp":"Sun Feb 27 18:43:38 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  devops_user2,requested by admin.","activity_id":"48","activity_timestamp":"Sun Feb 27 18:43:10 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  devops_user1,requested by admin.","activity_id":"47","activity_timestamp":"Sun Feb 27 18:41:12 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  qa_user2,requested by admin.","activity_id":"46","activity_timestamp":"Sun Feb 27 18:40:32 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  qa_user1,requested by admin.","activity_id":"45","activity_timestamp":"Sun Feb 27 18:40:07 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  dev_user2,requested by admin.","activity_id":"44","activity_timestamp":"Sun Feb 27 18:39:39 UTC 2022","activity_status":"SUCCESS"},{"activity_owner":"admin","activity_type":"ADDUSER","activity_desc":"Successfully added user,  dev_user1,requested by admin.","activity_id":"43","activity_timestamp":"Sun Feb 27 18:39:00 UTC 2022","activity_status":"SUCCESS"}]'
    );
    this.firstPage = [...this.alDataSet];
    if (this.alDataSet.length == 0) {
      this.endOfData = true;
    }
    if (this.alDataSet.length > 0 && this.alDataSet.length < 10) {
      this.lastPage = true;
    }
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
