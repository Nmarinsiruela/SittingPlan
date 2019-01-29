import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanModalPage } from './plan-modal.page';

describe('PlanModalPage', () => {
  let component: PlanModalPage;
  let fixture: ComponentFixture<PlanModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
