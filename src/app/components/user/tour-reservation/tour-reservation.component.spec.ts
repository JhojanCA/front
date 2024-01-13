import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourReservationComponent } from './tour-reservation.component';

describe('TourReservationComponent', () => {
  let component: TourReservationComponent;
  let fixture: ComponentFixture<TourReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
