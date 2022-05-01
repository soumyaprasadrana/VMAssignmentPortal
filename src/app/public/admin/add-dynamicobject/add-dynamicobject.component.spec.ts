import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDynamicObjectComponent } from './add-dynamicobject.component';

describe('AddDynamicObjectComponent', () => {
  let component: AddDynamicObjectComponent;
  let fixture: ComponentFixture<AddDynamicObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDynamicObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDynamicObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
