import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotsViewComponent } from './snapshots-view.component';

describe('SnapshotsViewComponent', () => {
  let component: SnapshotsViewComponent;
  let fixture: ComponentFixture<SnapshotsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
