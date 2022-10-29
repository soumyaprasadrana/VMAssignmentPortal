// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal SSH Tool Output Component
 */
import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-vsphere-task-output-dialog',
  templateUrl: './vsphere-task-output-dialog.component.html',
  styleUrls: ['./vsphere-task-output-dialog.component.scss'],
})
export class TaskOutputDialogComponent implements OnInit {
  // @ViewChild('textarea') textarea: any;
  isLoading: boolean = false;
  output: number = 5;
  initResponse: any;
  promise: any;
  interval_s: any;
  taskCompleted!:any;
  taskFailed!:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _spinner: SpinnerService,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private router: Router
  ) {
    //console.log('LTBOutPutDialogComponent - data', data);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    this.promise = _client.get(
      'api/stream/getTaskStatus/' + this.data.task_id ,
      httpOptions
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.promise
      .then((res: any) => {
        try{
          res=JSON.parse(res);
        }catch(e){}
        this.initResponse = res;
        //console.log('initResponse', this.initResponse);
        if(this.initResponse.percentage!=0)
          this.output=this.initResponse.percentage;
        ////console.log(this.textarea);
        //this.textarea.scrollToBottom(300); //300ms animation speed
        if (this.initResponse.isThreadStillAlive) {
          this.interval_s = interval(1000 * 5).subscribe((x) => {
            this.updateOutput();
          });
        }
        this.isLoading = false;
      })
      .catch((error: any) => {
        console.log(error);
        this.isLoading = false;
        this.taskFailed = true;
      });
  }
  updateOutput() {
    this.isLoading = true;
    //console.log('update Output Called');
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    this._client
      .get(
        'api/stream/getTaskStatus/' + this.data.task_id ,
        httpOptions
      )
      .then((res: any) => {
        try{
          res=JSON.parse(res);
        }catch(e){}
        this.initResponse = res;
        //console.log('initResponse', this.initResponse);
        this.output = this.initResponse.percentage;

        //this.textarea.scrollToBottom(300); //300ms animation speed
        if (!this.initResponse.isThreadStillAlive) {
          if (this.output >=100) {
            console.log("MSSG after 100%");
            if(this.initResponse.taskName=="CreateSnapshot_Task"){
            if(this.initResponse.result!=null){
              this.taskCompleted=true;
              this.data.parentObject.reloadSnapshots();          
              }
            else if(this.initResponse.error!=null)
              this.taskFailed=true;
            
            }
            else{
              this.taskCompleted=true;
              this.data.parentObject.reloadSnapshots();
            }
            
          }
        
          this.interval_s.unsubscribe();
        }
        this.isLoading = false;
      })
      .catch((error: any) => {
        console.log(error);
        this.isLoading = false;
        this.interval_s.unsubscribe();
      });
  }
}
