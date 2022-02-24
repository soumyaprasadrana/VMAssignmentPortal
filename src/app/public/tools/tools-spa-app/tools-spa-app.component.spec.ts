import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsSpaAppComponent } from './tools-spa-app.component';

describe('ToolsSpaAppComponent', () => {
  let component: ToolsSpaAppComponent;
  let fixture: ComponentFixture<ToolsSpaAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsSpaAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsSpaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
