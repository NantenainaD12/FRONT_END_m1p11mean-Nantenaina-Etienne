import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeLoginComponentComponent } from './employeLoginComponent.component';

describe('EmployeLoginComponentComponent', () => {
  let component: EmployeLoginComponentComponent;
  let fixture: ComponentFixture<EmployeLoginComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeLoginComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeLoginComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
