import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChicangComponent } from './chicang.component';

describe('ChicangComponent', () => {
  let component: ChicangComponent;
  let fixture: ComponentFixture<ChicangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChicangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChicangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
