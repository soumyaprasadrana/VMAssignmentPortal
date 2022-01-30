import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

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
import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { Config } from 'src/app/app.config';
import { SpinnerService } from '../../services/spinner-service';
import { AlertDialogComponent } from './alert-dialog.component';

export interface DialogData {
  type?: string;
  iconClass?: string;
  message?: string;
  label?: string;
  list?: [];
  title?: string;
  placeholder?: string;
  bindLabel?: string;
  isText?: boolean;
  titleIcon?: boolean;
  defaultValue?: string;
}
@Component({
  selector: 'app-file-choose-dialog',
  templateUrl: './file-choose-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
})
export class FileChooseDialogComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  public dataCtrl = new FormControl();
  @ViewChild('dataCtrl', { static: false })
  uploadFileInput!: ElementRef;
  afuConfig: AngularFileUploaderConfig;
  resetUpload1!: boolean;
  sampleDownloadUrl!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<FileChooseDialogComponent>,
    private formBuilder: FormBuilder,
    private config: NgSelectConfig,
    private appConfg: Config,
    private dialog: MatDialog,
    private spinner: SpinnerService
  ) {
    this.config.appendTo = 'body';
    var url = appConfg.apiUrl + '/api/vm/upload';
    this.sampleDownloadUrl = appConfg.apiUrl + '/api/vm/excelimport/sample';

    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.xlsx,.xls,.csv',
      maxSize: 20,
      uploadAPI: {
        url: url,
      },
      theme: 'dragNDrop',

      fileNameIndex: true,
      autoUpload: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag and Drop',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit',
      },
    };
  }

  ngOnInit(): void {
    var defaultV = null;
    if (this.data.defaultValue) defaultV = this.data.defaultValue;
    this.registerForm = this.formBuilder.group({
      dataCtrl: [defaultV, Validators.required],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    console.log('submit called');
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.dialogRef.close(this.registerForm.value);
  }
  getFileName(path: string) {
    var pathArr = path.split('\\');
    return pathArr[pathArr.length - 1];
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);

      if (
        (!'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'.includes(
          file.type
        ) &&
          !'application/vnd.ms-excel'.includes(file.type)) ||
        file.type == ''
      ) {
        alert('Only EXCEL Docs Allowed!');
        this.registerForm.controls['dataCtrl'].patchValue('', {
          onlySelf: true,
          event,
        });
      }
    }
  }
  fileSelected(event: any) {}
  docUpload(event: any) {
    console.log('docUpload :: event :', event);
    this.spinner.setSpinnerState(true);
    if (event.status != 200) {
      this.spinner.setSpinnerState(false);
      if (event.status == 400 && event.error.mandatoryHeaders) {
        this.openDialog(
          {
            type: 'alert',
            message:
              event.error.message +
              '\n Mandatory fields: [' +
              event.error.mandatoryHeaders +
              '] \n Other Allowed Fields: [' +
              event.error.otherAllowedHeaders +
              ']',
          },
          null
        );
      } else if (
        (event.status == 400 && event.error.duplicateIP) ||
        (event.status == 400 && event.error.nofile) ||
        (event.status == 400 && event.error.noRecord)
      ) {
        this.openDialog(
          {
            type: 'alert',
            message: event.error.message,
          },
          null
        );
      } else {
        this.openDialog(
          {
            type: 'alert',
            message: 'Error Occurred! Check console log for more details!',
          },
          null
        );
      }
    } else {
      this.spinner.setSpinnerState(false);
      var refreshRequired: boolean = false;
      event = JSON.parse(event.body);
      if (event.resultList) {
        var html = '<h3>Result </h3>';
        html +=
          '<table class="table table-striped dataTable ">' +
          '<th>IP</th>' +
          '<th>Status</th>' +
          '<th>Message</th>';
        for (var i = 0; i < event.resultList.length; i++) {
          var item: any = event.resultList[i];
          html += '<tr>';
          html += '<td>';
          html += item.ip;
          html += '</td>';

          html += '<td>';
          html += '<div>';
          if (item.status == 'Success') {
            refreshRequired = true;
            html +=
              '<span ><i class="fa fa-check-circle text-success"></i></span>';
          } else {
            html +=
              '<span ><i class="fa fa-times-circle text-danger"></i></span>';
          }
          html += '<span>';

          html += '</span>';
          html += '</td>';

          html += '<td>';
          if (typeof item.message != 'undefined') html += item.message;
          html += '</td>';

          html += '</tr>';
        }
        html += '</table>';
        if (refreshRequired) {
          this.openDialog(
            {
              type: 'message',
              message: html,
            },
            (res: any) => {
              window.location.reload();
            }
          );
        } else {
          this.openDialog(
            {
              type: 'message',
              message: html,
            },
            null
          );
        }
      } else {
        this.spinner.setSpinnerState(false);
        this.openDialog(
          {
            type: 'alert',
            message: event.message,
          },
          null
        );
      }
      this.spinner.setSpinnerState(false);
    }
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
