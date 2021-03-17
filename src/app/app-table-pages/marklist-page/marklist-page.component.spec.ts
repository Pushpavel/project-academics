import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarklistPageComponent } from './marklist-page.component';

describe('MarklistPageComponent', () => {
  let component: MarklistPageComponent;
  let fixture: ComponentFixture<MarklistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarklistPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarklistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
