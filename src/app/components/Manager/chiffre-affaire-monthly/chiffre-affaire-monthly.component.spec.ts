import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireMonthlyComponent } from './chiffre-affaire-monthly.component';

describe('ChiffreAffaireMonthlyComponent', () => {
  let component: ChiffreAffaireMonthlyComponent;
  let fixture: ComponentFixture<ChiffreAffaireMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiffreAffaireMonthlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiffreAffaireMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
