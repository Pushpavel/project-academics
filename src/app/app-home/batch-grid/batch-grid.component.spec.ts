import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchGridComponent } from './batch-grid.component';

describe('BatchGridComponent', () => {
  let component: BatchGridComponent;
  let fixture: ComponentFixture<BatchGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
