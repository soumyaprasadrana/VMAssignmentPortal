import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicObjectAppAddRecordComponent } from './dynamicobjectapp-add-record.component';

describe('DynamicObjectAppAddRecordComponent', () => {
  let component: DynamicObjectAppAddRecordComponent;
  let fixture: ComponentFixture<DynamicObjectAppAddRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicObjectAppAddRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicObjectAppAddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
