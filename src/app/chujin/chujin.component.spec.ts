import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChujinComponent } from './chujin.component';

describe('ChujinComponent', () => {
  let component: ChujinComponent;
  let fixture: ComponentFixture<ChujinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChujinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChujinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
