import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPlannerComponent } from './tour-planner.component';

describe('TourPlannerComponent', () => {
  let component: TourPlannerComponent;
  let fixture: ComponentFixture<TourPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
