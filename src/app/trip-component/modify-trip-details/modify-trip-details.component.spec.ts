import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTripDetailsComponent } from './modify-trip-details.component';

describe('ModifyTripDetailsComponent', () => {
  let component: ModifyTripDetailsComponent;
  let fixture: ComponentFixture<ModifyTripDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyTripDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
