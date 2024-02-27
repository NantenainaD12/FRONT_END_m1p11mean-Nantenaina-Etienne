import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageprofilComponent } from './manageprofil.component';

describe('ManageprofilComponent', () => {
  let component: ManageprofilComponent;
  let fixture: ComponentFixture<ManageprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageprofilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
