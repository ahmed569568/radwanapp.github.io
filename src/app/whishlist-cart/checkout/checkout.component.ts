import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  address: string;
  editAdd: boolean;
  cashDelvery: boolean;
  onlinePayment:  boolean;
  constructor() { 
    this.cashDelvery = false;
    this.onlinePayment = true;
  }

  ngOnInit() {
    this.address = 'your home or work adress to shipping your home or work adress to shipping';
  }

  editAddress() {
    if (this.editAdd == true)
      this.editAdd = false;
    else 
      this.editAdd = true;
  }

  selectCash($event) {
    console.log("selectCash()", $event.target.checked);
    this.onlinePayment = false;
  } 
  selectPayment($event) {
    this.cashDelvery = false;
  }
}
