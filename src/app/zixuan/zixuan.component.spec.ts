import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZixuanComponent } from './zixuan.component';

describe('ZixuanComponent', () => {
  let component: ZixuanComponent;
  let fixture: ComponentFixture<ZixuanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZixuanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZixuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
