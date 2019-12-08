import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

  getProducts() {
    return this.http.get(this.url + 'products', this.httpOptions);
  }

  getProduct(id: any) {
    return this.http.get(this.url + 'products/' + id, this.httpOptions);
  }

  getFeaturedProducts() {
    return this.http.get(this.url + 'products/?featured=true', this.httpOptions);
  }


  getPopularProducts() {
    return this.http.get(this.url + 'products/?popular=true', this.httpOptions);
  }


  getPopularProduct() {
    return this.http.get(this.url + 'popular_products', this.httpOptions);
  }

  getRecommendedProducts() {
    return this.http.get(this.url + 'reccommended_products', this.httpOptions);
  }
  compare(ids) {
    return this.http.get(this.url + 'products/compare/?product_ids=' + ids);

  }

}
