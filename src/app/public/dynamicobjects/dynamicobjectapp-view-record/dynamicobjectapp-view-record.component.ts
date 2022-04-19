// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Dynamic Object App View Record Component
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
  selector: 'app-dynamicobjectapp-view-record',
  templateUrl: './dynamicobjectapp-view-record.component.html',
  styleUrls: ['./dynamicobjectapp-view-record.component.scss'],
})
export class DynamicObjectAppViewRecordComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  title: string = 'View Record';
  loggedUser:any;
  attributeList:any;
  app:any;
  listsScope:any={};
  usersList: any = [];
  teamList: any = [];
  recordData: any;
  dataLoaded:boolean=false;
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
    var richTextFields=[];
    for(var item in list){
      if(list[item].type.value!='autokey' && list[item].type.value!='richtext' && (list[item].isPrimaryKey.value!=true || list[item].isPrimaryKey.value.toString()!='true'))
          newList.push(list[item]);
      if(list[item].isPrimaryKey.value==true || list[item].isPrimaryKey.value=='true'){
        list[item].disabled=true  
        newList.push(list[item])
      }
      if(list[item].type.value=='richtext'){
        richTextFields.push(list[item]);
      }
    }
    for(var item in richTextFields){
      newList.push(richTextFields[item]);
    }
    return newList;
  }
  
  ngOnInit(): void {
    this.app = this.route.snapshot.params.app;
    if (typeof history.state.recordData == 'undefined') {
      this.openDialog({
        type:'alert',
        message:"No record selected!"
      },()=>{
        this.router.navigate(['..'],{relativeTo:this.route});
      });
      return;
    }else{
      this.recordData=history.state.recordData;
    
    if(typeof history.state.attributes != 'undefined'){
      this.attributeList=this.filterAttributes(history.state.attributes);
      this.registerForm = this.formBuilder.group(this.parseAttributesToFormItems());
    }
    else{
      var promise = this.dynamicobjectappServie.getDynamicObjectAppAttributes(this.app);
      promise
    .then((res: any) => {
      this._spinner.setSpinnerState(false);
     // console.log('inside promise.then -< setting attributes', res);
      res=JSON.parse(res);
      //console.log(res);
      if(res.status){
        this.attributeList=this.filterAttributes(res.data);
        this.registerForm = this.formBuilder.group(this.parseAttributesToFormItems());    
        this.dataLoaded=true;
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
        message:err.toString()
      },()=>{
        this.router.navigate(['..'],{relativeTo:this.route});
      });
    });
    }
    
  }
    
  }
  parseAttributesToFormItems(){
    
    var formItems:any={};
    for(var item in this.attributeList){
      var formItemParams=[];
      var defaultValue=this.recordData[this.attributeList[item].name.value];
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
      if(this.attributeList[item].disabled){
        defaultValue={value:defaultValue,disabled:true};
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
