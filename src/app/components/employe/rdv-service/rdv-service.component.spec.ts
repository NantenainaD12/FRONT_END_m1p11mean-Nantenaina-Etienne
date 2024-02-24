import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvServiceComponent } from './rdv-service.component';

describe('RdvServiceComponent', () => {
  let component: RdvServiceComponent;
  let fixture: ComponentFixture<RdvServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdvServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
