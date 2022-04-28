// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-04-19 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Add-Dynamic-Object Component
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from '../../widget/utils/must-match.validator';
import { CustomValidator } from '../../widget/utils/no-white-space-validator';
import { NodeclientService } from '../../services/nodeclient.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../widget/alert-dialog/alert-dialog.component';
import { SpinnerService } from '../../services/spinner-service';
import { Router } from '@angular/router';
import { TeamService } from '../../services/teams.service';
import { AuthserviceService } from '../../services/authservice.service';
import { ToastService } from '../../widget/toast/toast-service';
import * as internal from 'stream';
import { DynamicObjectsService } from '../../services/dynamicobjects.service';
import { ɵNullViewportScroller } from '@angular/common';
import { InputDialogComponent } from '../../widget/alert-dialog/input-dialog.component';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-add-dynamicobject',
  templateUrl: './add-dynamicobject.component.html',
  styleUrls: ['./add-dynamicobject.component.scss'],
})
export class AddDynamicObjectComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  title: string = 'Add Dynamic Object';
  loggedUser:any;
  isLinear = true;
  formGroupObjectProperties!:FormGroup;
  formGroupObjectPropertiesSubmitted:boolean=false;
  list:any;
  funlist:any;
  formNameGroup!: FormGroup ;
  objectAttributeForm!: FormGroup ;
  objectAttributeFormSubmitted:boolean=false;
  objectFunctionsGroup!: FormGroup ;
  objectFunctionsGroupSubmitted:boolean=false;
  formPhoneGroup!: FormGroup ;
  autoKeyAdded:boolean=false;
  listSelectedOptions:any=[];
  constructor(
    private formBuilder: FormBuilder,
    private _client: NodeclientService,
    private dialog: MatDialog,
    private _spinner: SpinnerService,
    private router: Router,
    private tms: TeamService,
    private _auth:AuthserviceService,
    private toastService:ToastService,
    private fb: FormBuilder,
    private dynamicObjectService:DynamicObjectsService,
    private commonServices:CommonService
  ) {
    this.loggedUser=_auth.getUser();
    this.createForm();
  }
  createForm() {
    this.formGroupObjectProperties= this.fb.group({
      name: ['',[Validators.required,CustomValidator.restrictWhiteSpace,Validators.maxLength(30)]],
      desc: ['',[Validators.required,Validators.maxLength(150)]],
      scope: ['global',Validators.required],
      status: [true,Validators.required]
    });
    this.formNameGroup  = this.fb.group({
      userName: ['', Validators.required]
    });
  
    this.objectAttributeForm  = this.fb.group({
    });
    this.objectFunctionsGroup  = this.fb.group({
      
    });
    this.formPhoneGroup  = this.fb.group({
      mobile: ['', Validators.compose([Validators.required, Validators.min(10)])]
    });
    }

  ngOnInit(): void {
    
    this.addFunctions();
  }
  get f() {
    return this.registerForm.controls;
  }
  get objectPropForm(){
    return this.formGroupObjectProperties.controls;
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
      'api/admin/addTeam',
      this.registerForm.value,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        if (res) res = JSON.parse(res);
        if (res.status == 'SUCCESS') {
          this.tms.setNeedRefresh(true);
          if(this.loggedUser.useToast){
            this.toastService.showSuccess(res.message,5000);
            this.router.navigate(['/portal/home/admin/dash']);
          }else{
          this.openDialog(
            {
              type: 'message',
              message: res.message,
            },
            () => {
              this.router.navigate(['/portal/home/admin/dash']);
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
  addAutoKey(){
    var temp = this.parseFormValues(this.objectAttributeForm.getRawValue());
    temp.push({ name:  this.formGroupObjectProperties.controls['name'].value+'_id', type: 'autokey',size:20,isPrimaryKey:true,isNullable:false,defaultValue:'',validators:'required',alias: (this.formGroupObjectProperties.controls['name'].value+'id').toUpperCase()});
    this.objectAttributeForm = this.formBuilder.group(
      this.parseFormControlsAddAutoKey(temp)
    );  
    this.list = temp;
    this.autoKeyAdded=true;
  }
  addAttribute() {
    var temp = this.parseFormValues(this.objectAttributeForm.getRawValue());
    temp.push({ name:  null, type: null,size:null,isPrimaryKey:null,isNullable:null,defaultValue:null,validators:null,alias:null });
    this.objectAttributeForm = this.formBuilder.group(
      this.parseFormControlsAddAutoKey(temp)
    );
    this.list = temp;
    //console.log('addField');
  }
  addFunctions(){
    var temp = this.parseFunctionsFormValues(this.objectFunctionsGroup.getRawValue());
    temp.push({name:'Add Record',type:'insert',isDialog:false,isUserDefined:false});
    temp.push({name:'Update Record',type:'update',isDialog:false,isUserDefined:false});
    temp.push({name:'Delete Record',type:'delete',isDialog:false,isUserDefined:false});
    this.objectFunctionsGroup = this.formBuilder.group(
      this.parseFormControlsFunctionsGroup(temp)
    );
    this.funlist = temp;
  }
  addFunction() {
    var temp = this.parseFunctionsFormValues(this.objectFunctionsGroup.getRawValue());
    temp.push({ name:  null, type: null,isDialog:null,isUserDefined:true });
    this.objectFunctionsGroup = this.formBuilder.group(
      this.parseFormControlsFunctionsGroup(temp)
    );
    this.funlist = temp;
    //console.log('addField');
  }
  parseFormControlsAddAutoKey(
    list: Array<{ name: string; type: string; size:number; isPrimaryKey:boolean; isNullable:boolean; defaultValue:string; validators:string; alias:string}>
  ) {
    var formControls: any = {};
   
      for (var i = 0; i < list.length; i++) {
        console.log("List[i]=",list[i]);
        if(list[i].type=='autokey'){
          formControls['attr_' + i] = [
            {value: list[i].name, disabled: true},
            [Validators.required, Validators.maxLength(30)]
           
          ];
          formControls['attr_' + i + '_type'] = [
            {value: list[i].type, disabled: true},
            Validators.required,
          ];
          formControls['attr_' + i + '_size'] = [
            {value: list[i].size, disabled: true},
            Validators.required,
          ];
          formControls['attr_' + i + '_isPrimaryKey'] = [
            {value: list[i].isPrimaryKey, disabled: true},
            Validators.required,
          ];
          formControls['attr_' + i + '_isNullable'] = [
            {value: list[i].isNullable, disabled: true},
            Validators.required,
          ];
          formControls['attr_' + i + '_defaultValue'] = [
            {value: list[i].defaultValue, disabled: true},
          ];
          formControls['attr_' + i + '_validators'] = [
            {value: list[i].validators, disabled: true},
          ];
          formControls['attr_' + i + '_alias'] = [
            {value: list[i].alias, disabled: true},
            Validators.required,
          ];
          
        }else{
        formControls['attr_' + i] = [
          list[i].name,
          [Validators.required, Validators.maxLength(30)],
        ];
        formControls['attr_' + i + '_type'] = [
          list[i].type,
          Validators.required,
        ];
        formControls['attr_' + i + '_size'] = [
          list[i].size,
          Validators.required,
        ];
        formControls['attr_' + i + '_isPrimaryKey'] = [
          list[i].isPrimaryKey,
          Validators.required,
        ];
        formControls['attr_' + i + '_isNullable'] = [
          list[i].isNullable,
          Validators.required,
        ];
        formControls['attr_' + i + '_defaultValue'] = [
          list[i].defaultValue
        ];
        formControls['attr_' + i + '_validators'] = [
          list[i].validators
        ];
        formControls['attr_' + i + '_alias'] = [
          list[i].alias,
          Validators.required,
        ];
      }
      }
    
    //console.log(formControls);
    return formControls;
  }
  parseFormControlsFunctionsGroup(
    list: Array<{ name: string; type: string;  isDialog:boolean; isUserDefined:boolean; }>
  ) {
    var formControls: any = {};
   
      for (var i = 0; i < list.length; i++) {
        //console.log("List[i]=",list[i]);
        if(!list[i].isUserDefined){
          formControls['fun_' + i] = [
            {value: list[i].name, disabled: true},
            [Validators.required, Validators.maxLength(30)]
           
          ];
          formControls['fun_' + i + '_type'] = [
            {value: list[i].type, disabled: true},
            Validators.required,
          ];
          formControls['fun_' + i + '_isDialog'] = [
            {value: list[i].isDialog, disabled: true},
            Validators.required,
          ]; 
          formControls['fun_' + i + '_isUserDefined'] = [
            {value: list[i].isUserDefined, disabled: true},
            Validators.required,
          ];
          
        }
        else{
        formControls['fun_' + i] = [
          list[i].name,
          [Validators.required, Validators.maxLength(30)],
        ];
        formControls['fun_' + i + '_type'] = [
          list[i].type,
          Validators.required,
        ];
        formControls['fun_' + i + '_isDialog'] = [
          list[i].isDialog?list[i].isDialog:false,
          Validators.required,
        ];
        formControls['fun_' + i + '_isUserDefined'] = [
          list[i].isUserDefined
          
        ];
      }
      }
    
    //console.log(formControls);
    return formControls;
  }
  
  parseFormValues(formValues: any) {
    //console.log("ParseFormValues=",formValues);
    var keys = Object.keys(formValues);
    var length = keys.length;
    var temp: any = [];
    for (var i = 0; i < length / 8; i++) {
      var attr={
        name: formValues['attr_' + i],
        type: formValues['attr_' + i + '_type'],
        size: formValues['attr_' + i + '_size'],
        isPrimaryKey: formValues['attr_' + i + '_isPrimaryKey'],
        isNullable: formValues['attr_' + i + '_isNullable'],
        defaultValue: formValues['attr_' + i + '_defaultValue'],
        validators: formValues['attr_' + i + '_validators'],
        alias: formValues['attr_' + i + '_alias']
      };
      temp.push(attr);
    }

    return temp;
  }
  parseFunctionsFormValues(formValues: any) {
    var keys = Object.keys(formValues);
    var length = keys.length;
    var temp: any = [];
    for (var i = 0; i < length / 4; i++) {
      var attr={
        name: formValues['fun_' + i],
        type: formValues['fun_' + i + '_type'],
        isDialog: formValues['fun_' + i + '_isDialog'],
        isUserDefined: formValues['fun_' + i + '_isUserDefined']
      };
      temp.push(attr);
    }

    return temp;
  }
  deleteAttribute(index:number){
    if(this.objectAttributeForm.controls['attr_'+index+'_type'].value=='autokey'){
      this.autoKeyAdded=false;
    }
    var temp = this.parseFormValues(this.objectAttributeForm.value);
    temp = this.RemoveElementFromArray(temp, index);
    //console.log('index', index);
    //console.log('temp', temp);
    this.objectAttributeForm = this.formBuilder.group(
      this.parseFormControlsAddAutoKey(temp)
    );
    this.list = temp;
  }
  deleteFunction(index:number){
    
    var temp = this.parseFunctionsFormValues(this.objectFunctionsGroup.value);
    temp = this.RemoveElementFromArray(temp, index);
    //console.log('index', index);
    //console.log('temp', temp);
    this.objectFunctionsGroup = this.formBuilder.group(
      this.parseFormControlsFunctionsGroup(temp)
    );
    this.funlist = temp;
  }
  RemoveElementFromArray(arrayElements: [], rindex: number) {
    arrayElements.forEach((value, index) => {
      if (index == rindex) {
        arrayElements.splice(index, 1);
      }
    });
    return arrayElements;
  }
  checkIsInvalid(registerForm:any,ctrlName: string | number) {
    return registerForm.controls[ctrlName].errors ? true : false;
  }
  checkIsInvalidRequired(registerForm:any,ctrlName: string | number) {
    if (registerForm.controls[ctrlName].errors) {
      var temp: any =registerForm.controls[ctrlName].errors || '';
      return temp.required ? true : false;
    }
    return false;
  }
  checkIsInvalidLength(registerForm:any,ctrlName: string | number) {
    if (registerForm.controls[ctrlName].errors) {
      var temp: any =registerForm.controls[ctrlName].errors || '';
      return temp.maxlength ? true : false;
    }
    return false;
  }
  checkIsInvalidWhiteSpace(registerForm:any,ctrlName: string | number) {
    if (registerForm.controls[ctrlName].errors) {
      var temp: any =registerForm.controls[ctrlName].errors || '';
      return temp.restrictWhiteSpace ? true : false;
    }
    return false;
  }
  getFormCotrolData(registerForm:any,ctrlName: string | number) {
    return registerForm.controls[ctrlName].value;
  }
  checkForList(registerForm:any,ctrlName: string | number){
    if(this.getFormCotrolData(registerForm,ctrlName)=="list"){
      this.commonServices.getListsNames().then((res:any)=>{
        if(res.length==0){
          this.openDialog({
            type:'alert',
            message:'No lists found! Please add atleast one lists to the server to use attribute type list.'
          },null)
        }
        else{
          this.openDialogInput(
            {
              title: 'Choose a list',
              label: 'List',
              placeholder: 'Select list',
              list: res,
              bindLabel: 'list',
            },(res:any)=>{
              console.log(res);
              this.listSelectedOptions.push(registerForm.controls[ctrlName].value+":"+res.dataCtrl);
              registerForm.controls[ctrlName].value=registerForm.controls[ctrlName].value+":"+res.dataCtrl;
            }
          );
        }
      }).catch((err:any)=>{
        console.log(err);
        this.openDialog({
          type:'alert',
          message:'Error Occurred,Unable to load lists.'
        },null)
      })
    
    }
  }
  submitDynamicObject(){
    this.submitted = true;
    this._spinner.setSpinnerState(true);
    // stop here if form is invalid
    if (this.objectFunctionsGroup.invalid) {
      this._spinner.setSpinnerState(false);
      return;
    }
    //console.log(this.objectFunctionsGroup.value);

    // display form values on success
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    var httpOptions = {
      headers: headers,
    };
    var object:any={};
    var properties=this.formGroupObjectProperties.value;
    var attributes=this.parseFormValues(this.objectAttributeForm.getRawValue());
    var functions=this.parseFunctionsFormValues(this.objectFunctionsGroup.getRawValue());
    object.properties=properties;
    object.attributes=attributes;
    object.functions=functions;
    var _promise = this._client.post(
      'api/dynamicobjects/add',
      object,
      httpOptions
    );
    _promise
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log(JSON.parse(res));
        //console.log(res);
        if (res && typeof res !='object') res = JSON.parse(res);
        if (res.status == 'Success' || (typeof res.status=='boolean' && res.status) ) {
          this.dynamicObjectService.setNeedRefresh(true);
          this.openDialog(
            {
              type: 'message',
              message: 'Dynamic Object added successfully!',
            },
            () => {
              this.router.navigate(['/portal/home/admin/dynamicobjects']);
            }
          );
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
}
