import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NodeclientService } from '../../services/nodeclient.service';
import { SpinnerService } from '../../services/spinner-service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-ltb-output-dialog',
  templateUrl: './ltb-output-dialog.component.html',
  styleUrls: ['./ltb-output-dialog.component.scss'],
})
export class LtbOutputDialogComponent implements OnInit {
  // @ViewChild('textarea') textarea: any;
  isLoading: boolean = false;
  output: string = '';
  initResponse: any;
  promise: any;
  interval_s: any;
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
      'api/stream/getOut/' + this.data.log_file + '/' + this.data.threadId,
      httpOptions
    );
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.promise
      .then((res: any) => {
        this.initResponse = JSON.parse(res);
        //console.log('initResponse', this.initResponse);
        this.output = this.initResponse.data;
        ////console.log(this.textarea);
        //this.textarea.scrollToBottom(300); //300ms animation speed
        if (this.initResponse.isThreadStillAlive) {
          this.interval_s = interval(1000 * 10).subscribe((x) => {
            this.updateOutput();
          });
        }
        this.isLoading = false;
      })
      .catch((error: any) => {
        //console.log(error);
        this.isLoading = false;
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
        'api/stream/getOut/' + this.data.log_file + '/' + this.data.threadId,
        httpOptions
      )
      .then((res: any) => {
        this.initResponse = JSON.parse(res);
        //console.log('initResponse', this.initResponse);
        this.output += this.initResponse.data;
        //this.textarea.scrollToBottom(300); //300ms animation speed
        if (!this.initResponse.isThreadStillAlive) {
          this.interval_s.unsubscribe();
        }
        this.isLoading = false;
      })
      .catch((error: any) => {
        //console.log(error);
        this.isLoading = false;
      });
  }
}
