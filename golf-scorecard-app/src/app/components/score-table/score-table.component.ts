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

  constructor(
    private playerInfoService: PlayerInfoService,
    private route: ActivatedRoute,
    private courseService: GetCourseService
  ) { }

  ngOnInit(): void {
    this.players = this.playerInfoService.getPlayerInfo();
    this.route.params.pipe(
      switchMap(params => {
        console.log(params['courseId']);

        if (params['courseId'] === '19002') {
          this.teeBoxIndex = params['teeTypeId'] - 2;
        } else {
          this.teeBoxIndex = params['teeTypeId'] - 1;
        }
        return this.courseService.getCourseInfo(params['courseId'])
      }),
      map((res: any) => {
        let courseHoleArray = res.data.holes;
        this.frontNine = [];
        this.backNine = [];
        console.log(courseHoleArray);

        for (let i = 0; i < 9; i++) {
          this.frontNine.push(({
            id: i + 1,
            par: courseHoleArray[i].teeBoxes[this.teeBoxIndex].par,
            handicap: courseHoleArray[i].teeBoxes[this.teeBoxIndex].hcp,
            yards: courseHoleArray[i].teeBoxes[this.teeBoxIndex].yards
          }))
        };
        for (let i = 9; i < 18; i++) {
          this.backNine.push(({
            id: i + 1,
            par: courseHoleArray[i].teeBoxes[this.teeBoxIndex].par,
            handicap: courseHoleArray[i].teeBoxes[this.teeBoxIndex].hcp,
            yards: courseHoleArray[i].teeBoxes[this.teeBoxIndex].yards
          }))
        }
        console.log(this.frontNine);
      })
    ).subscribe();
  }
  getRowTotal(row: string, holeArray: CourseHole[]) {
    let total = 0;
    holeArray.map(hole => {
      total += hole[row]
    });
    return total;
  }
  getCourseTotal(row) {
    let total = 0;
    this.frontNine.map(hole => {
      total += hole[row]
    });
    this.backNine.map(hole => {
      total += hole[row]
    });
    return total;
  }
  addToScore(player: Player, value: string, index: number, holeArray: CourseHole[]) {
    if (!parseInt(value)) {
      return
    }
    if (holeArray === this.frontNine) {
      player.frontNine[index] = parseInt(value);
    } else {
      player.backNine[index] = parseInt(value)
    }
    this.playerInfoService.setPlayerInfo(this.players);
  }
  outTotal(player: Player) {
    let total = 0;
    player.frontNine.map(score => {
      total += score;
    })
    return total
  }
  inTotal(player: Player) {
    let total = 0;
    player.backNine.map(score => {
      total += score;
    })
    return total
  }
  playerTotal(player: Player) {
    return this.outTotal(player) + this.inTotal(player)
  }
}
