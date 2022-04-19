import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsDynamicObjectsComponent } from './dynamic-objects.component';

describe('ToolsTechnotesComponent', () => {
  let component: ToolsDynamicObjectsComponent;
  let fixture: ComponentFixture<ToolsDynamicObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsDynamicObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsDynamicObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
