import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsSpaComponent } from './tools-spa.component';

describe('ToolsSpaComponent', () => {
  let component: ToolsSpaComponent;
  let fixture: ComponentFixture<ToolsSpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsSpaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsSpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
