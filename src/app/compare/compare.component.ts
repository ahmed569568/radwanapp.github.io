import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  products:any;
  constructor( private productService: ProductsService) { }

  ngOnInit() {
    this.productService.compare().subscribe( (data:any) => {
      console.log("data", data);
      this.products = data.products;
      this.products.forEach(product => {
        console.log("product", product.productimage[0].image)
        
      });
    })
  }

}
