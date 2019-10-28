import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { SliderService } from '../services/slider.service';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/local-storage.service';
import { WhishlistService } from '../services/whishlist.service';
import { RadwanSpinnerService } from '../services/radwan-spinner.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
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
  cartItems:any[];
  whishlistItems: any[];
  sync = faSync;
  constructor( private router: Router, private productsService:ProductsService, private route: ActivatedRoute, 
               private categoriesService: CategoriesService, private sliderService: SliderService,
               private cartService: CartService, private storage:LocalStorageService,
               private whishlistService: WhishlistService, private spinner: RadwanSpinnerService) { 
                this.categories =[];
                this.sliders= [];
                this.showCate = false;
                this.cartItems = [];
                this.whishlistItems = [];
              }

  ngOnInit() {
    this.spinner.show();
    this.categoriesService.feature().subscribe( ( data:any) => {
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
      this.checkCart();
      this.checkWhishlist();
      this.spinner.hide();
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
    if(this.carts[index]){
      this.cartService.showRemove();
      this.carts[index]=false;
      this.cartItems.forEach(item => {
        if(item.product.id == id)
          this.cartService.delete(item.id,this.storage.get('cart')).subscribe((data:any)=> {
            
          })
      })
    } else {
      this.carts[index]=true;
      this.cartService.showAdd();
        if (this.storage.get('cart')){
          console.log("cart",this.storage.get('cart'))
          this.cartService.patch(id,1,this.storage.get('cart')).subscribe((response:any) => {
            
          })
         
        } else {
          this.cartService.put(id,1).subscribe((response:any)=> {
           
            this.storage.set('cart',response.data.cart)
          })
        }
          
        
     
    }
    
  }
  addToWhishlist(id:any, index:any) {
    if(this.likes[index]) {
      this.likes[index]=false;

      this.whishlistService.delete(id,this.storage.get('whishlist')).subscribe( (data:any)=> {
      })
    } else {
      this.likes[index]=true;
      if (this.storage.get('whishlist')) {
        this.whishlistService.patch(id,this.storage.get('whishlist')).subscribe((data:any)=> {

        })

      } else {
        console.log("id", id)
        this.whishlistService.put(id).subscribe((data:any)=> {
          console.log("data", data)
          this.storage.set('whishlist',data.id);
        })
      }
    }
      
  } 

  checkCart() {
    if(this.storage.get('cart')) {
      this.cartService.get(this.storage.get('cart')).subscribe((response:any)=> {
        this.cartItems = response.data
        console.log('this.cartItems', this.cartItems)
        response.data.forEach(element => {
          this.carts[this.products.map(function(product) { return product.id; }).indexOf(element.product.id)]=true;
        });
      })
    }
  }

  checkWhishlist() {
    if (this.storage.get('whishlist')){
      this.whishlistService.get(this.storage.get('whishlist')).subscribe( (data:any)=> {
        this.whishlistItems = data.product;
        data.product.forEach(product => {
          this.likes[this.products.map(function(product) { return product.id; }).indexOf(product.id)]=true;
        });
      })
    } 
  }

  compare(id:any) {
    var productsID =  this.storage.get('compare');
    console.log("compare",this.storage.get('compare'));

    if (productsID ) {
      if (productsID.indexOf(id) != -1) {
        this.router.navigate(['./compare'], { relativeTo: this.route});
      } else {
        if(productsID.length >= 3) {
          this.router.navigate(['./compare'], { relativeTo: this.route });
        } else {
          productsID.push(id);
          console.log("productsID", productsID)
          this.storage.set('compare', productsID);
          this.router.navigate(['./compare'], { relativeTo: this.route });
        }
      }
    } else {
      this.storage.set('compare', [id]);
      this.router.navigate(['./compare'], { relativeTo: this.route });

    }
  }

  searchCategory(id:any) {
    console.log("id", id);
    this.router.navigate(['./search'], { relativeTo: this.route, queryParams: { category: id} })
  }
}
