import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDynamicObjectComponent } from './view-dynamicobject.component';

describe('AddDynamicObjectComponent', () => {
  let component: ViewDynamicObjectComponent;
  let fixture: ComponentFixture<ViewDynamicObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDynamicObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDynamicObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
