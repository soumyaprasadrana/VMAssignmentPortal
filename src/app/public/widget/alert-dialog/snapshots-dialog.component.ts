// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Alert Dialog Component
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { hostname } from 'os';
import { AuthserviceService } from '../../services/authservice.service';
import { SpinnerService } from '../../services/spinner-service';
import { VmsService } from '../../services/vms.service';
import { ToastService } from '../toast/toast-service';
import { AlertDialogComponent } from './alert-dialog.component';
import { TakeSnapInputDialogComponent } from './takesnap-dialog.component';
import { TaskOutputDialogComponent } from './vsphere-task-output-dialog.component';

export interface DialogData {
  snapshots?:any;
  parentObject?:any;
  hostname?:any;
}
@Component({
  selector: 'app-snapshots-dialog',
  templateUrl: './snapshots-dialog.component.html',
  styleUrls: ['./snapshots-dialog.component.scss'],
})
export class SnapshotsDialogComponent implements OnInit {
  snapshotKeys!:any;
  isSnapshotSelcted!:any;
  selectedSnap!:any;
  vSphereTaskOngoing!:any;
  loggedUser:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private dialog: MatDialog,private spinner: SpinnerService,
  private toastService: ToastService,private vms: VmsService,
  private auth: AuthserviceService,) {
    console.log(data.snapshots);
    this.snapshotKeys = Object.keys(data.snapshots);
    this.loggedUser=this.auth.getUser();
  }

  ngOnInit(): void {
  }
  takeSnapView():void{
    console.log("takeSnapView");
    this.takeSnapshot(this.data.hostname);
  }
  revertSnapshot():void{
    console.log("revertSnapshot");
    if(confirm(`Do you want to revert machine state to ${this.selectedSnap.name}?`)){
      this.spinner.setSpinnerState(true);
    this.vms.revertSnap(this.data.hostname,this.selectedSnap.name,this.selectedSnap.snapid).then((res:any)=>{
      console.log(res);
      try{
        res=JSON.parse(res);
      }catch(e){}
      this.spinner.setSpinnerState(false);
      if(res.status=='Success'){
        this.openVSphereTaskStatusDialog({task_id:res.TaskId,parentObject:this },null);
      }
      else{
        if(this.loggedUser.useToast){
          this.toastService.showDanger(res.message.toString(),5000);
        }
        else{
          this.openDialog({
            type:'alert',
            message:res.message
          },null);
        }
      }
    }).catch((err:any)=>{
      console.log(err);
      this.spinner.setSpinnerState(false);
    });
  }
  }
  takeSnapshot(hostname:any){
    this.openTakeSnapInputDialog({
        title: 'Snapshot Details',

    },(res:any)=>{
      console.log("Data from take snap dialog",res);
      this.spinner.setSpinnerState(true);
      this.vms.takeSnap(hostname,res.snapName,res?.snapDesc || 'Snapshot taken by VM Portal at '+new Date()).then((res:any)=>{
        console.log(res);
        try{
          res=JSON.parse(res);
        }catch(e){}
        this.spinner.setSpinnerState(false);
        if(res.status=='Success'){
          this.openVSphereTaskStatusDialog({task_id:res.TaskId,parentObject:this },null);
        }
        else{
          if(this.loggedUser.useToast){
            this.toastService.showDanger(res.message.toString(),5000);
          }
          else{
            this.openDialog({
              type:'alert',
              message:res.message
            },null);
          }
        }
      }).catch((err:any)=>{
        console.log(err);
        this.spinner.setSpinnerState(false);
      });
    })
  }
  revertSnap(snap_name:any,snap_id:any){
    console.log('revert snap');
  }
getObject(){
    return this;
  }
  toggleSelectedSnap(snap:any){
    this.selectedSnap=snap;
    this.isSnapshotSelcted=true;
  }
  openVSphereTaskStatusDialog(data: any, callback: any) {
    this.dialog
      .open(TaskOutputDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
        width:'400px'
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        if (typeof callback == 'function') {
          callback(res);
        }
      });
  }
  openTakeSnapInputDialog(data: any, callback: any) {
    this.dialog
      .open(TakeSnapInputDialogComponent, {
        data: data,
        panelClass: 'app-dialog-class',
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        if (typeof callback == 'function') {
          if(res)
            callback(res);
        }
      });
  }
  reloadSnapshots(){
    this.vms.getVMSnapshots(this.data.hostname).then((res:any)=>{
      try{
        res=JSON.parse(res);
      }catch(e){}
      console.log("GET snapshots:",res);
      if(res.status=="Failed" || res.status==false){
        if(this.loggedUser.useToast){
          this.toastService.showDanger(res.message.toString(),5000);
        }
        else{
          this.openDialog({
            type:'alert',
            message:res.message
          },null);
        }
      }
      else{
        this.data.snapshots=res;
        this.snapshotKeys = Object.keys(this.data.snapshots);
      }
    }).catch((err:any)=>{
      console.log("Snapshot reload failed with error:",err);
    })
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
}
