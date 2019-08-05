import { Component, OnInit } from '@angular/core';


declare var $:any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  buy(){
    console.log("sfsdfsdfa");
  }
  next() {
    console.log("next");
  }
  previous(){
    console.log("previous");
  }
}
