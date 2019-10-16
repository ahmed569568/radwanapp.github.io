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
    this.spinner.show();
    var compare = this.storage.get('compare');
    console.log("Inside Remove")
    console.log("compare", compare);
    console.log("id",id);
    console.log("compare between", compare.indexOf(id))
    if (compare.indexOf(id) == 0) {

      if (this.storage.get('compare').length == 1) {
        console.log("Only One Item In Compare")
        this.storage.set('compare',[]);
        this.products = []
        this.showTable = false;
        this.spinner.hide();
        return;
      }
      console.log("first item in products")
      compare.shift();
      this.storage.set('compare',compare);
      console.log("this.storage.get('compare')", this.storage.get('compare'))
      this.compare(compare);
    } else if (this.storage.get('compare').indexOf(id) == this.storage.get('compare').length-1) {
      console.log("last item in compare",compare);
      compare.pop();
      this.storage.set('compare', compare)
      this.compare(compare);
    }  else {
      var compare = this.storage.get('compare').splice(this.storage.get('compare').indexOf(id),1);
      this.compare(compare);
      console.log("All Items In Array")
    }

 
  }

 compare(ids){
  this.productService.compare(ids).subscribe( (data:any) => {
    console.log("data all", data)
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
