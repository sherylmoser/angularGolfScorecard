import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCourseService {

  constructor(
    private _http: HttpClient
  ) { }

  getCourseInfo(courseId: number) {
    let url: string = `https://golf-courses-api.herokuapp.com/courses/${courseId}`
    return this._http.get(url)
  }

}