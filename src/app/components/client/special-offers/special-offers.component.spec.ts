import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSpecialOffersComponent } from './special-offers.component';

describe('ClientSpecialOffersComponent', () => {
  let component: ClientSpecialOffersComponent;
  let fixture: ComponentFixture<ClientSpecialOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSpecialOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientSpecialOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
