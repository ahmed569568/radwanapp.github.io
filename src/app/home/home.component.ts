import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsService } from "../services/products.service";
import { CategoriesService } from "../services/categories.service";
import { SliderService } from "../services/slider.service";
import { CartService } from "../services/cart.service";
import { LocalStorageService } from "../services/local-storage.service";
import { WhishlistService } from "../services/whishlist.service";
import { RadwanSpinnerService } from "../services/radwan-spinner.service";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { map } from "rxjs/internal/operators/map";
import { zip } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: any;
  categories: any;
  showCate: boolean;
  sliders: any[];
  sliderAct: any;
  likes: any;
  carts: any;
  cartItems: any[];
  whishlistItems: any[];
  sync = faSync;
  featuredProducts: any;
  popularProducts: any;

  @ViewChild("recommendedScroll", { static: true, read: ElementRef })
  public recommendedScroll: ElementRef<any>;
  @ViewChild("popularScroll", { static: true, read: ElementRef })
  public popularScroll: ElementRef<any>;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private sliderService: SliderService,
    private cartService: CartService,
    private storage: LocalStorageService,
    private whishlistService: WhishlistService,
    private spinner: RadwanSpinnerService
  ) {
    this.categories = [];
    this.sliders = [];
    this.showCate = false;
    this.cartItems = [];
    this.whishlistItems = [];
    this.featuredProducts = [];
    this.popularProducts = [];
  }

  ngOnInit() {
    this.spinner.show();
    this.categoriesService.feature().subscribe((data: any) => {
      this.categories = data;
      this.showCate = true;
    });

    let featured = this.productsService.getFeaturedProducts().pipe(
      map(res => {
        this.featuredProducts = res;
        // console.log(this.featuredProducts);
        return this.featuredProducts;
      })
    );

    let popular = this.productsService.getPopularProducts().pipe(
      map(res => {
        this.popularProducts = res;
        return this.popularProducts;
      })
    );

    zip(featured, popular).subscribe(res => {
      // console.log(res);
      this.spinner.hide();
      // console.clear();
    });

    // Set
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
      // copy array of products in array of likes/carts then fill  fasle
      // then check product if product in whishlist/cart set true likes/carts
      this.likes = [...this.products];
      this.likes.fill(false);
      this.carts = [...this.likes];
      this.checkCart();
      this.checkWhishlist();
      this.spinner.hide();
    });

    this.sliderService.getSliders().subscribe((data: any) => {
      this.sliderAct = data.pictures[0];
      this.sliders = data.pictures.slice(1);
    });
  }

  navigateProduct(id: any) {
    this.router.navigate(["./product-details/", id], {
      relativeTo: this.route
    });
  }

  navigateSlider(url: any) {
    // Open Link In New Tab
    if (url)
      this.router.navigate(["/externalRedirect", { externalUrl: url }], {
        skipLocationChange: false
      });
  }

  navigateCategory() {
    this.router.navigate(["./search"], { relativeTo: this.route });
  }

  addToCart(id: any, index: any) {
    if (this.carts[index]) {
      //if product in cart already then remove from cart .
      this.cartService.showRemove();
      this.carts[index] = false;
      this.cartItems.forEach(item => {
        if (item.product.id == id)
          this.cartService
            .delete(item.id, this.storage.get("cart"))
            .subscribe((data: any) => {});
      });
    } else {
      //product not in cart
      this.carts[index] = true;
      // showAdd() display modal product added to cart
      this.cartService.showAdd();
      if (this.storage.get("cart")) {
        //user already have cart
        this.cartService
          .patch(id, 1, this.storage.get("cart"))
          .subscribe((response: any) => {});
      } else {
        // if user dosen't have cart
        this.cartService.put(id, 1).subscribe((response: any) => {
          this.storage.set("cart", response.data.cart);
        });
      }
    }
  }

  addToWhishlist(id: any, index: any) {
    // same behavoir in cart
    if (this.likes[index]) {
      this.likes[index] = false;
      this.whishlistService
        .delete(id, this.storage.get("whishlist"))
        .subscribe((data: any) => {});
    } else {
      this.likes[index] = true;
      if (this.storage.get("whishlist")) {
        this.whishlistService
          .patch(id, this.storage.get("whishlist"))
          .subscribe((data: any) => {});
      } else {
        this.whishlistService.put(id).subscribe((data: any) => {});
      }
    }
  }

  checkCart() {
    if (this.storage.get("cart")) {
      this.cartService
        .get(this.storage.get("cart"))
        .subscribe((response: any) => {
          this.cartItems = response.data;
          // if product in cart items then put index of product in carts array true
          response.data.forEach(element => {
            //compare search in array of objects so we use map function.
            this.carts[
              this.products
                .map(function(product) {
                  return product.id;
                })
                .indexOf(element.product.id)
            ] = true;
          });
        });
    }
  }

  checkWhishlist() {
    // same behavoir in checkcart
    if (this.storage.get("whishlist")) {
      this.whishlistService
        .get(this.storage.get("whishlist"))
        .subscribe((data: any) => {
          this.whishlistItems = data.product;
          data.product.forEach(product => {
            this.likes[
              this.products
                .map(function(product) {
                  return product.id;
                })
                .indexOf(product.id)
            ] = true;
          });
        });
    }
  }

  compare(id: any) {
    // get ids of products in compare array from storage
    var productsID = this.storage.get("compare");
    //check if there are compare array or not
    if (productsID) {
      //exist in  compare array
      if (productsID.indexOf(id) != -1) {
        //product already  exists in compare array then navigate to compare page.
        this.router.navigate(["./compare"], { relativeTo: this.route });
      } else {
        //check compare has more than 3 products
        if (productsID.length >= 3) {
          //if there are more than 3 products then dosen't add any products to compare array.
          this.router.navigate(["./compare"], { relativeTo: this.route });
        } else {
          //add product in compare array
          productsID.push(id);
          //sore compare array in storage
          this.storage.set("compare", productsID);
          this.router.navigate(["./compare"], { relativeTo: this.route });
        }
      }
    } else {
      // dosen't exist in compare array so create one and store in storage
      this.storage.set("compare", [id]);
      this.router.navigate(["./compare"], { relativeTo: this.route });
    }
  }

  searchCategory(id: any) {
    //navigate to search component
    this.router.navigate(["./search"], {
      relativeTo: this.route,
      queryParams: { category: id }
    });
  }

  buy(product: any) {
    //when click on buy now add to cart and navigate to cart component
    if (product.availability == "In Stock") {
      if (this.storage.get("cart")) {
        this.cartService
          .patch(product.id, "1", this.storage.get("cart"))
          .subscribe((response: any) => {
            this.router.navigate(["./whishlist-cart/cart"]);
          });
      } else {
        this.cartService.put(product.id, 1).subscribe((response: any) => {
          this.storage.set("cart", response.data.cart);

          this.router.navigate(["./whishlist-cart/cart"]);
        });
      }
    } else {
      this.cartService.showOutStock();
    }
  }
  scrollRecomRight() {
    this.recommendedScroll.nativeElement.scrollTo({
      left: this.recommendedScroll.nativeElement.scrollLeft + 150,
      behavior: "smooth"
    });
  }

  scrollRecomLeft() {
    this.recommendedScroll.nativeElement.scrollTo({
      left: this.recommendedScroll.nativeElement.scrollLeft - 150,
      behavior: "smooth"
    });
  }

  scrollPopularRight() {
    this.popularScroll.nativeElement.scrollTo({
      left: this.popularScroll.nativeElement.scrollLeft + 150,
      behavior: "smooth"
    });
  }

  scrollPopularLeft() {
    this.popularScroll.nativeElement.scrollTo({
      left: this.popularScroll.nativeElement.scrollLeft - 150,
      behavior: "smooth"
    });
  }
}
