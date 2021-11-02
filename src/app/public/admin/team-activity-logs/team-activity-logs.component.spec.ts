import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamActivityLogsComponent } from './team-activity-logs.component';

describe('TeamActivityLogsComponent', () => {
  let component: TeamActivityLogsComponent;
  let fixture: ComponentFixture<TeamActivityLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamActivityLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamActivityLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
