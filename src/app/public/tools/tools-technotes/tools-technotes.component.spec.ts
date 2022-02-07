import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsTechnotesComponent } from './tools-technotes.component';

describe('ToolsTechnotesComponent', () => {
  let component: ToolsTechnotesComponent;
  let fixture: ComponentFixture<ToolsTechnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsTechnotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsTechnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
