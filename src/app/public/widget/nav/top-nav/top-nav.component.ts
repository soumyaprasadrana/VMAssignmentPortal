import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GlobalSearchService } from '../../../services/global-search.service';
import { AuthserviceService } from 'src/app/public/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  @Input() globarSearchText!: string;
  loggedUser !:any;
  constructor(private searchService: GlobalSearchService, private auth: AuthserviceService, private router: Router) { }

  ngOnInit() {
    this.loggedUser=this.auth.getUser();
    

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  setGlobalFilterText(text: string): void {
    console.log('Sending Filter text from nav-bar-component:' + text);
    this.searchService.setFilterText(text);
  }

  clearGlobalFilterText(): void {
    // clear messages
    this.searchService.clearText();
  }

  signOut() {
    console.log("Signing out user ...");
    var promise = this.auth.signOut();
    promise.then(result => {
      if (result.status) {
        this.router.navigate(['/portal/login']);
      }
      else {
        console.log("Signout Failed");
      }
    }).catch(result => {
      console.log("Signout Failed");
    });
  }
}
