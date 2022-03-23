import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseSelectFormComponent } from '../components/course-select-form/course-select-form.component';
import { ScoreTableComponent } from '../components/score-table/score-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CourseSelectFormComponent },
  { path: 'scorecard', component: ScoreTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
