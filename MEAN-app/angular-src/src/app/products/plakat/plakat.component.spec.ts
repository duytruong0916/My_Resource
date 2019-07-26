import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlakatComponent } from './plakat.component';

describe('PlakatComponent', () => {
  let component: PlakatComponent;
  let fixture: ComponentFixture<PlakatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlakatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlakatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
