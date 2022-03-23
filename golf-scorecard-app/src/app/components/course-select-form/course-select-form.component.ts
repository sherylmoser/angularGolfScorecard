import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
    { value: 11819, viewValue: 'Thanksgiving Point' },
    { value: 18300, viewValue: 'Fox Hollow' },
    { value: 19002, viewValue: 'Spanish Oaks' },
  ];
  tees: Tee[] = [];
  form: FormGroup;
  fb: FormBuilder = new FormBuilder

  constructor(
    private courseService: GetCourseService,
    private router: Router,
    private playerInfoService: PlayerInfoService,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      players: fb.array([fb.group({
        name: [''],
        score: [0]
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
          value: teeBox.teeTypeId, viewValue: teeBox.teeType
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
      score: [0]
    }))
  }

  onSubmit() {
    this.playerInfoService.setPlayerInfo(this.players.value);
    this.router.navigate(['/scorecard', { courseId: this.selectedCourseId, teeTypeId: this.selectedTeeType }])
  }

}

