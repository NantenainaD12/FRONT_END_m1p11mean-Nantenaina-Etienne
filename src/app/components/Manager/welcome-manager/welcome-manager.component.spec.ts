import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeManagerComponent } from './welcome-manager.component';

describe('WelcomeManagerComponent', () => {
  let component: WelcomeManagerComponent;
  let fixture: ComponentFixture<WelcomeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
