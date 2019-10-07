import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { SliderService } from '../services/slider.service';
import { CartService } from '../services/cart.service';
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
  likes:any;
  carts:any;
  constructor( private router: Router, private productsService:ProductsService, private route: ActivatedRoute, 
               private categoriesService: CategoriesService, private sliderService: SliderService,
               private cartService: CartService) { 
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
      this.likes =[...this.products]
      this.likes.fill(false);
      this.carts = [...this.likes]
      console.log("this.likes", this.likes)
      console.log(" this.products",  this.products);
    }) ;

    
    this.sliderService.getSliders().subscribe( (data:any) => {
      console.log("Sliders", data);
      this.sliderAct = data.pictures[0];
      this.sliders = data.pictures.slice(1);
    })

    
  }
  navigateProduct(id:any) {
    this.router.navigate( ['./product-details/', id] , { relativeTo: this.route } );
     
  }

  navigateSliderProduct(url:any) {
    console.log(
      "url", url
    )
    if (url) 
    this.router.navigate(['/externalRedirect', { externalUrl: url}], { skipLocationChange: false,});
  }

  navigateCategory() {
    this.router.navigate(['./search'], { relativeTo: this.route})
    
  }
  addToCart(id:any,index:any){
    if(this.carts[index])
      this.carts[index]=false;
    else {
      this.carts[index]=true;
      this.cartService.put(id,1).subscribe((data:any)=> {
        console.log("data", data);
        data.cart
      })
    }
    
  }
  addToWhishlist(id:any, index:any) {
    if(this.likes[index])
      this.likes[index]=false;
    else
      this.likes[index]=true;
  } 
}
