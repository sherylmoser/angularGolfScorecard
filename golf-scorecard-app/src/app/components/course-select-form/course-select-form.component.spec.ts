import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSelectFormComponent } from './course-select-form.component';

describe('CourseSelectFormComponent', () => {
  let component: CourseSelectFormComponent;
  let fixture: ComponentFixture<CourseSelectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSelectFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSelectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
