import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtedVMSGraphComponent } from './related-vms-graph.component';

describe('VmChartComponent', () => {
  let component: RealtedVMSGraphComponent;
  let fixture: ComponentFixture<RealtedVMSGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealtedVMSGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtedVMSGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
