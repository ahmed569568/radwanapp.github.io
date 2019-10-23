import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

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
    name: new FormControl('',[Validators.required,Validators.minLength(2)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone : new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    city: new FormControl('',[Validators.required,Validators.minLength(2)])
  });
  constructor( private product: ProductsService) { 
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
 
  
  get email() {
    return this.paymentForm.get('email');
  }

  get name() {
    return this.paymentForm.get('name');
  }

  get phone() {
    return this.paymentForm.get('phone');
  }

  get city() {
    return this.paymentForm.get('city');
  }
  
  payNow() {
   
    this.product.submitForm(this.paymentForm.value)
    console.log("this.paymentForm.value", )
  }
}
