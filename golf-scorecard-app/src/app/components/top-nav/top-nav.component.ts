import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGolfBall } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  faGolfBall = faGolfBall;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToCourseSelect() {
    this.router.navigate(['./home'])
  }

}

