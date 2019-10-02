import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-whishlist-cart',
  templateUrl: './whishlist-cart.component.html',
  styleUrls: ['./whishlist-cart.component.scss']
})
export class WhishlistCartComponent implements OnInit,  AfterViewInit {
  @ViewChild('whishlist', {static:true}) whishlistStyle;
  @ViewChild('cart', {static:true}) cartStyle;
  constructor(private activedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    if(String(this.router.url).includes('/cart')){
      this.cartStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      this.cartStyle.nativeElement.style.color='white';
    } else if (String(this.router.url).includes('/whishlist')){
      this.whishlistStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      this.whishlistStyle.nativeElement.style.color='white';
    }

      console.log("whishlist", this.router.url)
      
  }
  whishlist() {
    
      console.log("whishlist", this.router.url)
  }
  cart() {
    console.log("cart", this.router.url);
  }
}
