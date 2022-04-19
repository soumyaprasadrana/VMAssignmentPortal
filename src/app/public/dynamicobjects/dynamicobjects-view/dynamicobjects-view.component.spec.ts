import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicObjectsViewComponent } from './dynamicobjects-view.component';

describe('ToolsViewComponent', () => {
  let component: DynamicObjectsViewComponent;
  let fixture: ComponentFixture<DynamicObjectsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicObjectsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicObjectsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
