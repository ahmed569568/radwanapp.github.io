import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { SliderService } from '../services/slider.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;
  categories: any;
  showCate: boolean;
  sliders: any[];
  sliderAct: any;
  constructor( private router: Router, private productsService:ProductsService, private route: ActivatedRoute, 
               private categoriesService: CategoriesService, private sliderService: SliderService) { 
                this.categories =[];
                this.sliders= [];
                this.showCate = false;
              }

  ngOnInit() {

    this.categoriesService.getCategories().subscribe( ( data:any) => {
      console.log("this.categories", data);
      this.categories = data;
      this.showCate = true;
    })
    this.productsService.getProducts().subscribe( (data:any) => {
      this.products = data;
      console.log(" this.products",  this.products);
    }) ;

    
    this.sliderService.getSliders().subscribe( (data:any) => {
      this.sliderAct = data.pictures[0].picture;
      this.sliders = data.pictures.slice(1);
    })

    
  }
  navigateProduct(id:any) {
    this.router.navigate( ['./product-details/', id] , { relativeTo: this.route } );
     
  }

}
