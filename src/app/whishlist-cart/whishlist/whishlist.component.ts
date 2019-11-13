import { Component, OnInit } from '@angular/core';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CartService } from 'src/app/services/cart.service';
import { RadwanSpinnerService } from 'src/app/services/radwan-spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {
  whishlistItems:any [];
  whishlistEmpty:boolean;
  wishlistSpinner:boolean;
  constructor(private whishlistService: WhishlistService, private storage: LocalStorageService,
              private cartService: CartService, private spinner: RadwanSpinnerService,
              private router: Router) { 
                this.wishlistSpinner = false;
              }

  ngOnInit() {
    this.spinner.show();
    if (this.storage.get('whishlist') != null) {
      this.whishlistService.get(this.storage.get('whishlist')).subscribe( (data:any)=> {
        this.whishlistItems = data.product;
        if (this.whishlistItems.length == 0 ) {
          this.whishlistEmpty = true;
          this.whishlistService.active.next(false);
          this.spinner.hide();
        }
        this.spinner.hide();
      })
    } else {
      this.whishlistEmpty = true;
      this.spinner.hide();
    }
  }

  removeFromWhishlist(id) {
    this.wishlistSpinner = true;
    this.whishlistService.delete(id,this.storage.get('whishlist')).subscribe( (response:any) => {
      this.wishlistSpinner = false;
      if ( response.product.length == 0) {
        this.whishlistEmpty = true;
        // if no items in whishlist then deactive whishlist
        this.whishlistService.active.next(false);
      } else {
        this.whishlistEmpty = false;
        this.whishlistItems = response.product;
      }
    })
  }
  
  addToCart(id:any) {
    this.cartService.showAdd();
    if(this.storage.get('cart')) {
      this.cartService.patch(id,1,this.storage.get('cart')).subscribe( (data:any) => {
        this.removeFromWhishlist(id);
      })
    } else {
      this.cartService.put(id,1).subscribe( (response:any) => {
        this.storage.set('cart', response.data.cart)
        this.removeFromWhishlist(id);
      })
      
    }
  }

  navigateProduct(id:any) {
    this.router.navigate( ['./product-details/', id] );
  }
  
}
