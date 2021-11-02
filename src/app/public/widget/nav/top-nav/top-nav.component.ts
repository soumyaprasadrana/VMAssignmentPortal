import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GlobalSearchService } from '../../../services/global-search.service';
import { AuthserviceService } from 'src/app/public/services/authservice.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  constructor(
    private searchService: GlobalSearchService,
    private auth: AuthserviceService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('Nav Bar evenrt Url', event.url);
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
  }

  ngOnInit() {
    this.loggedUser = this.auth.getUser();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  setGlobalFilterText(text: string): void {
    console.log('Sending Filter text from nav-bar-component:' + text);
    this.searchService.setFilterText(text);
  }

  clearGlobalFilterText(): void {
    // clear messages
    this.searchService.clearText();
  }

  signOut() {
    console.log('Signing out user ...');
    var promise = this.auth.signOut();
    promise
      .then((result) => {
        if (result.status) {
          this.router.navigate(['/portal/login']);
        } else {
          console.log('Signout Failed');
        }
      })
      .catch((result) => {
        console.log('Signout Failed');
      });
  }
}
