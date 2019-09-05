import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  constructor( private router: Router, private productsService:ProductsService, private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe( (data:any) => {
      this.products = data;
      console.log(" this.products",  this.products);
    }) ;
    
  }
  navigateProduct(id:any) {
    this.router.navigate( ['./product-details/', id] , { relativeTo: this.route } );
     
  }

}
