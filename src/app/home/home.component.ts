import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  categories: any;
  constructor( private router: Router, private productsService:ProductsService, private route: ActivatedRoute, 
               private categoriesService: CategoriesService)
              { }

  ngOnInit() {

    this.categoriesService.getCategories().subscribe( ( data:any) => {
      console.log("this.categories", data);
      this.categories = data;
    })
    this.productsService.getProducts().subscribe( (data:any) => {
      this.products = data;
      console.log(" this.products",  this.products);
    }) ;

    

    
  }
  navigateProduct(id:any) {
    this.router.navigate( ['./product-details/', id] , { relativeTo: this.route } );
     
  }

}
