import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  constructor( private route: Router, private productsService:ProductsService ) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe( (data:any) => {
      this.products = data;
      console.log(" this.products",  this.products);
    }) ;
    
  }
  navSearch() {
    this.route.navigate(['./product-details']);
  }

}
