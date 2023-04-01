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
import { Component, ElementRef, OnInit } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
/*
 * Interface for ngx-chart module
 */
interface data {
  name: string;
  value: number;
}

@Component({
  selector: 'app-dynamicobjectapp-charts-view',
  templateUrl: './dynamicobjectapp-charts-view.component.html',
  styleUrls: ['./dynamicobjectapp-charts-view.component.scss'],
})
export class DynamicObjectChartsViewRecordComponent implements OnInit {
 
  dataContainer!: ElementRef;
  showPie: boolean = false;
  showBar: boolean = false;
  showAdv: boolean = false;
  showBarVer: boolean = false;
  showPieC: boolean = false;
  registerForm!: FormGroup;
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
  isDataloadFailed: boolean | undefined;
  isLoaded: boolean | undefined;
  isLoadedData:boolean =false;
  isLoadedAttributes:boolean =false;
  view: any[] = [600, 400];

  chartTypeList = ['PIE CHART', 'BAR VERTICAL', 'BAR HORIZONTAL', 'ADVANCED'];

  showChart: boolean = false;

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
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };

  //pie
  showLabels = true;
  cardHeight: any;
  resultSet:any;
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
    private userService:UserService,
    private sanitizer: DomSanitizer
    
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
    this.registerForm = this.formBuilder.group({
      field: [null, Validators.required],
      chartType: ['PIE CHART', Validators.required],
      height: [300, Validators.required],
    });
     this.registerForm.valueChanges.subscribe(val => {
      if(val.field != ''){
      this.toggleChart(val.chartType);
      this.getParseData(val.field);
    this.cardHeight = val.height;
    this.showChart = true;
      }
    });
    this.app = this.route.snapshot.params.app;
    if (typeof history.state.recordData == 'undefined') {
      var promiseR = this.dynamicobjectappServie.getDynamicObjectAppRecords(this.app);
      promiseR
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('inside promise.then -< setting dynamicobjectappDataSet', res);
        res=JSON.parse(res);
        //console.log(res);
        if(res.status){
          this.recordData = this.parseObjectRecords(res.data);
          //console.log(this.dynamicobjectappDataSet);
          this.isLoaded = true;
          this.isLoadedData=true;
          
        }
        else{
          this.openDialog({
            type:'alert',
            message:res.message
          },null);
          this.isLoaded = false;
          this.isDataloadFailed=true;
        }
        
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('error occurred ', err);
        this.isLoaded = false;
      });
    }else{
      this.recordData=history.state.recordData; 
      this.isLoadedData=true;   
  }
  if(typeof history.state.attributes != 'undefined'){
    this.attributeList=this.filterAttributes(history.state.attributes);
    this.isLoadedAttributes=true;
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
      console.log(this.attributeList);
      this.dataLoaded=true;
      this.isLoadedAttributes=true;
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
  parseObjectRecords(data:any):any[]{
    var temp:any[]=[];
    var uniqueid=1;
    for(var item in data){
      var tempitem=data[item];
      tempitem.id=uniqueid;
      temp.push(tempitem);
      uniqueid++;
    }
    return temp;
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
    console.log('onSubmit Called');
    this.toggleChart(this.registerForm.value.chartType);
    console.log(this.registerForm.value);
    this.getParseData(this.registerForm.value.field);
    this.cardHeight = this.registerForm.value.height;
    this.showChart = true;
  }
  toggleChart(type: string) {
    console.log("toggleChart :: ",type)
    if (type == 'BAR HORIZONTAL') {
      this.showBar = true;
      this.showAdv = false;
      this.showPie = false;
      this.showBarVer = false;
      this.showPieC = false;
    } else if (type == 'PIE CHART') {
      this.showBar = false;
      this.showAdv = false;
      this.showPie = false;
      this.showPieC = true;  
      this.showBarVer = false;
    }  
    else if (type == 'PIE GRID') {
      this.showBar = false;
      this.showAdv = false;
      this.showPie = true;
      this.showBarVer = false;
      this.showPieC = false;
    } else if (type == 'ADVANCED') {
      this.showBar = false;
      this.showAdv = true;
      this.showPie = false;
      this.showBarVer = false;
      this.showPieC = false;
    } else if ((type = 'BAR VERTICAL')) {
      this.showBar = false;
      this.showAdv = false;
      this.showPie = false;
      this.showBarVer = true;
      this.showPieC = false;
    }
  }
  getParseData(field: string) {
    //console.log('getParseData Called:', field);
    var result: { name: string; value: any }[] = [];
    var unique: any;
    var grouped: Map<any, any>;
    
    grouped = this.groupBy(this.recordData, (item: any) => item[field]);
    unique = [...new Set(this.recordData.map((item: any) => item[field]))];
   
    unique.forEach((item: string) => {
      if (typeof item !== 'undefined') {
        var list = grouped.get(item);
        result.push({ name: item + '', value: list.length });
      }
    });
    
    console.log(">>>>>>>>>>> CHAT RESULT >>>>>>>>>>>>",result)
    this.resultSet = result;

  }
  /**
   * Group by function to extract data from vmList
   * @param list
   * @param keyGetter
   * @returns
   */
   groupBy(list: [], keyGetter: any) {
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
  onSelect(data: any): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

function ViewChild(arg0: string) {
  throw new Error('Function not implemented.');
}

