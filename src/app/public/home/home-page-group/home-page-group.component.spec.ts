import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageGroupComponent } from './home-page-group.component';

describe('HomePageGroupComponent', () => {
  let component: HomePageGroupComponent;
  let fixture: ComponentFixture<HomePageGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
