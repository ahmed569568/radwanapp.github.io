import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  url: any;
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

  public get() {
    return this.http.get(this.url + 'brands/', this.httpOptions);
  }

}
