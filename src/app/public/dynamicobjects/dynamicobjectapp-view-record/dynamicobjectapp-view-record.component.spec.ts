import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicObjectAppViewRecordComponent } from './dynamicobjectapp-view-record.component';

describe('DynamicObjectAppAddRecordComponent', () => {
  let component: DynamicObjectAppViewRecordComponent;
  let fixture: ComponentFixture<DynamicObjectAppViewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicObjectAppViewRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicObjectAppViewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
