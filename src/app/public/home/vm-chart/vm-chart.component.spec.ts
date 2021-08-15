import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmChartComponent } from './vm-chart.component';

describe('VmChartComponent', () => {
  let component: VmChartComponent;
  let fixture: ComponentFixture<VmChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
