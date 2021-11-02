import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamLeadComponent } from './add-team-lead.component';

describe('AddTeamLeadComponent', () => {
  let component: AddTeamLeadComponent;
  let fixture: ComponentFixture<AddTeamLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
