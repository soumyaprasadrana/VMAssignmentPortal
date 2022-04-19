// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Objects Home Component
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';
import { DynamicObjectsService } from '../../services/dynamicobjects.service';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { ToastService } from '../../widget/toast/toast-service';


@Component({
  selector: 'app-dynamicobjects-home',
  templateUrl: './dynamicobjects-home.component.html',
  styleUrls: ['./dynamicobjects-home.component.scss'],
})
export class DynamicobjectsHomeComponent implements OnInit {
  cardsMetaData: any;
  isLoaded:boolean = false;
  loggedUser:any;
  constructor(private dos:DynamicObjectsService,
    private spinner:SpinnerService,private dialog: MatDialog,private toastService:ToastService,
    private _auth:AuthserviceService,private router: Router,private route: ActivatedRoute) {
      this.loggedUser=_auth.getUser();
    var promise = this.dos.getDynamicObjects();
    promise
      .then((res: any) => {
        this.spinner.setSpinnerState(false);
       // console.log('inside promise.then -< setting dynamicobjectsDataSet', res);
        this.cardsMetaData = this.parseData(res);
        //console.log(this.cardsMetaData);
        if(this.cardsMetaData.length==0){
          if(this.loggedUser.useToast){
            this.toastService.showDanger("No applications found.",5000);
            this.router.navigate(['../../tools/dash'],{relativeTo:this.route});
          }else{
          this.openDialog(
            {
              type: 'alert',
              message: "No applications found.",
            },
            () => {
              this.router.navigate(['../../tools/dash'],{relativeTo:this.route});
            }
          );
          }
        }
        this.isLoaded = true;
      })
      .catch((err: any) => {
        this.spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
        this.isLoaded = false;
      });
  }

  ngOnInit(): void {}
  parseData(res:any){
    var cardMetaData=[];
    for (var key in res){
       // console.log("res[key]",res[key].description);
        if(res[key].status)
            cardMetaData.push({cardTitle:res[key].description,cardIconClass:'fa fa-folder-o',cardRouterLink: ['../../dynamicapps/app/'+res[key].name]});
    }
    return cardMetaData;
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
