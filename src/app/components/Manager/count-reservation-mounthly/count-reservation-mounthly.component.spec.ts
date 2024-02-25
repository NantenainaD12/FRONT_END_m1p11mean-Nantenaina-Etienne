import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountReservationMounthlyComponent } from './count-reservation-mounthly.component';

describe('CountReservationMounthlyComponent', () => {
  let component: CountReservationMounthlyComponent;
  let fixture: ComponentFixture<CountReservationMounthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountReservationMounthlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountReservationMounthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
