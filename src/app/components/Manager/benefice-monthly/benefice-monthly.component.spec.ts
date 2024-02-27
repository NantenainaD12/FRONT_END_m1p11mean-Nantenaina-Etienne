import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeMonthlyComponent } from './benefice-monthly.component';

describe('BeneficeMonthlyComponent', () => {
  let component: BeneficeMonthlyComponent;
  let fixture: ComponentFixture<BeneficeMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficeMonthlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeneficeMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
