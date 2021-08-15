import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLtbComponent } from './tools-ltb.component';

describe('ToolsLtbComponent', () => {
  let component: ToolsLtbComponent;
  let fixture: ComponentFixture<ToolsLtbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsLtbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsLtbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
