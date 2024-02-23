import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAppointmentHistoryComponent } from './appointment-history.component';

describe('ClientAppointmentHistoryComponent', () => {
  let component: ClientAppointmentHistoryComponent;
  let fixture: ComponentFixture<ClientAppointmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAppointmentHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientAppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
