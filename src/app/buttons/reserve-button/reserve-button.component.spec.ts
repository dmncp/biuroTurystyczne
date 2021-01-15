import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveButtonComponent } from './reserve-button.component';

describe('ReserveButtonComponent', () => {
  let component: ReserveButtonComponent;
  let fixture: ComponentFixture<ReserveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
