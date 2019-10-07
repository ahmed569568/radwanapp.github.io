import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any;
  cartTotal:any;
  constructor(private cartService: CartService,private storage: LocalStorageService, private whishlist: WhishlistService) { 

  }

  ngOnInit() {
    this.cartService.get(this.storage.get('cart')).subscribe( (response:any) => {
      console.log("Response", response);
      this.cartItems = response.data
      this.total();
    })
  }

  total() {
    var total=0;
     this.cartItems.forEach(element => {
      total += element.product.price;
    });
    this.cartTotal = total;
    this.storage.set('total', this.cartTotal)
  }
  removeFromCart(id) {
    this.cartService.delete(id,this.storage.get('cart')).subscribe( (response:any) => {
      console.log("data", response);
      this.cartItems = response.data;
    })
    console.log("shokry", id)
  }
  addToWhishlist(item:any) {
    if(this.storage.get('whishlist')) {
      this.whishlist.patch(item.product.id,this.storage.get('whishlist')).subscribe( (data:any) => {
        console.log("data", data);
        this.removeFromCart(item.id);
      })
    } else {
      this.whishlist.put(item.product.id).subscribe( (data:any) => {
        this.storage.set('whishlist', data.id)
        this.removeFromCart(item.id);
      })
      
    }
  }
}
