import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmmHomeComponent } from './vmm-home.component';

describe('VmmHomeComponent', () => {
  let component: VmmHomeComponent;
  let fixture: ComponentFixture<VmmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmmHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
