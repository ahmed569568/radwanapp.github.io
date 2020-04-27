import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "src/app/services/categories.service";
import { FormControl } from "@angular/forms";
import { CartService } from "src/app/services/cart.service";
import { WhishlistService } from "src/app/services/whishlist.service";
import { LocalStorageService } from "src/app/services/local-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  menue: boolean;
  menueList: Array<boolean>;
  headerList: boolean;
  lastLink: any;
  lastIndexMobile: any;
  categories: any;
  subCategories: any;
  subCateProducts: any;
  showCate: boolean;
  lastsubCateIndex: any;
  keyword = new FormControl("");
  activeCart: boolean;
  activeWhishlist: boolean;
  headerListSpinner: boolean;
  subCateList: Array<boolean>;
  subCateProd: boolean;
  CatgID;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private whishlistService: WhishlistService,
    private storage: LocalStorageService
  ) {
    this.categories = [];
    this.menue = false;
    this.menueList = [];
    this.showCate = false;
    this.subCateProducts = [];
    this.headerListSpinner = false;
    this.subCateList = [];
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((data: any) => {
      this.categories = data;
      //the next two lines to determine whish category hover on then show border bottom of specifice category
      this.menueList = [...this.categories];
      this.menueList.fill(false);
      this.showCate = true;
    });

    if (this.storage.get("cart")) {
      this.cartService
        .get(this.storage.get("cart"))
        .subscribe((response: any) => {
          if (response.data.length) this.activeCart = true;
        });
    }

    if (this.storage.get("whishlist")) {
      this.whishlistService
        .get(this.storage.get("whishlist"))
        .subscribe((data: any) => {
          if (data.product.length) this.activeWhishlist = true;
        });
    }

    //show active cart if event active cart have been emitted from cart service
    this.cartService.active.subscribe(data => {
      this.activeCart = data;
    });

    //show active whishlist if event active whishlist have been emitted from whishlist service
    this.whishlistService.active.subscribe(data => {
      this.activeWhishlist = data;
    });
  }

  search() {
    this.router.navigate(["./search/"], {
      queryParams: { search: this.keyword.value }
    });
  }

  searchCategory(id: any) {
    this.router.navigate(["./search"], {
      relativeTo: this.route,
      queryParams: { category: id }
    });
  }
  searchCategoryMobile(id: any, menueList: any) {
    console.log("id", id);
    console.log("menueList", menueList);
    // if user in search page already and he wants to close this category from menue
    //then he will close only  and still in same page not redirect to search again
    if (!menueList) {
      this.router.navigate(["./search"], {
        relativeTo: this.route,
        queryParams: { category: id }
      });
    }
  }
  goHome() {
    this.router.navigate(["./"]);
  }

  navTo(sub_category) {
    this.router.navigate(["./search"], {
      queryParams: { sub_category: sub_category, CatId: this.CatgID }
    });
  }

  showBorder(index, cateID) {
    //display spinner until subcategories return.
    this.headerListSpinner = true;
    //empty subCategories array if there were subcategories.
    this.subCategories = [];
    this.categoriesService
      .getSubcateAndProductOfCate(cateID)
      .subscribe((data: any) => {
        this.subCategories = data;
        this.CatgID = cateID;
        this.headerListSpinner = false;
      });
    //here we save the last category border bottom
    this.lastLink = index;

    this.menueList.fill(false);
    this.menueList[index] = true;
  }

  showBorderFromList() {
    //if I am inside header list so border bottom of last category which I hovered still wite border bottom
    this.menueList[this.lastLink] = true;
  }

  hideBorderFromList() {
    this.menueList.fill(false);
  }

  hideHeader() {
    this.menueList.fill(false);
  }

  selectSubCate(id, index) {
    //this for spinner
    this.subCateProd = false;

    this.subCateProducts = [];

    if (this.lastsubCateIndex != index) {
      this.lastsubCateIndex = index;
      this.subCateList.fill(false);
      this.subCateList[index] = true;
      this.categoriesService
        .getSubCategoryProducts(id)
        .subscribe((data: any) => {
          this.subCateProd = true;
          this.subCateProducts = data;
        });
    } else {
      //here you want to close sub category products
      this.lastsubCateIndex = null;
      this.subCateProducts = [];
      this.subCateList.fill(false);
    }
  }

  showHideBorderFromMobile(index, cateID) {
    this.subCategories = [];
    this.headerListSpinner = true;
    // show or hide  subcategories
    if (this.lastIndexMobile != index) {
      //last index mobile if opened subcategory close and otherwise
      this.lastIndexMobile = index;
      this.menueList.fill(false);
      this.menueList[index] = true;

      this.categoriesService.getSubCategories(cateID).subscribe((data: any) => {
        this.subCategories = data.subcategory;
        this.subCateList = [...this.subCategories];
        this.subCateList.fill(false);
        this.headerListSpinner = false;
      });
    } else {
      this.lastIndexMobile = null;
      this.subCateList = [];
      this.menueList.fill(false);
    }
  }

  goToCart() {
    this.router.navigate(["./whishlist-cart/cart"]);
  }

  goToWhishlist() {
    this.router.navigate(["./whishlist-cart/whishlist"]);
  }
}
