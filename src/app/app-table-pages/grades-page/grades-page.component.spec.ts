import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesPageComponent } from './grades-page.component';

describe('GradesPageComponent', () => {
  let component: GradesPageComponent;
  let fixture: ComponentFixture<GradesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
