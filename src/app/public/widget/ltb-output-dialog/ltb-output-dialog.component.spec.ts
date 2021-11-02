import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtbOutputDialogComponent } from './ltb-output-dialog.component';

describe('LtbOutputDialogComponent', () => {
  let component: LtbOutputDialogComponent;
  let fixture: ComponentFixture<LtbOutputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtbOutputDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtbOutputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
