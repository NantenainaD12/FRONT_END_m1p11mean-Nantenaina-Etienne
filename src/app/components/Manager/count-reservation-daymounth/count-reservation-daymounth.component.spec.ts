import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountReservationDaymounthComponent } from './count-reservation-daymounth.component';

describe('CountReservationDaymounthComponent', () => {
  let component: CountReservationDaymounthComponent;
  let fixture: ComponentFixture<CountReservationDaymounthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountReservationDaymounthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountReservationDaymounthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
