import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicobjectsHomeComponent } from './dynamicobjects-home.component';

describe('DynamicobjectsHomeComponent', () => {
  let component: DynamicobjectsHomeComponent;
  let fixture: ComponentFixture<DynamicobjectsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicobjectsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicobjectsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
