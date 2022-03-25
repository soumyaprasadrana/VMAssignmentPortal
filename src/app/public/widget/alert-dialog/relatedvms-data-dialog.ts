// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Relationships Dialog
 */
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgSelectConfig } from '@ng-select/ng-select';
import { SpinnerService } from '../../services/spinner-service';
import { VmsService } from '../../services/vms.service';
import { MustMatch } from '../utils/must-match.validator';
import { FontAwsomeIconList } from '../utils/fa-icon-list';
import { CustomValidator } from '../utils/no-white-space-validator';

export interface DialogData {
  type?: string;
  iconClass?: string;
  message?: string;
  label?: string;
  list?: any;
  title?: string;
  placeholder?: string;
  bindLabel?: string;
  ip: string;
}
@Component({
  selector: 'app-relatedvms-data-dialog',
  templateUrl: './relatedvms-data-dialog.html',
  styleUrls: ['./relatedvms-data-dialog.scss'],
})
export class RelatedvmsDataDialogComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  dataLoaded = false;
  norecordFound = false;
  editMode = false;
  onlyChildPresent=false;
  public dataCtrl = new FormControl();
  vmList: any = [];
  iconList=FontAwsomeIconList.iconList;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<RelatedvmsDataDialogComponent>,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig,
    private vms: VmsService,
    private _spinner: SpinnerService, 
  ) {
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    this._spinner.setSpinnerState(true);
      this.vms
        .getVms()
        .then((res: any[]) => {
          this.vmList = res;
          this._spinner.setSpinnerState(false);
        })
        .catch((err: any) => {
          this._spinner.setSpinnerState(false);
          //console.log('error occurred ', err);
        });
      this._spinner.setSpinnerState(false);
    this._spinner.setSpinnerState(true);
    this.vms
      .getRelatedVMSData(this.data.ip)
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        res = JSON.parse(res);
        console.log('VM Relationships Data Res-', res);
        if (res.status == 'FAILED' && res.message == 'No record found!') {
          console.log('No record found');
          this.norecordFound = true;
        } else {
          res=Object.keys(res).map(function(resIndex){
            let relation = res[resIndex];
            return relation;
          });
          if(res.length>0){
          this.dataLoaded = true;
          this.norecordFound = false;
          var temp = this.parseRes(res);
          console.log("Data after parse to list",temp);
          this.registerForm = this.formBuilder.group(
            this.parseFormControls(temp, false)
          );
          this.data.list = temp;
          }
        }
      })
      .catch((error: any) => {
        this._spinner.setSpinnerState(false);
        //console.log('failed', error);
      });
  }
  parseRes(res: any) {
    var temp = [];
    for (var key in res) {
      if(res[key].childRelationship)
        temp.push({ name: res[key].name, source: res[key].source,destination:res[key].destination,description:res[key].description,group:res[key].group,icon:res[key].icon,childRelationship:res[key].childRelationship });
      else
        temp.push({ name: res[key].name, source: res[key].source,destination:res[key].destination,description:res[key].description,group:res[key].group,icon:res[key].icon });
    }
    return temp;
  }
  get f() {
    return this.registerForm.controls;
  }
  deleteField(index: number) {
    var temp = this.parseFormValues(this.registerForm.value);
    temp = this.RemoveElementFromArray(temp, index);
    //console.log('index', index);
    //console.log('temp', temp);
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(temp, true)
    );
    this.data.list = temp;
    //console.log('deleteField');
  }
  RemoveElementFromArray(arrayElements: [], rindex: number) {
    arrayElements.forEach((value, index) => {
      if (index == rindex) {
        arrayElements.splice(index, 1);
      }
    });
    return arrayElements;
  }
  addField() {
    if(this.onlyChildPresent)
      this.onlyChildPresent=false;
    var temp = this.parseFormValues(this.registerForm.value);
    temp.push({ name: 'NewRelationship', source: this.data.ip,destination:'',description:'',group:'',icon:'fa fa-desktop'  });
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(temp, true)
    );
    this.data.list = temp;
    //console.log('addField');
  }
  toggleToUpdateScreen() {
    this.data.list=this.filterListForChildRelationship(this.data.list);
    if(this.data.list.length==0){
      this.onlyChildPresent=true;
    }
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(this.data.list, true)
    );
    this.editMode = true;
    //console.log('toggleToUpdateScreen');
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
  onSubmit() {
    this._spinner.setSpinnerState(true);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this._spinner.setSpinnerState(false);
      return;
    }
    //console.log(this.parseFormValues(this.registerForm.value));
    this.vms
      .updateRelatedVMSData(
        this.data.ip,
        this.parseFormValues(this.registerForm.value)
      )
      .then((res: any) => {
        this._spinner.setSpinnerState(false);
        res = JSON.parse(res);

        this.dialogRef.close(res);
      })
      .catch((err: any) => {
        this._spinner.setSpinnerState(false);
        this.dialogRef.close(err);
      });
  }
  parseFormValues(formValues: any) {
    console.log(formValues);
    var keys = Object.keys(formValues);
    var length = keys.length;
    var temp: any = [];
    for (var i = 0; i < length / 6; i++) {
      temp.push({
        name: formValues['relationship_' + i],
        source: formValues['relationship_' + i + '_source'],
        destination: formValues['relationship_' + i + '_destination'],
        description: formValues['relationship_' + i + '_description'],
        group:formValues['relationship_' + i + '_group'],
        icon:formValues['relationship_' + i + '_icon'],
      });
    }

    return temp;
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
  parseFormControls(
    list: Array<{ name: string; source: string; destination:string;description:string;group:string,icon:string }>,
    editMode: boolean
  ) {
    var formControls: any = {};
    if (editMode) {
      for (var i = 0; i < list.length; i++) {
        formControls['relationship_' + i] = [
          list[i].name,
          [Validators.required,CustomValidator.restrictWhiteSpace,Validators.maxLength(30)],
        ];
        formControls['relationship_' + i + '_source'] = [
          list[i].source,
          Validators.required,
        ];
        formControls['relationship_' + i + '_destination'] = [
          list[i].destination,
          Validators.required,
        ];
        formControls['relationship_' + i + '_description'] = [
          list[i].description
        ];
        formControls['relationship_' + i + '_group'] = [
          list[i].group
        ];
        formControls['relationship_' + i + '_icon'] = [
          list[i].icon
        ];
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        formControls['list_item_'+i+'_name'] = [list[i].name, [Validators.required,CustomValidator.restrictWhiteSpace,Validators.maxLength(15)]];
        formControls['list_item_'+i+'_source'] = [list[i].source, Validators.required];
        formControls['list_item_'+i+'_destination'] = [list[i].destination, Validators.required];
        formControls['list_item_'+i+'_description'] = [list[i].description];
        formControls['list_item_'+i+'_group'] = [list[i].group];
        formControls['list_item_'+i+'_icon'] = [list[i].icon];
      }
    }
    //console.log(formControls);
    return formControls;
  }
  toggleNoRecordScreen() {
    this.registerForm = this.formBuilder.group(
      this.parseFormControls(
        [
          { name: 'NewRelationship', source: this.data.ip,destination:'',description:'',group:'',icon:'fa fa-desktop' },
          
        ],
        true
      )
    );
    this.data.list = [
      { name: 'NewRelationship', source: this.data.ip,destination:'',description:'',group:'',icon:'fa fa-desktop'  },
      
    ];
    this.dataLoaded = true;
    this.norecordFound = false;
    this.editMode = true;
  }
}
