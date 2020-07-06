import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalFlowComponent } from './capital-flow.component';

describe('CapitalFlowComponent', () => {
  let component: CapitalFlowComponent;
  let fixture: ComponentFixture<CapitalFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapitalFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
