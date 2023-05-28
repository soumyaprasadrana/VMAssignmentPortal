// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-02-26 18:26:41
 * @modify date 2022-02-26 18:26:41
 * @desc Portal Side Nav Component
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/public/services/authservice.service';
import { GlobalSearchService } from 'src/app/public/services/global-search.service';
import { PortalThemesService } from 'src/app/public/services/portal.thems.service';
import { SpinnerService } from 'src/app/public/services/spinner-service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { PassChangeDialogComponent } from '../../alert-dialog/change-pass-dialog';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  loggedUser!: any;
  THEME_LOCAL = 'theme';
  quicklinks: [] = [];
  constructor(
    private searchService: GlobalSearchService,
    private auth: AuthserviceService,
    private router: Router,
    private dialog: MatDialog,
    private _spinner: SpinnerService,
    private themeService: PortalThemesService
  ) {
    this.themeService.getQuickLinks().then((res: any) => {
      this.quicklinks = res.quickLinksMetaData;
    });
  }

  ngOnInit() {
    this.loggedUser = this.auth.getUser();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
  openDialog() {
    this.openDialogInput(
      {
        title: 'Change Password',
      },
      (res: any) => {
        //console.log('data from close:', res);
        this._spinner.setSpinnerState(true);
        var promise = this.auth.changePassword(res);
        promise
          .then((res: any) => {
            //console.log('change Pass- res', res);
            this._spinner.setSpinnerState(false);
            res = JSON.parse(res);
            if (res.status == 'Success') {
              this.openAlertDialog({
                type: 'message',
                message: 'Password Changed Successfully!',
              });
            } else {
              this.openAlertDialog({
                type: 'alert',
                message: res.message || res.status || 'Failed',
              });
            }
          })
          .catch((err) => {
            //console.log('Error occured ! ');
            this.openAlertDialog({
              type: 'alert',
              message: err.message || err.status || 'Error Occured!',
            });
          });
      }
    );
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }
  signOut() {
    //console.log('Signing out user ...');
    var promise = this.auth.signOut();
    promise
      .then((result) => {
        if (result.status) {
          this.router.navigate(['/portal/login']).then(() => {
            window.location.reload();
          });
        } else {
          console.log('Signout Failed');
        }
      })
      .catch((result) => {
        console.log('Signout Failed');
      });
  }
  openDialogInput(data: any, callback: any) {
    this.dialog
      .open(PassChangeDialogComponent, {
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
  openAlertDialog(data: any) {
    this.dialog.open(AlertDialogComponent, {
      data: data,
      panelClass: 'app-dialog-class',
    });
  }
  setTheme(theme: string) {
    this.themeService.setThemeText(theme);
    localStorage[this.THEME_LOCAL] = JSON.stringify({
      userModified: true,
      theme: theme,
    });
  }
  versionInfo(){
    this.openAlertDialog({type:"info",message:` <div class="modal-body">
      <p class="mb-0">Version: 2.0.7</p>
      <p class="mb-0">Build Number: 207-28052023</p>
      <p >Build Date: May 28, 2023</p>
      <p>
    <!--Made with ❤ by <a href="https://in.linkedin.com/in/soumya-prasad-rana-5a7a6b70 ">Soumya</a>-->
    VM Assignment Portal 2.0.7 © 2023 All rights reserved.
 </p>
      
    </div>`});
              
  }
}
