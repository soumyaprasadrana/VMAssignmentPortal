import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicObjectAppEditRecordComponent } from './dynamicobjectapp-edit-record.component';

describe('DynamicObjectAppAddRecordComponent', () => {
  let component: DynamicObjectAppEditRecordComponent;
  let fixture: ComponentFixture<DynamicObjectAppEditRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicObjectAppEditRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicObjectAppEditRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
