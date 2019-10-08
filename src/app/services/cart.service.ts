import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
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
  
  get(cartID:any){
    return this.http.get( this.url + 'cart/me/' + cartID, this.httpOptions);
  }

  put(id:any,quantity:any) {
    var data = { 'product':id, 'quantity':quantity }
    return this.http.post(this.url + 'cart/me/', data, this.httpOptions);
  }
  patch(id:any,quantity:any,cartID:any){
    var data = { 'product':id, 'quantity':quantity, 'cart': cartID };
    return this.http.post(this.url + 'cart/me/', data, this.httpOptions);
  }

  delete(id:any,cartID:any){
    return this.http.delete( this.url + 'cart/me/' + cartID  + '/?cart_product=' + id , this.httpOptions);
  }
 
}


