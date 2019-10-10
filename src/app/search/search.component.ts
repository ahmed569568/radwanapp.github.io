import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SearchService } from '../services/search.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';
import { WhishlistService } from '../services/whishlist.service';
import { CategoriesService } from '../services/categories.service';
import { BrandService } from '../services/brand.service';
import { faAngleUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  result:any;
  likes: any[];
  carts: any[];
  cartItems: any[];
  categories:any;
  brands: any;
  
  constructor( private route: ActivatedRoute, private searchService: SearchService,
               private storage:LocalStorageService, private cartService: CartService,
               private whishlistService:WhishlistService, private categoryService: CategoriesService,
               private brandService: BrandService) { }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.search)
    .subscribe(params => {
      //get query parameter search and call search end point
      this.searchService.search(params.search).subscribe((data:any) => {
        this.result = data;
        this.likes = [...this.result];
        this.likes.fill(false);
        this.carts = [...this.likes]
        this.checkLikes();
        this.checkCarts();
      })
    })
    this.categoryService.getCategories().subscribe(( data: any)=> {
      this.categories = data;
    })
    this.brandService.get().subscribe(( data:any) => {
      this.brands = data;
    })
  }
  mm(data) {
    console.log(data);
  }
  navigateProduct(id:any) {
  
  }
  checkLikes() {
    if (this.storage.get('whishlist')){
      this.whishlistService.get(this.storage.get('whishlist')).subscribe( (data:any)=> {
        data.product.forEach(product => {
          this.likes[this.result.map(function(product) { return product.id; }).indexOf(product.id)]=true;
        });
        console.log("this.likes", this.likes);
      })
      
    } 
  }
  checkCarts() {
    if(this.storage.get('cart')) {
      this.cartService.get(this.storage.get('cart')).subscribe((response:any)=> {
        this.cartItems = response.data
        response.data.forEach(element => {
          this.carts[this.result.map(function(product) { return product.id; }).indexOf(element.product.id)]=true;
        });
        console.log("Popular Products popularCarts", this.carts)
      })
     
    }
  }

  addToCart(id:any,index:any){
    if(this.carts[index]){
      this.carts[index]=false;
      this.cartItems.forEach(item => {
        if(item.product.id == id)
          this.cartService.delete(item.id,this.storage.get('cart')).subscribe((data:any)=> {})
      })
    } else {
      this.carts[index]=true;
      
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
}
