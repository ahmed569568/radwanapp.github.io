import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url:any;
  httpOptions:any;
  constructor( private http: HttpClient) { 
    this.url = 'http://elogail.bit68.com/api/';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  getCategories() {
    return this.http.get( this.url + 'categories',this.httpOptions);
  }

  getSubCategories() {
    return this.http.get( this.url + 'subcategories', this.httpOptions);
  }
}
