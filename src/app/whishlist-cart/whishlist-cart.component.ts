import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { RadwanSpinnerService } from '../services/radwan-spinner.service';
import { FormControl } from '@angular/forms';
import { PromotionService } from '../services/promotion.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-whishlist-cart',
  templateUrl: './whishlist-cart.component.html',
  styleUrls: ['./whishlist-cart.component.scss']
})

export class WhishlistCartComponent implements OnInit, AfterViewInit {
  @ViewChild('whishlist', { static: true }) whishlistStyle;
  @ViewChild('cart', { static: true }) cartStyle;
  checkout: boolean;
  total: any;
  loveAct: boolean;
  cartAct: boolean;
  order: boolean;
  promotion = new FormControl('');
  status: string;

  constructor(private router: Router, private storage: LocalStorageService,
              private route: ActivatedRoute, private spinner: RadwanSpinnerService,
              private promotionService: PromotionService, private cartService: CartService) {
              this.loveAct = false;
              this.cartAct = false;
              this.order = false;
              this.router.routeReuseStrategy.shouldReuseRoute = function () {
                return false;
              };
              this.total = '00'
  }

  ngOnInit() {

    this.total = this.storage.get('total');
    this.cartService.Total.subscribe((data: any) => {
      this.total = data;
    })

    if (String(this.router.url).includes('/whishlist-cart/cart'))
      this.checkout = true;
    else if (String(this.router.url).includes('/whishlist-cart/whishlist'))
      this.checkout = false;
    else if (String(this.router.url).includes('/whishlist-cart/checkout')) {
      this.checkout = true;
      this.order = true;
    }

  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (String(this.router.url).includes('/whishlist-cart/cart')) {
        this.cartStyle.nativeElement.style.background = 'rgba(231, 76, 60, 1)';
        this.cartStyle.nativeElement.style.color = 'white';
        this.whishlistStyle.nativeElement.style.marginTop = '10px'
        this.loveAct = true;
        this.cartAct = false;
        this.order = false;
      } else if (String(this.router.url).includes('/whishlist-cart/whishlist')) {
        this.whishlistStyle.nativeElement.style.background = 'rgba(231, 76, 60, 1)';
        this.whishlistStyle.nativeElement.style.color = 'white';
        this.whishlistStyle.nativeElement.style.marginTop = '82px'
        this.loveAct = false;
        this.cartAct = true;
        this.order = false;
      } else if (String(this.router.url).includes('/whishlist-cart/checkout')) {
        this.cartStyle.nativeElement.style.background = 'rgba(231, 76, 60, 1)';
        this.cartStyle.nativeElement.style.color = 'white';
        this.whishlistStyle.nativeElement.style.marginTop = '10px'
        this.loveAct = true;
        this.cartAct = false;
        this.order = true;
      }
    })

  }

 

  activateTab(value: any) {
    if (String(this.router.url).includes('/whishlist-cart/cart') && value != 'cart') {
      // this.cartStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      // this.cartStyle.nativeElement.style.color='white';
      // this.whishlistStyle.nativeElement.style.background='white';
      // this.whishlistStyle.nativeElement.style.color='black';
      // this.whishlistStyle.nativeElement.style.marginTop='10px';
      // this.checkout =true;
      // this.loveAct= true;
      // this.cartAct=false;
      // this.order = false;
      // console.log("mnekkkka");
      this.router.navigate(['./whishlist-cart/whishlist'])
    } else if (String(this.router.url).includes('/whishlist-cart/whishlist') && value != 'wishlist') {
      // this.whishlistStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      // this.whishlistStyle.nativeElement.style.color='white';
      // this.cartStyle.nativeElement.style.background='white';
      // this.cartStyle.nativeElement.style.color='black';
      // this.whishlistStyle.nativeElement.style.marginTop='82px';
      // this.checkout = false;
      // this.loveAct= false;
      // this.cartAct= true;
      // this.order = false;
      this.router.navigate(['./whishlist-cart/cart']);
      // console.log("sherymataaa");
    } else if (String(this.router.url).includes('/whishlist-cart/checkout')) {
      if (value == 'wishlist')
        this.router.navigate(['./whishlist-cart/cart']);
      else (value == 'cart')
      this.router.navigate(['./whishlist-cart/whishlist'])

    }
  }

  navCheckout() {
    //hide checkout button  in checkout page. 
    this.order = true;
    this.router.navigate(['./whishlist-cart/checkout'])
  }

  apply() {
    this.promotionService.apply(this.promotion.value, this.storage.get('cart')).subscribe((data: any) => {
      this.total = data.promotion.price_after_discount;
      this.status = 'Promotion Applied';
    }, (error: any) => {
      if (error.status == 404) {
        this.total = this.storage.get('total')
        if (error.statusText == 'Not Found') {
          this.status = 'Promotion Not Found'
        }

      }

    })
  }
  
}
