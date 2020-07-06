import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsgpComponent } from './ssgp.component';

describe('SsgpComponent', () => {
  let component: SsgpComponent;
  let fixture: ComponentFixture<SsgpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsgpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
