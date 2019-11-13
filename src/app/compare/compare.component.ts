import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/local-storage.service';
import { RadwanSpinnerService } from '../services/radwan-spinner.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})

export class CompareComponent implements OnInit {
  products:any;
  carts: Array<any>;
  showTable: boolean;
  constructor( private productService: ProductsService, private cartService: CartService,
               private storage: LocalStorageService, private spinner: RadwanSpinnerService) { 
                 this.showTable = false;
               }

  ngOnInit() {
    this.spinner.show();
    this.compare(this.storage.get('compare'))
  }

  addToCart(id:any) {
    this.cartService.showAdd();
    if (this.storage.get('cart')){      
      this.cartService.patch(id,1,this.storage.get('cart')).subscribe((response:any) => {
        this.checkCart();
      })
    } else {
      this.cartService.put(id,1).subscribe((response:any)=> {
        this.storage.set('cart',response.data.cart);
        this.checkCart();
      })
    }
  }

  checkCart() {
    if(this.storage.get('cart')) {
      this.cartService.get(this.storage.get('cart')).subscribe((response:any)=> {
        response.data.forEach(element => {
          this.carts[this.products.map(function(product) { return product.id; }).indexOf(element.product.id)]=true;
        });
      })
    }
  }

  remove(id:any) {
    this.spinner.show();
    var compare = this.storage.get('compare');
    //if product first product in array compare
    if (compare.indexOf(id) == 0) {
      //if product only in array compare
      if (this.storage.get('compare').length == 1) {
        this.storage.set('compare',[]);
        this.products = []
        this.showTable = false;
        this.spinner.hide();
        return ;
      }
      compare.shift();
      this.storage.set('compare',compare);
      this.compare(compare);
      //if product last in array compare 
    } else if (this.storage.get('compare').indexOf(id) == this.storage.get('compare').length-1) {
      compare.pop();
      this.storage.set('compare', compare)
      this.compare(compare);
      //else last product in array
    }  else {
      var compare = this.storage.get('compare').splice(this.storage.get('compare').indexOf(id),1);
      this.compare(compare);
    }

 
  }

 compare(ids){
  this.productService.compare(ids).subscribe( (data:any) => {
    this.products = data.products;
    this.carts = [...this.products];
    this.carts.fill(false);
    this.checkCart();
    this.showTable = true;
    this.spinner.hide();
  } , err => {
    this.showTable = false;
    this.spinner.hide();
  })
 }

}
