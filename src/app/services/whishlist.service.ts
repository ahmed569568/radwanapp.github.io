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
  

  get(id:any) {
    return this.http.get( this.url + 'wishlist/' + id + '/', this.httpOptions);
  }

  put(id:any) {
    var data = { 'product_id':id }
    return this.http.post(this.url + 'wishlist/', data, this.httpOptions);
  }

   patch(id:any,wishlistID:any){
    var data = { 'product_id':id,  'wishlist': wishlistID };
    return this.http.post(this.url + 'wishlist/', data, this.httpOptions);
  }
  

  delete(id:any, whislistID:any) {
    return this.http.delete(this.url + 'wishlist/' + whislistID + '/?product=' + id);
  }

   // http://elogail.bit68.com/api/wishlist/2/?product=4
}
