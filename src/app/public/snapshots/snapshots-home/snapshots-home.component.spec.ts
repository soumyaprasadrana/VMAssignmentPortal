import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotsHomeComponent } from './snapshots-home.component';

describe('SnapshotsHomeComponent', () => {
  let component: SnapshotsHomeComponent;
  let fixture: ComponentFixture<SnapshotsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
