import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string;
 
  constructor(private http: HttpClient) {
    this.url = 'http://elogail.bit68.com/api/'
   }

   getProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'

      })
    };
     return this.http.get( this.url + 'products/',httpOptions);
   }
}
