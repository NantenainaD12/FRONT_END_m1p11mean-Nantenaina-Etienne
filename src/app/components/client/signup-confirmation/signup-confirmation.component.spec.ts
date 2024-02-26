import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSignupConfirmationComponent } from './signup-confirmation.component';

describe('ClientSignupConfirmationComponent', () => {
  let component: ClientSignupConfirmationComponent;
  let fixture: ComponentFixture<ClientSignupConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSignupConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
