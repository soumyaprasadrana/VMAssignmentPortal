import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsDbtComponent } from './tools-dbt.component';

describe('ToolsDbtComponent', () => {
  let component: ToolsDbtComponent;
  let fixture: ComponentFixture<ToolsDbtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsDbtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsDbtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
