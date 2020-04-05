import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SearchService } from "../services/search.service";
import { LocalStorageService } from "../services/local-storage.service";
import { CartService } from "../services/cart.service";
import { WhishlistService } from "../services/whishlist.service";
import { CategoriesService } from "../services/categories.service";
import { BrandService } from "../services/brand.service";
import { Options } from "ng5-slider";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { RadwanSpinnerService } from "../services/radwan-spinner.service";
import "rxjs/add/operator/filter";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  newCategory:any;
  result: any;
  likes: any[];
  carts: any[];
  cartItems: any[];
  categories: any;
  brands: any;
  showCateg: boolean;
  showBrand: boolean;
  currentState: any;
  showPrice: boolean;
  value: number = 0;
  highValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000,

  };
  categoryJson: any;
  brandJson: any;
  priceJson: any;
  sortValue: any;
  sync = faSync;
  sortSelect: any;
  cateCheck: any[];
  brandCheck: any[];
  filterSpinner: boolean;
  activeCategory: number;


  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private storage: LocalStorageService,
    private cartService: CartService,
    private whishlistService: WhishlistService,
    private categoryService: CategoriesService,
    private brandService: BrandService,
    private router: Router,
    private spinner: RadwanSpinnerService
  )
  {
    this.filterSpinner = false;
    this.showCateg = true;
    this.showBrand = true;
    this.showPrice = true;
    this.categoryJson = { type: "category", values: [] };
    this.brandJson = { type: "brand", values: [] };
    this.priceJson = { type: "price", values: { low: "0", high: "10000" } };
    this.sortValue = "";
    this.cateCheck = [];
    this.brandCheck = [];

    //to excute ngOninit() When Search With Different Search Keyword Or Category Keyword On Same Route
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {

    ///my work
    this.route.queryParams.forEach(s=>{
      console.log("ssssssss",  s.subCatId);
      console.log("ssssssss",   s.CatId);
    })
    ////
    this.spinner.show();
    this.route.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        console.log(params)
        //get query parameter search and call search end point
        this.searchService.search(params.search).subscribe((data: any) => {
          this.result = data;
          this.likes = [...this.result];
          this.likes.fill(false);
          this.carts = [...this.likes];
          this.checkLikes();
          this.checkCarts();
          this.spinner.hide();
        });
      });

    this.route.queryParams
      .filter(params => params.category)
      .subscribe(params => {
        this.categoryService
          .getProducts(params.category)
          .subscribe((data: any) => {
            this.result = data;
            this.likes = [...this.result];
            this.likes.fill(false);
            this.carts = [...this.likes];
            this.checkLikes();
            this.checkCarts();
            this.spinner.hide();
          });
      });


      this.route.queryParams
      .filter(params => params.sub_category)
      .subscribe(params => {
        this.categoryService
          .getSubCategoryProducts(params.sub_category)
          .subscribe((data: any) => {
            this.result = data;
            this.likes = [...this.result];
            this.likes.fill(false);
            this.carts = [...this.likes];
            this.checkLikes();
            this.checkCarts();
            this.spinner.hide();
          });
      });

    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
      //to determine which category checked then we can reset categories in reset function
      this.cateCheck = [...this.cateCheck];
      this.cateCheck.fill(false);
    });

    this.brandService.get().subscribe((data: any) => {
      this.brands = data;
      this.brandCheck = [...this.brands];
      this.brandCheck.fill(false);
    });

    //hide categories, brands and price in mobile version

    if (window.screen.width <= 576) {
      this.showCateg = false;
      this.showBrand = false;
      this.showPrice = false;
    }

    this.getProducts();
    this.route.queryParams.subscribe(qP => {
      if (qP.category) {
        console.log(qP.category);
        this.activeCategory = +qP.category;
      }
    });
  }

  getProducts(){
    this.searchService.getProduct().subscribe(res => {
      console.log("ezzat" , res);
      this.newCategory = res;
    })
  }

  navigateProduct(id: any) {
    this.router.navigate(["./product-details/", id]);
  }

  checkLikes() {
    if (this.storage.get("whishlist")) {
      this.whishlistService
        .get(this.storage.get("whishlist"))
        .subscribe((data: any) => {
          data.product.forEach(product => {
            this.likes[
              this.result
                .map(function(product) {
                  return product.id;
                })
                .indexOf(product.id)
            ] = true;
          });
        });
    }
  }

  checkCarts() {
    if (this.storage.get("cart")) {
      this.cartService
        .get(this.storage.get("cart"))
        .subscribe((response: any) => {
          this.cartItems = response.data;
          response.data.forEach(element => {
            this.carts[
              this.result
                .map(function(product) {
                  return product.id;
                })
                .indexOf(element.product.id)
            ] = true;
          });
        });
    }
  }

  addToCart(id: any, index: any) {
    if (this.carts[index]) {
      this.cartService.showRemove();
      this.carts[index] = false;
      this.cartItems.forEach(item => {
        if (item.product.id == id)
          this.cartService
            .delete(item.id, this.storage.get("cart"))
            .subscribe((data: any) => {});
      });
    } else {
      this.carts[index] = true;
      this.cartService.showAdd();
      if (this.storage.get("cart")) {
        this.cartService
          .patch(id, 1, this.storage.get("cart"))
          .subscribe((response: any) => {});
      } else {
        this.cartService.put(id, 1).subscribe((response: any) => {
          this.storage.set("cart", response.data.cart);
        });
      }
    }
  }
  addToWhishlist(id: any, index: any) {
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
        this.whishlistService.put(id).subscribe((data: any) => {
          this.storage.set("whishlist", data.id);
        });
      }
    }
  }

  toggleCateg() {
    if (this.showCateg) {
      this.currentState = "open";
      this.showCateg = false;
    } else {
      this.currentState = "close";
      this.showCateg = true;
    }
  }

  toggleBrand() {
    if (this.showBrand) this.showBrand = false;
    else this.showBrand = true;
  }

  togglePrice() {
    if (this.showPrice) this.showPrice = false;
    else this.showPrice = true;
  }
  //Search Automatic when user check any category

  category($event) {

    if ($event.target.checked) {
      if (this.categoryJson.values.indexOf($event.target.value) == -1)
        this.categoryJson.values.push($event.target.value);
    } else {
      this.categoryJson.values.splice(
        this.categoryJson.values.indexOf($event.target.value, 1)
      );
    }
    this.search(
      this.categoryJson.values,
      this.brandJson.values,
      this.priceJson.values,
      this.sortValue
    );
  }

  brandSelect($event) {
    if ($event.target.checked) {
      if (this.brandJson.values.indexOf($event.target.value) == -1)
        this.brandJson.values.push($event.target.value);
    } else {
      this.brandJson.values.splice(
        this.categoryJson.values.indexOf($event.target.value, 1)
      );
    }
    this.search(
      this.categoryJson.values,
      this.brandJson.values,
      this.priceJson.values,
      this.sortValue
    );
  }

  price($event) {
    this.priceJson.values.low = $event.value;
    this.priceJson.values.high = $event.highValue;
    this.search(
      this.categoryJson.values,
      this.brandJson.values,
      this.priceJson.values,
      this.sortValue
    );
  }

  search(categoryValues, brandValues, priceValues, sort) {
    //if user reset search then back to origin route.
    if (
      categoryValues.length == 0 &&
      brandValues.length == 0 &&
      priceValues.low == "0" &&
      priceValues.high == "10000" &&
      sort == ""
    ) {
      this.spinner.show();
      this.route.queryParams
        .filter(params => params.search)
        .subscribe(params => {
          this.searchService.search(params.search).subscribe((data: any) => {
            this.result = data;
            this.likes = [...this.result];
            this.likes.fill(false);
            this.carts = [...this.likes];
            this.checkLikes();
            this.checkCarts();
            this.spinner.hide();
          });
        });

      this.route.queryParams
        .filter(params => params.category)
        .subscribe(params => {
          this.categoryService
            .getProducts(params.category)
            .subscribe((data: any) => {
              this.result = data;
              this.likes = [...this.result];
              this.likes.fill(false);
              this.carts = [...this.likes];
              this.checkLikes();
              this.checkCarts();
              this.spinner.hide();
            });
        });

      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = data;
      });

      this.brandService.get().subscribe((data: any) => {
        this.brands = data;
      });

      if (window.screen.width <= 576) {
        this.showCateg = false;
        this.showBrand = false;
        this.showPrice = false;
      }
    } else {
      this.filterSpinner = true;
      this.result = [];
      this.searchService
        .filter(
          categoryValues.join(","),
          brandValues.join(","),
          priceValues.low,
          priceValues.high,
          sort
        )
        .subscribe((data: any) => {
          this.result = data;
          this.likes = [...this.result];
          this.likes.fill(false);
          this.carts = [...this.likes];
          this.checkLikes();
          this.checkCarts();
          this.filterSpinner = false;
        });
    }
  }

  sort($event) {
    this.sortValue = $event.target.value;
    this.search(
      this.categoryJson.values,
      this.brandJson.values,
      this.priceJson.values,
      this.sortValue
    );
  }

  compare(id: any) {
    var productsID = this.storage.get("compare");
    if (productsID) {
      if (productsID.indexOf(id) != -1) {
        this.router.navigate(["./compare"]);
      } else {
        if (productsID.length >= 3) {
          this.router.navigate(["./compare"]);
        } else {
          productsID.push(id);
          console.log("productsID", productsID);
          this.storage.set("compare", productsID);
          this.router.navigate(["./compare"]);
        }
      }
    } else {
      this.storage.set("compare", [id]);
      this.router.navigate(["./compare"]);
    }
  }
  //back to original route where reset search
  clearSearch() {
    this.spinner.show();
    this.sortSelect = "";
    this.cateCheck.fill(false);
    this.brandCheck.fill(false);
    this.highValue = 10000;
    this.value = 0;
    this.categoryJson.values.length = 0;
    this.brandJson.values.length = 0;
    this.priceJson.values.low = "0";
    this.priceJson.values.high == "10000";
    this.sortValue = "";

    this.route.queryParams
      .filter(params => params.search)
      .subscribe(params => {
        //get query parameter search and call search end point
        this.searchService.search(params.search).subscribe((data: any) => {
          this.result = data;
          this.likes = [...this.result];
          this.likes.fill(false);
          this.carts = [...this.likes];
          this.checkLikes();
          this.checkCarts();
          this.spinner.hide();
        });
      });

    this.route.queryParams
      .filter(params => params.category)
      .subscribe(params => {
        this.categoryService
          .getProducts(params.category)
          .subscribe((data: any) => {
            this.result = data;
            this.likes = [...this.result];
            this.likes.fill(false);
            this.carts = [...this.likes];
            this.checkLikes();
            this.checkCarts();
            this.spinner.hide();
          });
      });
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
    this.brandService.get().subscribe((data: any) => {
      this.brands = data;
    });
    if (window.screen.width <= 576) {
      this.showCateg = false;
      this.showBrand = false;
      this.showPrice = false;
    }
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
}
