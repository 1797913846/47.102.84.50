import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChedanComponent } from './chedan.component';

describe('ChedanComponent', () => {
  let component: ChedanComponent;
  let fixture: ComponentFixture<ChedanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChedanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChedanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
