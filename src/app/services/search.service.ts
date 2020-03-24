import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
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

  getProduct(){
    return this.http.get(`${this.url}ProductSearchView/?query=union&sub_category=1&fbclid=IwAR2U2NNTgdTgY3Y0bnxaIygaaffjS7phpAvvgAEpzPTv1UbM2-zw5eIqtto`, this.httpOptions)
  }
  
  search(keyword: any) {
    return this.http.get(this.url + 'products/?search=' + keyword, this.httpOptions)
  }
  
  filter(catIDs, barndIDs, priceLow, priceHigh, sort) {
    return this.http.get(this.url + 'products/?category_id=' + catIDs + '&brand=' + barndIDs + '&price__lte=' + priceHigh + '&price__gte=' + priceLow + '&sort=' + sort);
  }
}
