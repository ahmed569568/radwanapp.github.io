import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

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
  paymentForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phone : new FormControl('',Validators.required),
    city: new FormControl('',Validators.required)
  });
  constructor() { 
    this.cashDelvery = false;
    this.onlinePayment = true;
  }

  ngOnInit() {
    
    this.address = 'your home or work address to shipping your home or work address to shipping';
  }

  editAddress() {
    this.address = '';
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
  payNow() {
    console.log("this.paymentForm.value", this.paymentForm.value)
  }
}
