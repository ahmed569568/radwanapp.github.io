import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  url: string;
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.url = 'http://elogail.bit68.com/api/';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  getSliders() {
    return this.http.get(this.url + 'slider_view', this.httpOptions);
  }
}
