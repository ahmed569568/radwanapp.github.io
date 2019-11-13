import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
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

  apply(code, cart) {
    return this.http.get(this.url + 'promotion?code=' + code + '&cart=' + cart)
  }
}
