import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnotesComponent } from './add-technotes.component';

describe('AddTechnotesComponent', () => {
  let component: AddTechnotesComponent;
  let fixture: ComponentFixture<AddTechnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTechnotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
