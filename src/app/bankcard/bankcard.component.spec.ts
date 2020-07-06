import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankcardComponent } from './bankcard.component';

describe('BankcardComponent', () => {
  let component: BankcardComponent;
  let fixture: ComponentFixture<BankcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
