import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JiaoyiComponent } from './jiaoyi.component';

describe('JiaoyiComponent', () => {
  let component: JiaoyiComponent;
  let fixture: ComponentFixture<JiaoyiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JiaoyiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JiaoyiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
