import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysScheduleComponent } from './todays-schedule.component';

describe('TodaysScheduleComponent', () => {
  let component: TodaysScheduleComponent;
  let fixture: ComponentFixture<TodaysScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
