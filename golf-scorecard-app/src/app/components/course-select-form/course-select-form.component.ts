import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { CourseName } from 'src/app/interfaces/course-name';
import { Tee } from 'src/app/interfaces/tee';
import { GetCourseService } from 'src/app/services/get-course.service';
import { PlayerInfoService } from 'src/app/services/player-info.service';


@Component({
  selector: 'app-course-select-form',
  templateUrl: './course-select-form.component.html',
  styleUrls: ['./course-select-form.component.scss']
})
export class CourseSelectFormComponent implements OnInit {
  selectedCourseId: number = 0;
  selectedTeeType: number = 0;
  courses: CourseName[] = [
    { courseId: 11819, name: 'Thanksgiving Point' },
    { courseId: 18300, name: 'Fox Hollow' },
    { courseId: 19002, name: 'Spanish Oaks' },
  ];
  tees: Tee[] = [];
  form: FormGroup;
  fb: FormBuilder = new FormBuilder;

  constructor(
    private courseService: GetCourseService,
    private router: Router,
    private playerInfoService: PlayerInfoService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      course: [this.courses, Validators.required],
      tee: [this.tees, Validators.required],
      players: fb.array([fb.group({
        name: [''],
        frontNine: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
        backNine: [[0, 0, 0, 0, 0, 0, 0, 0, 0]]
      })])
    })
  }

  ngOnInit(): void {
  }

  getCourseTees(selectedCourseId: number) {
    this.courseService.getCourseInfo(selectedCourseId).subscribe((res: any) => {
      this.tees = [];
      res.data.holes[0].teeBoxes.forEach((teeBox: { teeTypeId: number; teeType: string; }) => {
        this.tees.push({
          teeId: teeBox.teeTypeId, teeType: teeBox.teeType
        })
      });
    });
  }

  get players(): FormArray {
    return this.form.get('players') as FormArray
  }

  addPlayer(): void {
    this.players.push(this.fb.group({
      name: [''],
      frontNine: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],
      backNine: [[0, 0, 0, 0, 0, 0, 0, 0, 0]]
    }))
  }

  onSubmit() {
    this.playerInfoService.setPlayerInfo(this.players.value);
    // this.router.navigate(['/scorecard', { courseId: this.selectedCourseId, teeTypeId: this.selectedTeeType }])
    this.router.navigate(['/scorecard', { courseId: this.form.controls['course'].value, teeTypeId: this.form.controls['tee'].value }])
  }

}

