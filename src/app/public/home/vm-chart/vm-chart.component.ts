/**
 * Chart Compnent for VM management Portal , this componenet will be used to cuisualize existing
 * VM Data
 */
import { Component, OnInit } from '@angular/core';
import { VM } from '../../DataModel/vm';
import { SpinnerService } from '../../services/spinner-service';
import { VmsService
} from '../../services/vms.service';
/*
* Interface for ngx-chart module
*/
interface data{
  name:string,
  value:number
}

/**
 * Component Declaration
 */
@Component({
  selector: 'app-vm-chart',
  templateUrl: './vm-chart.component.html',
  styleUrls: ['./vm-chart.component.scss']
})

/**
 * Component Class
 */
export class VmChartComponent implements OnInit {
  vmList :any =[];
  vmDataOS:Array<data>=[];
  vmDataSnapCount:Array<data>=[];
  vmDataGroup:Array<data>=[];
  vmDataAvailibility:Array<any>=[];
  // Bar Configuration

view: any[] = [600, 400];

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
  domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
};

//pie
showLabels = true;



  
  constructor(private vms:VmsService, private spinner:SpinnerService) { 
    this.spinner.setSpinnerState(true);
    var promise = this.vms.getVms();
    promise.then((res: any[])=>{
      this.spinner.setSpinnerState(false);
      console.log("inside promise.then -< setting vmdataset");
      this.vmList=res;
    this.parseVMListOnOSBasis();
    this.parseVMListOnSnapCountBasis();
    this.parseVMListOnGroupBasis();
    this.parseVMListOnAvailibilitypBasis();
     
      
    }).catch((err:any)=>{
      this.spinner.setSpinnerState(false);
      console.log("error occurred "+err)
    });
    
  }

  ngOnInit(): void {
  }
   /**
   * Will parse vmList data to ngx-chart module data on basis of availibility
   */
    parseVMListOnAvailibilitypBasis(){
      const grouped = this.groupBy(this.vmList, (vm: VM) => vm.status);
      const unique = [...new Set(this.vmList.map((item:VM) => item.status))]; 
     unique.forEach((item)=>{
       if(typeof(item) !== 'undefined'){
       var list=grouped.get(item);
       this.vmDataAvailibility.push({name:item+'',value:list.length});
       }
     });
    }
  
  /**
   * Will parse vmList data to ngx-chart module data on basis of group
   */
   parseVMListOnGroupBasis(){
    const grouped = this.groupBy(this.vmList, (vm: VM) => vm.group);
    const unique = [...new Set(this.vmList.map((item:VM) => item.group))]; 
   unique.forEach((item)=>{
     
     var list=grouped.get(item);
     this.vmDataGroup.push({name:item+'',value:list.length});
   });
  }

  /**
   * Will parse vmList data to ngx-chart module data on basis of Snapshot Count
   */
  parseVMListOnSnapCountBasis(){
    const grouped = this.groupBy(this.vmList, (vm: VM) => vm.snap_count);
    const unique = [...new Set(this.vmList.map((item:VM) => item.snap_count))]; 
   unique.forEach((item)=>{
     
     var list=grouped.get(item);
     this.vmDataSnapCount.push({name:item+'',value:list.length});
   });
  }

  /**
   * Will parse vmList data to ngx-chart module data on basis of OS
   */
  parseVMListOnOSBasis(){
    const grouped = this.groupBy(this.vmList, (vm: VM) => vm.os);
    const unique = [...new Set(this.vmList.map((item:VM) => item.os))]; 
   unique.forEach((item)=>{
     
     var list=grouped.get(item);
     this.vmDataOS.push({name:item+'',value:list.length});
   });
   
  }

  /**
   * Group by function to extract data from vmList
   * @param list 
   * @param keyGetter 
   * @returns 
   */
  groupBy(list:[], keyGetter:any) {
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
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data: any): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data: any): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}
}
