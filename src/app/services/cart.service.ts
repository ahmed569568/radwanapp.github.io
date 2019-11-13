import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: any;
  httpOptions: any;
  public active = new Subject<boolean>();
  public Total = new Subject<any>();
  public cartNotifAdd = new Subject<boolean>();
  public cartNotifRemove = new Subject<boolean>();
  public outOfStock = new Subject<boolean>();
  public checkout = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    this.url = 'http://elogail.bit68.com/api/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  get(cartID: any) {
    return this.http.get(this.url + 'cart/me/' + cartID, this.httpOptions);
  }

  put(id: any, quantity: any) {
    var data = { 'product': id, 'quantity': quantity }
    //make cart active in header
    this.active.next(true);
    return this.http.post(this.url + 'cart/me/', data, this.httpOptions);

  }
  patch(id: any, quantity: any, cartID: any) {
    var data = { 'product': id, 'quantity': quantity, 'cart': cartID };
    //make cart active in header
    this.active.next(true);
    return this.http.post(this.url + 'cart/me/', data, this.httpOptions);
  }

  delete(id: any, cartID: any) {
    return this.http.delete(this.url + 'cart/me/' + cartID + '/?cart_product=' + id, this.httpOptions);
  }

  //show modal Product Added to cart from radwan-cart-modal component
  showAdd() {
    this.cartNotifAdd.next(true);
    setInterval(() => {
      this.hideAdd()
    }, 5000)
  }
  //hide modal product Added to cart .. ... ... ... ... ... 
  hideAdd() {
    this.cartNotifAdd.next(false);
  }

  //show modal product removed from cart from radwan-cart-modal component
  showRemove() {
    this.cartNotifRemove.next(true);
    setInterval(() => {
      this.hideRemove()
    }, 5000)
  }
  //hide modal removed from cart 
  hideRemove() {
    this.cartNotifRemove.next(false);
  }
  //show modal product out of stock modal from .... ..... ......
  showOutStock() {
    this.outOfStock.next(true);
    setInterval(() => {
      this.hideOutStock()
    }, 5000)

  }
  //hide modal prodcut out of stock ..................
  hideOutStock() {
    this.outOfStock.next(false);
  }

  //emit event go ot checkout page
  toCheckout() {
    this.checkout.next('true');
  }

}


