import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundHomeComponent } from './page-not-found-home.component';

describe('PageNotFoundHomeComponent', () => {
  let component: PageNotFoundHomeComponent;
  let fixture: ComponentFixture<PageNotFoundHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
