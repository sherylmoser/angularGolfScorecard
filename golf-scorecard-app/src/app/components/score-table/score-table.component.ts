import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { CourseHole } from 'src/app/interfaces/courseHole';
import { Player } from 'src/app/interfaces/player';
import { GetCourseService } from 'src/app/services/get-course.service';
import { PlayerInfoService } from 'src/app/services/player-info.service';


@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent implements OnInit {
  players: Player[] = [];
  teeBoxIndex: number;
  frontNine: CourseHole[];
  backNine: CourseHole[];
  headers: string[] = [""]

  displayedColumns: string[] = ['Hole', 'Yards', 'Par', 'Handicap'];

  constructor(
    private playerInfoService: PlayerInfoService,
    private route: ActivatedRoute,
    private courseService: GetCourseService
  ) { }

  ngOnInit(): void {
    this.players = this.playerInfoService.getPlayerInfo();
    this.route.params.pipe(
      switchMap(params => {
        this.teeBoxIndex = params['teeTypeId'] - 1;
        return this.courseService.getCourseInfo(params['courseId'])
      }),
      map((res: any) => {
        let courseHoleArray = res.data.holes;
        this.frontNine = [];
        this.backNine = [];
        for (let i = 0; i < 9; i++) {
          this.frontNine.push(({
            id: i + 1,
            par: courseHoleArray[i].teeBoxes[this.teeBoxIndex].par,
            handicap: courseHoleArray[i].teeBoxes[this.teeBoxIndex].hcp,
            teeHexColor: courseHoleArray[i].teeBoxes[this.teeBoxIndex].teeHexColor,
            yards: courseHoleArray[i].teeBoxes[this.teeBoxIndex].yards
          }))
        };
        for (let i = 9; i < 18; i++) {
          this.backNine.push(({
            id: i + 1,
            par: courseHoleArray[i].teeBoxes[this.teeBoxIndex].par,
            handicap: courseHoleArray[i].teeBoxes[this.teeBoxIndex].hcp,
            teeHexColor: courseHoleArray[i].teeBoxes[this.teeBoxIndex].teeHexColor,
            yards: courseHoleArray[i].teeBoxes[this.teeBoxIndex].yards
          }))
        }
        console.log(this.frontNine);

      })
    ).subscribe();
  }

}
