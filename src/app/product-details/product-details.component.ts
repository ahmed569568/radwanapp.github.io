import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AccessibilityConfig, Image } from "@ks89/angular-modal-gallery";
import { __core_private_testing_placeholder__ } from "@angular/core/testing";
import { ProductsService } from "../services/products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";
import { CartService } from "../services/cart.service";
import { WhishlistService } from "../services/whishlist.service";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { RadwanSpinnerService } from "../services/radwan-spinner.service";

declare var $: any;   

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  imagesRect: Image[] = [];
  showGallary: boolean = false;
  recProducts: any[];
  popularProducts: any[];
  detailedDescription: any[];
  inCart: boolean;
  inWhishlist: boolean;
  popularLikes: any[];
  recommandedLikes: any[];
  popularCarts: any[];
  recommandedCarts: any[];
  relatedProducts: any[];
  sync = faSync;
  ////
  isOpen = false;

  @ViewChild("recommendedScroll", { static: true, read: ElementRef })
  public recommendedScroll: ElementRef<any>;
  @ViewChild("popularScroll", { static: true, read: ElementRef })
  public popularScroll: ElementRef<any>;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: LocalStorageService,
    private cartService: CartService,
    private whishlistService: WhishlistService,
    private spinner: RadwanSpinnerService
  ) {
    this.product = {};
    this.recProducts = [];
    this.popularProducts = [];
    this.detailedDescription = [];
    this.relatedProducts = [];

    //to excute ngOninit() When Get Product Detail  With Different Product ID  On Same Route(Product Details)
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.spinner.show();
    //get id of product from url
    let id = this.route.snapshot.paramMap.get("id");

    this.productsService.getProduct(id).subscribe((data: any) => {
      console.log(data);
      this.product = data;
      // adding related products to a list to use it in the slider by tayeb
      this.relatedProducts = data.related_products;
      this.checkCart();
      this.checkWhishlist();
      this.detailedDescription = data.detaileddescription;
      this.setImagesInGallary(data.productimage);
      this.spinner.hide();
    });

    this.productsService.getPopularProduct().subscribe((data: any) => {
      this.popularProducts = data;
      this.popularCarts = [...this.popularProducts];
      this.popularCarts.fill(false);
      this.popularLikes = [...this.popularCarts];
      this.checkPopularCart();
      this.checkPopularWhishlist();
    });

    this.productsService.getRecommendedProducts().subscribe((data: any) => {
      this.recProducts = data;
      this.recommandedCarts = [...this.recProducts];
      this.recommandedCarts.fill(false);
      this.recommandedLikes = [...this.recommandedCarts];
      this.checkRecoCart();
      this.checkRecoWhishlist();
    });
  }

  setImagesInGallary(imgArray: any) {
    console.log("imgArray", imgArray);
    for (let i = 0; i < imgArray.length; i++) {
      if (imgArray[i].image_url) {
        this.imagesRect.push(
          new Image(
            i,
            { img: imgArray[i].image_url },
            { img: imgArray[i].image_url }
          )
        );
      }
    }

    this.showGallary = true;
  }

  buy(product: any) {
    //when click on buy now add to cart and navigate to cart component
    if (product.availability == "In Stock") {
      if (this.inCart == true) {
        this.router.navigate(["./whishlist-cart/cart"]);
      } else {
        if (this.storage.get("cart")) {
          this.cartService
            .patch(product.id, "1", this.storage.get("cart"))
            .subscribe((response: any) => {
              this.inCart = true;
              this.router.navigate(["./whishlist-cart/cart"]);
            });
        } else {
          this.cartService.put(product.id, 1).subscribe((response: any) => {
            this.storage.set("cart", response.data.cart);
            this.inCart = true;
            this.router.navigate(["./whishlist-cart/cart"]);
          });
        }
      }
    } else {
      this.cartService.showOutStock();
    }
  }

  navigateProduct(id: any) {
    this.router.navigate(["./product-details/", id]);
  }

  addToCart(id: any) {
    if (this.storage.get("cart")) {
      this.cartService
        .patch(id, "1", this.storage.get("cart"))
        .subscribe((response: any) => {
          this.inCart = true;
        });
    } else {
      this.cartService.put(id, 1).subscribe((response: any) => {
        this.storage.set("cart", response.data.cart);
        this.inCart = true;
      });
    }
  }

  addProductToCart(product: any) {
    if (product.availability != "In Stock") {
      this.cartService.showOutStock();
    } else {
      this.cartService.showAdd();
      if (this.storage.get("cart")) {
        this.cartService
          .patch(product.id, "1", this.storage.get("cart"))
          .subscribe((response: any) => {
            this.inCart = true;
          });
      } else {
        this.cartService.put(product.id, 1).subscribe((response: any) => {
          this.storage.set("cart", response.data.cart);
          this.inCart = true;
        });
      }
    }
  }

  addToWhishlist(id: any) {
    if (this.storage.get("whishlist")) {
      this.whishlistService
        .patch(id, this.storage.get("whishlist"))
        .subscribe((data: any) => {
          this.inWhishlist = true;
        });
    } else {
      this.whishlistService.put(id).subscribe((data: any) => {
        this.storage.set("whishlist", data.id);
        this.inWhishlist = true;
      });
    }
  }

  checkCart() {
    if (this.storage.get("cart")) {
      this.cartService
        .get(this.storage.get("cart"))
        .subscribe((response: any) => {
          response.data.forEach(element => {
            if (element.product.id == this.product.id) this.inCart = true;
          });
        });
    }
  }

  checkWhishlist() {
    if (this.storage.get("whishlist")) {
      this.whishlistService
        .get(this.storage.get("whishlist"))
        .subscribe((data: any) => {
          data.product.forEach(product => {
            if (this.product.id == product.id) this.inWhishlist = true;
          });
          console.log("this.inWhishlist", this.inWhishlist);
        });
    }
  }
  checkPopularCart() {
    if (this.storage.get("cart")) {
      this.cartService
        .get(this.storage.get("cart"))
        .subscribe((response: any) => {
          response.data.forEach(element => {
            this.popularCarts[
              this.popularProducts
                .map(function(product) {
                  return product.product.id;
                })
                .indexOf(element.product.id)
            ] = true;
          });
        });
    }
  }

  checkPopularWhishlist() {
    if (this.storage.get("whishlist")) {
      this.whishlistService
        .get(this.storage.get("whishlist"))
        .subscribe((data: any) => {
          data.product.forEach(product => {
            this.popularLikes[
              this.popularProducts
                .map(function(product) {
                  return product.product.id;
                })
                .indexOf(product.id)
            ] = true;
          });
        });
    }
  }

  checkRecoCart() {
    if (this.storage.get("cart")) {
      this.cartService
        .get(this.storage.get("cart"))
        .subscribe((response: any) => {
          response.data.forEach(element => {
            this.recommandedCarts[
              this.recProducts
                .map(function(product) {
                  return product.product.id;
                })
                .indexOf(element.product.id)
            ] = true;
          });
        });
    }
  }
  checkRecoWhishlist() {
    if (this.storage.get("whishlist")) {
      this.whishlistService
        .get(this.storage.get("whishlist"))
        .subscribe((data: any) => {
          data.product.forEach(product => {
            this.recommandedLikes[
              this.recProducts
                .map(function(product) {
                  return product.product.id;
                })
                .indexOf(product.id)
            ] = true;
          });
        });
    }
  }

  addToCartRec(item: any, index: any) {
    if (this.recommandedCarts[index]) {
      this.recommandedCarts[index] = false;
      this.cartService.showRemove();
      this.recProducts.forEach(item => {
        if (item.product.id == item.product.id)
          this.cartService
            .delete(item.product.id, this.storage.get("cart"))
            .subscribe((data: any) => {});
      });
    } else {
      this.recommandedCarts[index] = true;
      this.cartService.showAdd();
      if (this.storage.get("cart")) {
        this.cartService
          .patch(item.product.id, 1, this.storage.get("cart"))
          .subscribe((response: any) => {});
      } else {
        this.cartService.put(item.product.id, 1).subscribe((response: any) => {
          this.storage.set("cart", response.data.cart);
        });
      }
    }
  }

  addToWhishlistRec(item: any, index: any) {
    if (this.recommandedLikes[index]) {
      this.recommandedLikes[index] = false;
      this.whishlistService
        .delete(item.product.id, this.storage.get("whishlist"))
        .subscribe((data: any) => {});
    } else {
      this.recommandedLikes[index] = true;
      if (this.storage.get("whishlist")) {
        this.whishlistService
          .patch(item.product.id, this.storage.get("whishlist"))
          .subscribe((data: any) => {});
      } else {
        this.whishlistService.put(item.product.id).subscribe((data: any) => {
          this.storage.set("whishlist", data.id);
        });
      }
    }
  }

  addToWhishlistPopul(item: any, index: any) {
    if (this.popularLikes[index]) {
      this.popularLikes[index] = false;
      this.whishlistService
        .delete(item.product.id, this.storage.get("whishlist"))
        .subscribe((data: any) => {});
    } else {
      this.popularLikes[index] = true;
      if (this.storage.get("whishlist")) {
        this.whishlistService
          .patch(item.product.id, this.storage.get("whishlist"))
          .subscribe((data: any) => {});
      } else {
        this.whishlistService.put(item.product.id).subscribe((data: any) => {
          this.storage.set("whishlist", data.id);
        });
      }
    }
  }

  addToCartPopul(item: any, index: any) {
    if (this.popularCarts[index]) {
      this.cartService.showRemove();
      this.popularCarts[index] = false;
      this.recProducts.forEach(item => {
        if (item.product.id == item.product.id)
          this.cartService
            .delete(item.product.id, this.storage.get("cart"))
            .subscribe((data: any) => {});
      });
    } else {
      this.popularCarts[index] = true;
      this.cartService.showAdd();
      if (this.storage.get("cart")) {
        this.cartService
          .patch(item.product.id, 1, this.storage.get("cart"))
          .subscribe((response: any) => {});
      } else {
        this.cartService.put(item.product.id, 1).subscribe((response: any) => {
          this.storage.set("cart", response.data.cart);
        });
      }
    }
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

  scrollRecomRight() {
    if (this.isOpen) {
      return;
    }

    this.recommendedScroll.nativeElement.scrollTo({
      left: this.recommendedScroll.nativeElement.scrollLeft + 1000,
      behavior: "smooth"
    });
    this.isOpen = !this.isOpen;
  }

  scrollRecomLeft() {
    if (!this.isOpen) {
      return;
    }

    this.recommendedScroll.nativeElement.scrollTo({
      left: this.recommendedScroll.nativeElement.scrollLeft - 1000,
      behavior: "smooth"
    });
    this.isOpen = !this.isOpen;
  }

  scrollPopularRight() {
    // this.isOpen = !this.isOpen

    this.popularScroll.nativeElement.scrollTo({
      left: this.popularScroll.nativeElement.scrollLeft + 1000,
      behavior: "smooth"
    });
  }

  scrollPopularLeft() {
    // this.isOpen = !this.isOpen

    this.popularScroll.nativeElement.scrollTo({
      left: this.popularScroll.nativeElement.scrollLeft - 1000,
      behavior: "smooth"
    });
  }
}

