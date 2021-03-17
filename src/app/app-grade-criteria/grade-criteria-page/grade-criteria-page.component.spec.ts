import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCriteriaPageComponent } from './grade-criteria-page.component';

describe('GradeCriteriaPageComponent', () => {
  let component: GradeCriteriaPageComponent;
  let fixture: ComponentFixture<GradeCriteriaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeCriteriaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeCriteriaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
