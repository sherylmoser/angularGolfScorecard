import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { CourseSelectFormComponent } from './components/course-select-form/course-select-form.component';
import { ScoreTableComponent } from './components/score-table/score-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavComponent } from './components/top-nav/top-nav.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NameCheckPipe } from './pipes/name-check.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CourseSelectFormComponent,
    ScoreTableComponent,
    TopNavComponent,
    NameCheckPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
