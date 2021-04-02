import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcTabsBarComponent } from './mdc-tabs-bar.component';

describe('MdcTabsBarComponent', () => {
  let component: MdcTabsBarComponent;
  let fixture: ComponentFixture<MdcTabsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdcTabsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcTabsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
