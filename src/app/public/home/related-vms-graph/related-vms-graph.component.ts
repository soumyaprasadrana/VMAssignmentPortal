// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Relationships Graph Component
 */
/**
 * Relationships Graph Compnent for VM management Portal , this componenet will be used to cuisualize existing
 * VM Data
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VM } from '../../DataModel/vm';
import { AuthserviceService } from '../../services/authservice.service';
import { SpinnerService } from '../../services/spinner-service';
import { VmsService } from '../../services/vms.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { ToastService } from '../../widget/toast/toast-service';
import { IECONode, Orientation } from '../../widget/utils/econode';
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
  selector: 'app-related-vms-graph-chart',
  templateUrl: './related-vms-graph.component.html',
  styleUrls: ['./related-vms-graph.component.scss'],
})

/**
 * Component Class
 */
export class RealtedVMSGraphComponent implements OnInit {
  Orientation=Orientation;
  ip:any;
  data!: IECONode;
  graphZoom:number=100;
  loggedUser:any;
  relationships:any;
  constructor(
    private vms: VmsService,
    private spinner: SpinnerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private _auth:AuthserviceService,
    private toastService:ToastService
  ) {
    console.log("constructor called");
    this.loggedUser=_auth.getUser();
  }
  ngOnInit(): void {
    console.log("ngOninit called");
    if (typeof history.state.relationships != 'undefined') {
      this.relationships=history.state.relationships;
      this.ip=history.state.ip;
      this.initChart();
    }
    /*Fallback if relationships doesn't loaded from home component*/ 
      else if(typeof history.state.relationships == 'undefined' && typeof history.state.ip !='undefined'){
      this.ip=history.state.ip;
      this.spinner.setSpinnerState(true);
      this.vms
        .getRelatedVMSData(history.state.ip)
        .then((res: any) => {
          res=JSON.parse(res);
          this.spinner.setSpinnerState(false);
          if (res.status == 'FAILED' && res.message == 'No record found!') {
            console.log('No record found');
            if(this.loggedUser.useToast){
              this.toastService.showDanger('No record found! Please add relationships on Action > Relationships ',5000);
              this.router.navigate(['../portal/home/']);
            }else{
            this.openDialog(
              {
                type: 'message',
                message: 'No record found! Please add relationships on Action > Relationships ',
              },
              ()=>{
                this.router.navigate(['../portal/home/']);
              }
            );}
          } else {
            res=Object.keys(res).map(function(resIndex){
              let relation = res[resIndex];
              return relation;
            });
            if(res.length>0){
              this.relationships=res;
              this.initChart();
            }
          }
          
        })
        .catch((error: any) => {
          this.spinner.setSpinnerState(false);
          this.openDialog(
            {
              type: 'message',
              message: error.toString(),
            },
            ()=>{
              this.router.navigate(['../portal/home/']);
            }
          );
        });
    }
    else{
      this.spinner.setSpinnerState(true);
      this.vms
        .getVms()
        .then((res: any[]) => {
          var vmList = res;
          this.getData(vmList);
          this.spinner.setSpinnerState(false);
        })
        .catch((err: any) => {
          this.spinner.setSpinnerState(false);
          this.openDialog(
            {
              type: 'message',
              message: err.toString(),
            },
            ()=>{
              this.router.navigate(['../portal/home/']);
            }
          );
          //console.log('error occurred ', err);
        });
      this.spinner.setSpinnerState(false);
    }

    
  }
  initChart(){
    console.log(this.relationships);
    this.spinner.setSpinnerState(true);
    this.parseRelationships();
    this.spinner.setSpinnerState(false);
  }
  parseRelationships(){
    this.data={data:{isRoot:true,id:this.ip,iconClass:'fa fa-desktop'},linkColor:"#888",background:"#fff",color:"#000",width:140,height:140,children:[]};
    var childrens=[];
    for(var i=0; i<this.relationships.length; i++){
      var item=this.relationships[i];
      if(!item.childRelationship)
        childrens.push({data:{item:item,id:item.destination,iconClass:item.icon},linkColor:"#888",background:"#fff",color:"#000",width:140,height:140})
    }
    this.data.children=childrens;
  }
  getData(list: any):any {
    //console.log(list);
    this.openDialogInput(
      {
        title: 'Choose a virtual machine',
        label: 'VM IP',
        placeholder: 'Select VM',
        list: list,
        bindLabel: 'ip',
        closeCallback: () => {
          this.router.navigate(['/portal/home/vmm/dash']);
        },
      },
      (res: any) => {
        //console.log('data from close:', res);
        res = res.dataCtrl;
        this.ip=res.ip;
        this.spinner.setSpinnerState(true);
      this.vms
        .getRelatedVMSData(res.ip)
        .then((res: any) => {
          res=JSON.parse(res);
          this.spinner.setSpinnerState(false);
          if (res.status == 'FAILED' && res.message == 'No record found!') {
            console.log('No record found');
            this.openDialog(
              {
                type: 'message',
                message: 'No record found! Please add relationships on Action > Relationships ',
              },
              ()=>{
                this.router.navigate(['../portal/home/']);
              }
            );
          } else {
            res=Object.keys(res).map(function(resIndex){
              let relation = res[resIndex];
              return relation;
            });
            if(res.length>0){
              this.relationships=res;
              this.initChart();
            }
          }
          
        })
        .catch((error: any) => {
          this.spinner.setSpinnerState(false);
          this.openDialog(
            {
              type: 'message',
              message: error.toString(),
            },
            ()=>{
              this.router.navigate(['../portal/home/']);
            }
          );
        });
        
      }
    );
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
  filterListForChildRelationship(list:any){
    var resList:any=[];
    for(var item in list){
      if(!list[item].childRelationship)
        resList.push(list[item])
    }
    console.log("After filter",resList);
    return resList;
  }
  loadChildren(tree:any,node:any){
    console.log("called",tree,node)
    this.spinner.setSpinnerState(true);
    this.vms
      .getRelatedVMSData(node.data.id)
      .then((res: any) => {
        res=JSON.parse(res);
        this.spinner.setSpinnerState(false);
        if (res.status == 'FAILED' && res.message == 'No record found!') {
          node.isEmpty=true;
          console.log('No record found');
          this.openDialog(
            {
              type: 'message',
              message: 'No record found! Please add relationships on VM List > Action > Related VMs list',
            },
            null
          );
        } else {
          res=Object.keys(res).map(function(resIndex){
            let relation = res[resIndex];
            return relation;
          });
          if(res.length>0){
           res=this.filterListForChildRelationship(res);
           if(res.length==0){
            node.isEmpty=true;
            if(this.loggedUser.useToast){
              this.toastService.showDanger('No record found! Please add relationships on VM List > Action > relationships  ',5000);
            }else{
            this.openDialog(
              {
                type: 'message',
                message: 'No record found! Please add relationships on VM List > Action > relationships  ',
              },
              null
            );
            }
            return;
           }
            for(var i=0; i<res.length; i++){
              var item=res[i];
              if(!item.childRelationship){
                var childNode={data:{item:item,id:item.destination,iconClass:item.icon},linkColor:"#888",background:"#fff",color:"#000",width:140,height:140,id:0,iconClass:''};
                childNode.id=tree.nDatabaseNodes.length;
                childNode.iconClass=node.iconClass || 'fa fa-desktop'
                tree.add(childNode.id,node.id,'', childNode.width, childNode.height, childNode.color, childNode.background, childNode.linkColor, childNode.data)
              }
            }
            tree.UpdateTree();
            
          }
        }
        
      })
      .catch((error: any) => {
        this.spinner.setSpinnerState(false);
        this.openDialog(
          {
            type: 'message',
            message: error.toString(),
          },
         null
        );
      });
      
    
    
  }
}