// accessibilityConfig: AccessibilityConfig = {
//   backgroundAriaLabel: 'CUSTOM Modal gallery full screen background',
//   backgroundTitle: 'CUSTOM background title',

//   plainGalleryContentAriaLabel: 'CUSTOM Plain gallery content',
//   plainGalleryContentTitle: 'CUSTOM plain gallery content title',

//   modalGalleryContentAriaLabel: 'CUSTOM Modal gallery content',
//   modalGalleryContentTitle: 'CUSTOM modal gallery content title',

//   loadingSpinnerAriaLabel: 'CUSTOM The current image is loading. Please be patient.',
//   loadingSpinnerTitle: 'CUSTOM The current image is loading. Please be patient.',

//   mainContainerAriaLabel: 'CUSTOM Current image and navigation',
//   mainContainerTitle: 'CUSTOM main container title',
//   mainPrevImageAriaLabel: 'CUSTOM Previous image',
//   mainPrevImageTitle: 'CUSTOM Previous image',
//   mainNextImageAriaLabel: 'CUSTOM Next image',
//   mainNextImageTitle: 'CUSTOM Next image',

//   dotsContainerAriaLabel: 'CUSTOM Image navigation dots',
//   dotsContainerTitle: 'CUSTOM dots container title',
//   dotAriaLabel: 'CUSTOM Navigate to image number',

//   previewsContainerAriaLabel: 'CUSTOM Image previews',
//   previewsContainerTitle: 'CUSTOM previews title',
//   previewScrollPrevAriaLabel: 'CUSTOM Scroll previous previews',
//   previewScrollPrevTitle: 'CUSTOM Scroll previous previews',
//   previewScrollNextAriaLabel: 'CUSTOM Scroll next previews',
//   previewScrollNextTitle: 'CUSTOM Scroll next previews',

//   carouselContainerAriaLabel: 'Current image and navigation',
//   carouselContainerTitle: '',
//   carouselPrevImageAriaLabel: 'Previous image',
//   carouselPrevImageTitle: 'Previous image',
//   carouselNextImageAriaLabel: 'Next image',
//   carouselNextImageTitle: 'Next image',
//   carouselPreviewsContainerAriaLabel: 'Image previews',
//   carouselPreviewsContainerTitle: '',
//   carouselPreviewScrollPrevAriaLabel: 'Scroll previous previews',
//   carouselPreviewScrollPrevTitle: 'Scroll previous previews',
//   carouselPreviewScrollNextAriaLabel: 'Scroll next previews',
//   carouselPreviewScrollNextTitle: 'Scroll next previews'
// };
