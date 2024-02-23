import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDoneDailyComponent } from './task-done-daily.component';

describe('TaskDoneDailyComponent', () => {
  let component: TaskDoneDailyComponent;
  let fixture: ComponentFixture<TaskDoneDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDoneDailyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDoneDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
