import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicObjectAppHomeComponent } from './dynamicobject-app-home.component';

describe('DynamicObjectAppHomeComponent', () => {
  let component: DynamicObjectAppHomeComponent;
  let fixture: ComponentFixture<DynamicObjectAppHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicObjectAppHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicObjectAppHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
