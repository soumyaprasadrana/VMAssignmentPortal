import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GlobalSearchService } from '../../../services/global-search.service';
import { AuthserviceService } from 'src/app/public/services/authservice.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PassChangeDialogComponent } from '../../alert-dialog/change-pass-dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { SpinnerService } from 'src/app/public/services/spinner-service';
import { PortalThemesService } from 'src/app/public/services/portal.thems.service';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Input() globarSearchText!: string;
  showGlobalSearch: boolean = false;
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
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        //console.log('Nav Bar evenrt Url', event.url);
        var temp = event.url.split('/');
        if (
          event.url.includes('/portal/home/dash') ||
          temp[temp.length - 1] == 'home'
        ) {
          this.showGlobalSearch = true;
        } else {
          this.showGlobalSearch = false;
        }
      });
    this.themeService.getQuickLinks().then((res: any) => {
      this.quicklinks = res.quickLinksMetaData;
    });
  }

  ngOnInit() {
    this.loggedUser = this.auth.getUser();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  setGlobalFilterText(text: string): void {
    //console.log('Sending Filter text from nav-bar-component:' + text);
    this.searchService.setFilterText(text);
  }

  clearGlobalFilterText(): void {
    // clear messages
    this.searchService.clearText();
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
}
