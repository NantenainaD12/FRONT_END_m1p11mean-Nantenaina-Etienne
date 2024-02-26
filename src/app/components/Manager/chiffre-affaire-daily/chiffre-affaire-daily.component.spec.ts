import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireDailyComponent } from './chiffre-affaire-daily.component';

describe('ChiffreAffaireDailyComponent', () => {
  let component: ChiffreAffaireDailyComponent;
  let fixture: ComponentFixture<ChiffreAffaireDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiffreAffaireDailyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiffreAffaireDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
