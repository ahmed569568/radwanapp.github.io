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
  constructor( private productService: ProductsService, private cartService: CartService,
               private storage: LocalStorageService, private spinner: RadwanSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.storage.set('compare',[3,4])
    this.compare([3,4])
    
  }

  addToCart(id:any) {
    this.spinner.show();
    console.log("id",id);
    if (this.storage.get('cart')){      
      this.cartService.patch(id,1,this.storage.get('cart')).subscribe((response:any) => {
        console.log("Res", response)
        this.checkCart();
        this.spinner.hide();
      })
     
    } else {
      console.log("sfsdf")
      this.cartService.put(id,1).subscribe((response:any)=> {
        this.storage.set('cart',response.data.cart);
        this.checkCart();
       
        
        this.spinner.hide();
      })
    }
  }
  checkCart() {
    if(this.storage.get('cart')) {
      this.cartService.get(this.storage.get('cart')).subscribe((response:any)=> {
        console.log("response", response)
        response.data.forEach(element => {
          this.carts[this.products.map(function(product) { return product.id; }).indexOf(element.product.id)]=true;
        });
        console.log(" this.carts",  this.carts)
      })
    }
  }

  remove(id:any) {
    // if (this.storage.get('compare').indexOf(id) == 0) {
    //   this.storage.get('compare').shift();
    //   this.storage.set('compare',this.storage.get('compare'));
    //   console.log("this.storage.get('compare')", this.storage.get('compare'))
    //   this.compare(this.storage.get('compare'))
    // } else if (this.storage.get('compare').indexOf(id) == this.storage.get('compare').length-1) {
    //   this.storage.set('compare', this.storage.get('compare').pop())
    //   this.compare(this.storage.get('compare').pop());
    // } else if (this.storage.get('compare').length == 1) {
    //   this.storage.set('compare',[]);
    //   this.products = []

    // } else {
    //   var compare = this.storage.get('compare').splice(this.storage.get('compare').indexOf(id),1);
    //   this.compare(compare);
    // }

 
  }

 compare(ids){
  this.productService.compare(ids).subscribe( (data:any) => {
    this.products = data.products;
    this.carts = [...this.products];
    this.carts.fill(false);
    this.checkCart();
    this.spinner.hide();
  })
 }

}
