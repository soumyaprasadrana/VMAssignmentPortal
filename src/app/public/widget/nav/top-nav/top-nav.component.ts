import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GlobalSearchService } from '../../../services/global-search.service';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  @Input() globarSearchText!:string;
  constructor(private searchService: GlobalSearchService) { }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  setGlobalFilterText(text:string): void {
    console.log('Sending Filter text from nav-bar-component:'+text);
    this.searchService.setFilterText(text);
}

clearGlobalFilterText(): void {
    // clear messages
    this.searchService.clearText();
}
}
