import { Component, OnInit } from '@angular/core';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CartService } from 'src/app/services/cart.service';
import { RadwanSpinnerService } from 'src/app/services/radwan-spinner.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {
  whishlistItems:any [];
  constructor(private whishlistService: WhishlistService, private storage: LocalStorageService,
              private cartService: CartService, private spinner: RadwanSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.whishlistService.get(this.storage.get('whishlist')).subscribe( (data:any)=> {
      this.whishlistItems = data.product;
      this.spinner.hide();
      console.log("data", data);
    })
  }

  removeFromWhishlist(id) {
    this.whishlistService.delete(id,this.storage.get('whishlist')).subscribe( (response:any) => {
      this.whishlistItems = response.product;
    })
  }
  addToCart(id:any) {
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
}
