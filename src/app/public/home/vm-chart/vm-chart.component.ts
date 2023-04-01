// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc VM Chart Component
 */
/**
 * Chart Compnent for VM management Portal , this componenet will be used to cuisualize existing
 * VM Data
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VM } from '../../DataModel/vm';
import { SpinnerService } from '../../services/spinner-service';
import { VmsService } from '../../services/vms.service';
/*
 * Interface for ngx-chart module
 */
interface data {
  name: string;
  value: number;
}

/**
 * Component Declaration
 */
@Component({
  selector: 'app-vm-chart',
  templateUrl: './vm-chart.component.html',
  styleUrls: ['./vm-chart.component.scss'],
})

/**
 * Component Class
 */
export class VmChartComponent implements OnInit {
  @ViewChild('dataContainer')
  dataContainer!: ElementRef;
  showPie: boolean = false;
  showBar: boolean = false;
  showAdv: boolean = false;
  showBarVer: boolean = false;
  showPieC: boolean = false;
  registerForm!: FormGroup;
  vmList: any = [];
  vmDataOS: Array<data> = [];
  vmDataSnapCount: Array<data> = [];
  vmDataGroup: Array<data> = [];
  vmDataAvailibility: Array<any> = [];
  resultSet: Array<any> = [];
  vmDataLoading: boolean = false;
  // Bar Configuration

  view: any[] = [600, 400];

  fieldList = [
    'OS',
    'VERSION',
    //'SNAPSHOT COUNT',
    'RAM',
    'GROUP',
    'STATUS',
    'ASSIGNEE',
    'OWNER'
  ];
  chartTypeList = ['PIE CHART', 'BAR VERTICAL', 'BAR HORIZONTAL', 'ADVANCED'];

  showChart: boolean = false;

  // options for bar chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Group';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  timeline = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };

  //pie
  showLabels = true;
  cardHeight: any;

