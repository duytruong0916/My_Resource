import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfmoonComponent } from './halfmoon.component';

describe('HalfmoonComponent', () => {
  let component: HalfmoonComponent;
  let fixture: ComponentFixture<HalfmoonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalfmoonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfmoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
