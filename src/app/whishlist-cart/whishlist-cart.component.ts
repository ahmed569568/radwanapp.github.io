import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-whishlist-cart',
  templateUrl: './whishlist-cart.component.html',
  styleUrls: ['./whishlist-cart.component.scss']
})
export class WhishlistCartComponent implements OnInit,  AfterViewInit {
  @ViewChild('whishlist', {static:true}) whishlistStyle;
  @ViewChild('cart', {static:true}) cartStyle;
  checkout:boolean;
  total:any;
  loveAct:boolean;
  cartAct:boolean;
  constructor( private router:Router, private storage: LocalStorageService) { }

  ngOnInit() {
    if(String(this.router.url).includes('/cart')) 
      this.checkout =true;
    else if (String(this.router.url).includes('/whishlist'))
      this.checkout = false;

    this.total = this.storage.get('total')
    console.log("this.total", this.total);
  }
  ngAfterViewInit() {
    if(String(this.router.url).includes('/cart')){
      this.cartStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      this.cartStyle.nativeElement.style.color='white';
      this.whishlistStyle.nativeElement.style.marginTop='10px'
      this.loveAct= true;
      this.cartAct=false;
    } else if (String(this.router.url).includes('/whishlist')){
      this.whishlistStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      this.whishlistStyle.nativeElement.style.color='white';
      this.whishlistStyle.nativeElement.style.marginTop='82px'
      this.loveAct= false;
      this.cartAct= true;
    }
      
  }

  whishlist() {
    
      console.log("whishlist", this.router.url)
  }

  cart() {
    console.log("cart", this.router.url);
  }

  activateTab(){
    console.log("dfsdf", this.router.url)
    if(String(this.router.url).includes('/cart')){
      this.cartStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      this.cartStyle.nativeElement.style.color='white';
      this.whishlistStyle.nativeElement.style.background='white';
      this.whishlistStyle.nativeElement.style.color='black';
      this.whishlistStyle.nativeElement.style.marginTop='10px';
      this.checkout =true;
      this.loveAct= true;
      this.cartAct=false;
    } else if (String(this.router.url).includes('/whishlist')){
      this.whishlistStyle.nativeElement.style.background='rgba(231, 76, 60, 1)';
      this.whishlistStyle.nativeElement.style.color='white';
      this.cartStyle.nativeElement.style.background='white';
      this.cartStyle.nativeElement.style.color='black';
      this.whishlistStyle.nativeElement.style.marginTop='82px';
      this.checkout = false;
      this.loveAct= false;
      this.cartAct= true;
    }
  }
  

}