  constructor(
    private vms: VmsService,
    private spinner: SpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.spinner.setSpinnerState(true);
    this.vmDataLoading = true;
    var promise = this.vms.getVms();
    promise
      .then((res: any[]) => {
        this.spinner.setSpinnerState(false);
        //console.log('inside promise.then -< setting vmdataset');
        this.vmList = res;
        this.parseVMListOnOSBasis();
        this.parseVMListOnSnapCountBasis();
        this.parseVMListOnGroupBasis();
        this.parseVMListOnAvailibilitypBasis();
        this.vmDataLoading = false;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        //console.log('error occurred ' + err);
        this.vmDataLoading = false;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  getParseData(field: string) {
    //console.log('getParseData Called:', field);
    var result: { name: string; value: any }[] = [];
    var unique: any;
    var grouped: Map<any, any>;
    if (field == 'OS') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.os);
      unique = [...new Set(this.vmList.map((item: VM) => item.os))];
    }
    if (field == 'GROUP') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.group);
      unique = [...new Set(this.vmList.map((item: VM) => item.group))];
    }
    if (field == 'STATUS') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.status);
      unique = [...new Set(this.vmList.map((item: VM) => item.status))];
    }
    if (field == 'ASSIGNEE') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.owner);
      unique = [...new Set(this.vmList.map((item: VM) => item.owner))];
    }
    if (field == 'OWNER') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.vm_owner_lab);
      unique = [...new Set(this.vmList.map((item: VM) => item.vm_owner_lab))];
    }
    if (field == 'RAM') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.ram);
      unique = [...new Set(this.vmList.map((item: VM) => item.ram))];
    }
    if (field == 'VERSION') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.ver);
      unique = [...new Set(this.vmList.map((item: VM) => item.ver))];
    }
    if (field == 'SNAPSHOT COUNT') {
      grouped = this.groupBy(this.vmList, (vm: VM) => vm.snap_count);
      unique = [...new Set(this.vmList.map((item: VM) => item.snap_count))];
    }
    unique.forEach((item: string) => {
      if (typeof item !== 'undefined') {
        var list = grouped.get(item);
        result.push({ name: item + '', value: list.length });
      }
    });

    this.resultSet = result;
  }
  toggleChart(type: string) {
    console.log("toggleChart :: ",type)
    if (type == 'BAR HORIZONTAL') {
      this.showBar = true;
      this.showAdv = false;
      this.showPie = false;
      this.showBarVer = false;
      this.showPieC = false;
    } else if (type == 'PIE CHART') {
      this.showBar = false;
      this.showAdv = false;
      this.showPie = false;
      this.showPieC = true;  
      this.showBarVer = false;
    }  
    else if (type == 'PIE GRID') {
      this.showBar = false;
      this.showAdv = false;
      this.showPie = true;
      this.showBarVer = false;
      this.showPieC = false;
    } else if (type == 'ADVANCED') {
      this.showBar = false;
      this.showAdv = true;
      this.showPie = false;
      this.showBarVer = false;
      this.showPieC = false;
    } else if ((type = 'BAR VERTICAL')) {
      this.showBar = false;
      this.showAdv = false;
      this.showPie = false;
      this.showBarVer = true;
      this.showPieC = false;
    }
  }
  onSubmit() {
    //console.log('onSubmit Called');
    this.toggleChart(this.registerForm.value.chartType);
    //console.log(this.registerForm.value);
    this.getParseData(this.registerForm.value.field);
    this.cardHeight = this.registerForm.value.height;
    this.showChart = true;
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      field: ['', Validators.required],
      chartType: ['PIE CHART', Validators.required],
      height: [300, Validators.required],
    });
    this.registerForm.valueChanges.subscribe(val => {
      if(val.field != ''){
      this.toggleChart(val.chartType);
      this.getParseData(val.field);
    this.cardHeight = val.height;
    this.showChart = true;
      }
    });
  }
  /**
   * Will parse vmList data to ngx-chart module data on basis of availibility
   */
  parseVMListOnAvailibilitypBasis() {
    const grouped = this.groupBy(this.vmList, (vm: VM) => vm.status);
    const unique = [...new Set(this.vmList.map((item: VM) => item.status))];
    unique.forEach((item) => {
      if (typeof item !== 'undefined') {
        var list = grouped.get(item);
        this.vmDataAvailibility.push({ name: item + '', value: list.length });
      }
    });
  }

  /**
   * Will parse vmList data to ngx-chart module data on basis of group
   */
  parseVMListOnGroupBasis() {
    const grouped = this.groupBy(this.vmList, (vm: VM) => vm.group);
    const unique = [...new Set(this.vmList.map((item: VM) => item.group))];
    unique.forEach((item) => {
      var list = grouped.get(item);
      this.vmDataGroup.push({ name: item + '', value: list.length });
    });
  }

  /**
   * Will parse vmList data to ngx-chart module data on basis of Snapshot Count
   */
  parseVMListOnSnapCountBasis() {
    const grouped = this.groupBy(this.vmList, (vm: VM) => vm.snap_count);
    const unique = [...new Set(this.vmList.map((item: VM) => item.snap_count))];
    unique.forEach((item) => {
      var list = grouped.get(item);
      this.vmDataSnapCount.push({ name: item + '', value: list.length });
    });
  }

  /**
   * Will parse vmList data to ngx-chart module data on basis of OS
   */
  parseVMListOnOSBasis() {
    const grouped = this.groupBy(this.vmList, (vm: VM) => vm.os);
    const unique = [...new Set(this.vmList.map((item: VM) => item.os))];
    unique.forEach((item) => {
      var list = grouped.get(item);
      this.vmDataOS.push({ name: item + '', value: list.length });
    });
  }

  /**
   * Group by function to extract data from vmList
   * @param list
   * @param keyGetter
   * @returns
   */
  groupBy(list: [], keyGetter: any) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
