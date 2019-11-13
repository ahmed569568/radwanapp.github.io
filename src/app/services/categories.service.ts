import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
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

  getCategories() {
    return this.http.get(this.url + 'categories', this.httpOptions);
  }

  feature() {
    return this.http.get(this.url + 'categories/?is_featured=1', this.httpOptions);
  }

  getSubCategories(id: any) {
    return this.http.get(this.url + 'categories/' + id, this.httpOptions);
  }

  getProducts(id: any) {
    return this.http.get(this.url + 'products/?category_id=' + id, this.httpOptions);
  }

  getSubCategoryProducts(id: any) {
    return this.http.get(this.url + 'products/?subcategory_id=' + id, this.httpOptions);
  }

  getSubcateAndProductOfCate(id: any) {
    return this.http.get(this.url + 'subcategory/?category=' + id);
  }
}
