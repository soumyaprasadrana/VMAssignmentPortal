import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTechnoteComponent } from './view-technote.component';

describe('ViewTechnoteComponent', () => {
  let component: ViewTechnoteComponent;
  let fixture: ComponentFixture<ViewTechnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTechnoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTechnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
