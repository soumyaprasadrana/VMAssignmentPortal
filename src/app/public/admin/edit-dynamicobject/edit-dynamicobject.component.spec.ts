import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDynamicObjectComponent } from './edit-dynamicobject.component';

describe('AddDynamicObjectComponent', () => {
  let component: EditDynamicObjectComponent;
  let fixture: ComponentFixture<EditDynamicObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDynamicObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDynamicObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
