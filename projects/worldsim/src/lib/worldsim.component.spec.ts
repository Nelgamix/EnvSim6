import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldsimComponent } from './worldsim.component';

describe('WorldsimComponent', () => {
  let component: WorldsimComponent;
  let fixture: ComponentFixture<WorldsimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldsimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldsimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
