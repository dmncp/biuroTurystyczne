import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOfferBtnComponent } from './see-offer-btn.component';

describe('SeeOfferBtnComponent', () => {
  let component: SeeOfferBtnComponent;
  let fixture: ComponentFixture<SeeOfferBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeOfferBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeOfferBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
