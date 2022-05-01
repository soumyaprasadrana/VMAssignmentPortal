// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Object App Add Record Component
 */
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MustMatch } from '../../widget/utils/must-match.validator';
import { CustomValidator } from '../../widget/utils/no-white-space-validator';
import { NodeclientService } from '../../services/nodeclient.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { SpinnerService } from '../../services/spinner-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/teams.service';
import { AuthserviceService } from '../../services/authservice.service';
import { ToastService } from '../../widget/toast/toast-service';
import { DynamicObjectAppService } from '../../services/dynamicobjectapp.service';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/users.service';
@Component({
  selector: 'app-dynamicobjectapp-add-record',
  templateUrl: './dynamicobjectapp-add-record.component.html',
  styleUrls: ['./dynamicobjectapp-add-record.component.scss'],
})
export class DynamicObjectAppAddRecordComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  title: string = 'Add Record';
  loggedUser:any;
  attributeList:any;
  app:any;
  listsScope:any={};
  usersList: any = [];
  teamList: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _client: NodeclientService,
    private dynamicobjectappServie: DynamicObjectAppService,
    private dialog: MatDialog,
    private _spinner: SpinnerService,
    private router: Router,
    private tms: TeamService,
    private _auth:AuthserviceService,
    private toastService:ToastService,
    private commonService: CommonService,
    private userService:UserService
    
  ) {
    this.loggedUser=_auth.getUser();
    tms
    .getTeams()
    .then((res) => {
      this.teamList = res;
    })
    .catch((error) => {
      //console.log(error);
    });
    userService.getUsers().then((res) => {
      this.usersList = res;
    })
    .catch((error) => {
      //console.log(error);
    });
  }
  filterAttributes(list:any):any{
    var newList=[];
    for(var item in list){
      if(list[item].type.value!='autokey')
          newList.push(list[item]);
    }
    return newList;
  }
  
  ngOnInit(): void {
    this.app = this.route.snapshot.params.app;
    if(typeof history.state.attributes != 'undefined'){
      this.attributeList=this.filterAttributes(history.state.attributes);
      this.registerForm = this.formBuilder.group(this.parseAttributesToFormItems());
    }
    else{
      var promise = this.dynamicobjectappServie.getDynamicObjectAppAttributes(this.app);
      promise
    .then((res: any) => {
      this._spinner.setSpinnerState(false);
      //console.log('inside promise.then -< setting attributes', res);
      res=JSON.parse(res);
      //console.log(res);
      if(res.status){
        this.attributeList=this.filterAttributes(res.data);
        this.registerForm = this.formBuilder.group(this.parseAttributesToFormItems());    
      }
      else{
        this.openDialog({
          type:'alert',
          message:res.message
        },()=>{
          this.router.navigate(['..'],{relativeTo:this.route});
        });
        
      }
      
     
    })
    .catch((err: any) => {
      this._spinner.setSpinnerState(false);
      console.log('error occurred ', err);
      this.openDialog({
        type:'alert',
        message:err.message
      },()=>{
        this.router.navigate(['..'],{relativeTo:this.route});
      });
    });
    }
    
    
    
  }
  parseAttributesToFormItems(){
    var formItems:any={};
    for(var item in this.attributeList){
      var formItemParams=[];
      var defaultValue=(this.attributeList[item].defaultValue!=null && this.attributeList[item].defaultValue.length>0)?this.attributeList[item].defaultValue.value:(this.attributeList[item].type.value=='number'?null:'');
      var formItemValidators: ((control: AbstractControl) => ValidationErrors | null)[]=[];
      for(var validator in this.attributeList[item].validators.value){
      switch(this.attributeList[item].validators.value[validator].element.type.value){
        case "required":
          formItemValidators.push(Validators.required);
          this.attributeList[item].required=true;
          break;
        case "whitespace":
        case "whitspace":
          formItemValidators.push(CustomValidator.restrictWhiteSpace);
          break;
        case "email":
          formItemValidators.push(Validators.email);
          break;
      }
    }
      if(this.attributeList[item].type.value.toString().includes('list')){
        var listArr=this.attributeList[item].type.value.toString().split(":");
        var listName=listArr[listArr.length-1];
        this.commonService.getListItems(listName,item).then((res:any)=>{
          if(res.res!=null && res.res.length!=0){
            this.listsScope[this.attributeList[res.item].name.value]=res.res;
          }
            else{
              if(this.attributeList[res.item].required){
                this.openDialog({
                  type:'alert',
                  message:'List load failed for a mandatory field. Please contact system administrator.'
                },()=>{
                  this.router.navigate([".."],{relativeTo:this.route})
                });
              }else{
                this.openDialog({
                  type:'warn',
                  message:'List load failed for field: '+this.attributeList[res.item].alias.value+'.'
                },null);
              }
            }
        }).catch((err:any)=>{
          console.log(err);
          if(this.attributeList[err.item].required){
            this.openDialog({
              type:'alert',
              message:'List load failed for a mandatory field. Please contact system administrator.'
            },()=>{
              this.router.navigate([".."],{relativeTo:this.route})
            });
          }else{
            this.openDialog({
              type:'warn',
              message:'List load failed for field: '+this.attributeList[err.item].alias.value+'.'
            },null);
          }
        })
      }
      formItemParams.push(defaultValue);
      formItemParams.push(formItemValidators);
      formItems[this.attributeList[item].name.value]=formItemParams;
    }
    //console.log(formItems);
    return formItems;
  }
  get f() {
    return this.registerForm.controls;
  }
  checkIfAttributeRequired(index:any){
    return this.attributeList[index].required?this.attributeList[index].required:false;
  }
  checkIsInvalid(ctrlName: string | number) {
    return this.registerForm.controls[ctrlName].errors ? true : false;
  }
  checkIsInvalidRequired(ctrlName: string | number) {
    if (this.registerForm.controls[ctrlName].errors) {
      var temp: any = this.registerForm.controls[ctrlName].errors || '';
      return temp.required ? true : false;
    }
    return false;
  }
  checkIsInvalidEmail(ctrlName: string | number) {
    if (this.registerForm.controls[ctrlName].errors) {
      var temp: any = this.registerForm.controls[ctrlName].errors || '';
      return temp.email ? true : false;
    }
    return false;
  }
  checkIsInvalidWhiteSpace(ctrlName: string | number) {
    if (this.registerForm.controls[ctrlName].errors) {
      var temp: any = this.registerForm.controls[ctrlName].errors || '';
      return temp.restrictWhiteSpace ? true : false;
    }
    return false;
  }
  checkIsInvalidLength(ctrlName: string | number) {
    if (this.registerForm.controls[ctrlName].errors) {
      var temp: any = this.registerForm.controls[ctrlName].errors || '';
      return temp.maxlength ? true : false;
    }
    return false;
  }
  getFormCotrolData(ctrlName: string | number) {
    return this.registerForm.controls[ctrlName].value;
  }
  
  onSubmit() {
    this.submitted = true;
    this._spinner.setSpinnerState(true);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this._spinner.setSpinnerState(false);
      return;
    }

    // display form values on success
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var _promise = this._client.post(
      'api/dynamicobjects/'+this.app+'/add',
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'SUCCESS' || res.status) {
          if(this.loggedUser.useToast){
            this.toastService.showSuccess(res.message,5000);
            this.router.navigate(['../'],{relativeTo:this.route});
          }else{
          this.openDialog(
            {
              type: 'message',
              message: res.message,
            },
            () => {
              this.router.navigate(['../'],{relativeTo:this.route});
            }
          );
          }
        } else {
          this._spinner.setSpinnerState(false);
          this.openDialog(
            {
              type: 'alert',
              message: res.message,
            },
            null
          );
        }
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        this.openDialog(
          {
            type: 'alert',
            message: err.message,
          },
          null
        );
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
}
