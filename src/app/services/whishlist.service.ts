import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  url:any;
  httpOptions:any;
  constructor(private http:HttpClient) { 
    this.url = 'http://elogail.bit68.com/api/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }
  

  get() {
    return this.http.get( this.url + '/wishlist', this.httpOptions);
  }

  put(id:any) {
    var data = { 'product_id':id }
    return this.http.post(this.url + '/wishlist/', data, this.httpOptions);
  }

  delete(id:any) {
    return this.delete(this.url + '/wishlist/' + id);
  }
  
}
