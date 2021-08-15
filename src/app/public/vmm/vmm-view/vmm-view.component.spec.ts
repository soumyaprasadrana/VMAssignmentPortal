import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmmViewComponent } from './vmm-view.component';

describe('VmmViewComponent', () => {
  let component: VmmViewComponent;
  let fixture: ComponentFixture<VmmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmmViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
