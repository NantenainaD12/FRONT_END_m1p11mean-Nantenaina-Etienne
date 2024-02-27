import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreSpecialManagerComponent } from './offre-special-manager.component';

describe('OffreSpecialManagerComponent', () => {
  let component: OffreSpecialManagerComponent;
  let fixture: ComponentFixture<OffreSpecialManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreSpecialManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreSpecialManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
