import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  products:any;
  constructor( private productService: ProductsService, private cartService: CartService, private storage: LocalStorageService) { }

  ngOnInit() {
    this.productService.compare().subscribe( (data:any) => {
      console.log("data", data);
      this.products = data.products;
      this.products.forEach(product => {
        console.log("product", product.productimage[0].image)
        
      });
    })
  }

  addToCart(id:any) {
    console.log("sdfsdfsd")
    if (this.storage.get('cart')){
      console.log("cart",this.storage.get('cart'))
      this.cartService.patch(id,1,this.storage.get('cart')).subscribe((response:any) => {
        console.log("Res", response)
      })
     
    } else {
      this.cartService.put(id,1).subscribe((response:any)=> {
        console.log("xn", Response)
        this.storage.set('cart',response.data.cart)
      })
    }
  }

}
