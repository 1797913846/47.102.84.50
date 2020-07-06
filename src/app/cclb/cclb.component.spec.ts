import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CclbComponent } from './cclb.component';

describe('CclbComponent', () => {
  let component: CclbComponent;
  let fixture: ComponentFixture<CclbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CclbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CclbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
