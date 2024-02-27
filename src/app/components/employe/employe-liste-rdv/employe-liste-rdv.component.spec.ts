import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeListeRdvComponent } from './employe-liste-rdv.component';

describe('EmployeListeRdvComponent', () => {
  let component: EmployeListeRdvComponent;
  let fixture: ComponentFixture<EmployeListeRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeListeRdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeListeRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
