import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SearchService } from '../services/search.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';
import { WhishlistService } from '../services/whishlist.service';
import { CategoriesService } from '../services/categories.service';
import { BrandService } from '../services/brand.service';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Options } from 'ng5-slider';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('changeState', [
      transition('*=>open', [
        style({ opacity: 0 }),
        animate('5s', style({ opacity: 1 })),
      ]),
      transition('*=>close', [
        animate('5s', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class SearchComponent implements OnInit {
  result:any;
  likes: any[];
  carts: any[];
  cartItems: any[];
  categories:any;
  brands: any;
  showCateg: boolean;
  showBrand: boolean;
  currentState:any;
  showPrice:boolean;

  value: number = 0;
  highValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000
  };
  // searchJson: any;
  categoryJson:any;
  brandJson:any;
  priceJson:any;
  sortValue:any;
  constructor( private route: ActivatedRoute, private searchService: SearchService,
               private storage:LocalStorageService, private cartService: CartService,
               private whishlistService:WhishlistService, private categoryService: CategoriesService,
               private brandService: BrandService) {

                this.showCateg = true;
                this.showBrand = true;
                this.showPrice = true;
                this.categoryJson = { 'type': 'category','values' : []};
                this.brandJson = { 'type': 'brand','values' : []};
                this.priceJson  = { 'type': 'price', 'values': { 'low': '0', 'high': '50000'}};
                this.sortValue = '';
                // this.searchJson =  [ this.categoryJson, this.brandJson, this.priceJson ]
                }

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

  toggleCateg() {
    if(this.showCateg){

      this.currentState = 'open'
      this.showCateg=false;
    }
    else {
      this.currentState = 'close'
      this.showCateg=true;
    }
      
  }

  toggleBrand() {
    if (this.showBrand)
      this.showBrand = false;
    else 
      this.showBrand = true;
  }


  togglePrice(){
    if (this.showPrice)
      this.showPrice = false;
    else
      this.showPrice = true;
  }

  category($event) {
    if ($event.target.checked) {
      if (this.categoryJson.values.indexOf($event.target.value)==-1)
        this.categoryJson.values.push($event.target.value);
     
    }else {
      this.categoryJson.values.splice(this.categoryJson.values.indexOf(($event.target.value),1));
    }
   this.search(this.categoryJson.values, this.brandJson.values, this.priceJson.values, this.sortValue);

  }

  brandSelect($event) {
    if ($event.target.checked) {
      if (this.brandJson.values.indexOf($event.target.value)==-1)
        this.brandJson.values.push($event.target.value);
     
    }else {
      this.brandJson.values.splice(this.categoryJson.values.indexOf(($event.target.value),1));
    }
    this.search(this.categoryJson.values, this.brandJson.values, this.priceJson.values, this.sortValue);

  }


  price($event) {
    this.priceJson.values.low = $event.value;
    this.priceJson.values.high = $event.highValue;
    this.search(this.categoryJson.values, this.brandJson.values, this.priceJson.values, this.sortValue);
  }
  search(categoryValues, brandValues, priceValues,sort){
      this.result = []
      this.searchService.filter(categoryValues.join(','),brandValues.join(','),priceValues.low, priceValues.high,sort).subscribe( (data: any)=> {
        this.result = data;
        this.likes = [...this.result];
        this.likes.fill(false);
        this.carts = [...this.likes]
        this.checkLikes();
        this.checkCarts();
      })
  }

  sort($event) {
    this.sort = $event.target.value;
  }
}
