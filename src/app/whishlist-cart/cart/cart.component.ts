import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { Router } from '@angular/router';
import { RadwanSpinnerService } from 'src/app/services/radwan-spinner.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any;
  cartTotal: any;
  cartEmpty: boolean;
  spinnerCart: boolean;

  constructor(private cartService: CartService, private storage: LocalStorageService,
              private whishlist: WhishlistService, private router: Router,
              private spinner: RadwanSpinnerService) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.cartTotal = '00';
    this.spinnerCart = false;
  }

  ngOnInit() {
    //get total When you want go directly to checkout
    this.cartService.checkout.subscribe(data => {
      this.init();
    })
    this.init();
  }

  public init() {
    this.spinner.show();
    if (this.storage.get('cart') != null) {
      this.cartEmpty = false;
      this.cartService.get(this.storage.get('cart')).subscribe((response: any) => {
        this.cartItems = response.data
        this.total();
        this.spinner.hide();
      })
    } else {
      this.cartEmpty = true;
      this.cartTotal = '00';
      //to show total in parent component in whishlist-cart 
      this.cartService.Total.next(this.cartTotal);
      this.spinner.hide();
    }
  }

  public total() {
    var total = 0;
    if (this.cartItems.length != 0) {
      this.cartItems.forEach(element => {
        total += element.product.price;
      });
      this.cartTotal = total;
      this.storage.set('total', this.cartTotal)
      this.cartService.Total.next(this.cartTotal);

    } else {
      this.cartTotal = '00';
      this.cartEmpty = true;
      this.storage.set('total', this.cartTotal);
      this.cartService.Total.next(this.cartTotal);
      this.cartService.active.next(false);
    }
  }

  removeFromCart(id) {
    this.cartService.showRemove();
    this.spinnerCart = true;
    this.cartService.delete(id, this.storage.get('cart')).subscribe((response: any) => {
      this.spinnerCart = false;
      if (response.data.length == 0) {
        this.cartTotal = '00';
        this.storage.set('total', '00');
        this.cartEmpty = true;
        this.cartService.Total.next(this.cartTotal);
        this.cartService.active.next(false);
      } else {
        this.cartItems = response.data;
        this.total();
      }
    })
  }

  addToWhishlist(item: any) {
    if (this.storage.get('whishlist')) {
      this.whishlist.patch(item.product.id, this.storage.get('whishlist')).subscribe((data: any) => {
        this.removeFromCart(item.id);
      })
    } else {
      this.whishlist.put(item.product.id).subscribe((data: any) => {
        this.storage.set('whishlist', data.id)
        this.removeFromCart(item.id);
      })

    }
  }

  navigateProduct(id: any) {
    this.router.navigate(['./product-details/', id]);
  }

}
