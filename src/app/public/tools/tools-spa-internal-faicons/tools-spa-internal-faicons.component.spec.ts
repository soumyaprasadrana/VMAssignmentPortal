import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FAIconsComponent } from './tools-spa-internal-faicons.component';

describe('ToolsLtbComponent', () => {
  let component: FAIconsComponent;
  let fixture: ComponentFixture<FAIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FAIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
