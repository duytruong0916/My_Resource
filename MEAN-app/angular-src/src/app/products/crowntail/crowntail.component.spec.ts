import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowntailComponent } from './crowntail.component';

describe('CrowntailComponent', () => {
  let component: CrowntailComponent;
  let fixture: ComponentFixture<CrowntailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowntailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowntailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
