import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-radwan-cart-modal',
  templateUrl: './radwan-cart-modal.component.html',
  styleUrls: ['./radwan-cart-modal.component.scss']
})
export class RadwanCartModalComponent implements OnInit {
  showAdd: boolean;
  showRemove: boolean;
  showOutStock: boolean;
  constructor( private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartNotifAdd.subscribe( data => {
    
      this.showAdd = data;
     
    })
    this.cartService.cartNotifRemove.subscribe( data => {
    
      this.showRemove = data;
     
    })
    this.cartService.outOfStock.subscribe( data => {
      this.showOutStock = data;
    })
  }

  hideNotif() {
    this.showAdd = false;
    this.showRemove = false;
    this.showOutStock = false;
  }

}
