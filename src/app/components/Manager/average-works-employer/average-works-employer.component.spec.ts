import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageWorksEmployerComponent } from './average-works-employer.component';

describe('AverageWorksEmployerComponent', () => {
  let component: AverageWorksEmployerComponent;
  let fixture: ComponentFixture<AverageWorksEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageWorksEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageWorksEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
