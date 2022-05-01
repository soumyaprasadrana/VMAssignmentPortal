import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicObjectChartsViewRecordComponent } from './dynamicobjectapp-charts-view.component';

describe('DynamicObjectAppAddRecordComponent', () => {
  let component: DynamicObjectChartsViewRecordComponent;
  let fixture: ComponentFixture<DynamicObjectChartsViewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicObjectChartsViewRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicObjectChartsViewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
