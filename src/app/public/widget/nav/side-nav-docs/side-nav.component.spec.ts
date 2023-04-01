import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SideNavDocsComponent } from "./side-nav-docs.component";

describe("SideNavComponent", () => {
  let component: SideNavDocsComponent;
  let fixture: ComponentFixture<SideNavDocsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ SideNavDocsComponent ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
