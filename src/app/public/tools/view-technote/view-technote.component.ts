// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc View Technote Component
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { SpinnerService } from '../../services/spinner-service';
import { TechnotesService } from '../../services/technotes.service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { ToastService } from '../../widget/toast/toast-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-technote',
  templateUrl: './view-technote.component.html',
  styleUrls: ['./view-technote.component.scss'],
})
export class ViewTechnoteComponent implements OnInit {
  technoteID: any;
  technotesDataSet!: any[];
  isLoaded!: boolean;
  technote: any;
  isDataloadFailed: any;
  loggedUser :any;
  constructor(
    private actRoute: ActivatedRoute,
    private spinner: SpinnerService,
    private technotesServie: TechnotesService,
    private _auth:AuthserviceService,
    private toastService:ToastService,
    private router: Router,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.technoteID = this.actRoute.snapshot.params.technoteID;
    var promise = this.technotesServie.getTechnote(this.technoteID);
    this.loggedUser=_auth.getUser();
    promise
      .then((res:any) => {
        this.spinner.setSpinnerState(false);
        console.log('inside promise.then -< setting technote');
        this.technote=JSON.parse(res);
        if (this.technote.failed) {
          console.log('No technotefound with this id.');
          if(this.loggedUser.useToast){
            this.toastService.showDanger('Technote not found!!',5000);
            this.router.navigate(['/portal/home/tools/technotes']);
          }else{
          this.openDialog(
            {
              type: 'message',
              message: 'Technote not found!!',
            },
            () => {
              this.router.navigate(['/portal/home/tools/technotes']);
            }
          );
        } 
      }
        console.log(this.technote);
        this.isLoaded = true;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
        this.isLoaded = false;
        this.isDataloadFailed;
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
          callback();
        }
      });
  }
  ngOnInit(): void {}
}


