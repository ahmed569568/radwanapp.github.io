import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  menue: boolean;
  menueList: Array<boolean> ;
  headerList: boolean;
  lastLink: any;
  lastIndexMobile: any;
  categories: any;
  subCategories: any;
  subCateProducts: any;
  showCate: boolean;
  lastsubCateIndex:any;
  keyword = new FormControl('');
  activeCart: boolean;
  activeWhishlist: boolean;
  headerListSpinner:boolean;
  subCateList: Array<boolean>;
  subCateProd: boolean;
  constructor( private router: Router, private categoriesService: CategoriesService ,
               private route: ActivatedRoute, private cartService: CartService,
               private whishlistService: WhishlistService, private storage: LocalStorageService) { 
     this.categories =[];
     this.menue =false; 
     this.menueList = [];
     this.showCate = false;
     this.subCateProducts= [];
     this.headerListSpinner = false;
     this.subCateList = [];
    
  }

  ngOnInit( ) {
   
    this.categoriesService.getCategories().subscribe( (data:any) => {
  
      console.log("Categories", data);
      this.categories = data;
      this.menueList = [...this.categories]
      this.menueList.fill(false);
      this.showCate = true;
    })

    if (this.storage.get('cart')) {
      this.cartService.get(this.storage.get('cart')).subscribe((response:any)=> {
        if (response.data.length)
          this.activeCart = true;
      })
    } 
      
    if (this.storage.get('whishlist')) {
      this.whishlistService.get(this.storage.get('whishlist')).subscribe((data:any)=> {
        if (data.product.length)
          this.activeWhishlist = true;
      })
    }
    
    this.cartService.active.subscribe( data=> {
      this.activeCart = data;
    })
    this.whishlistService.active.subscribe( data => {
      this.activeWhishlist = data;
    })

  }

  goTo() {
    this.router.navigate(['./search'], { relativeTo: this.route})
    
    
  }
  search() {
    this.router.navigate(['./search/'],  { relativeTo: this.route ,queryParams: { search: this.keyword.value } })
    
  }
  
  searchCategory(id:any) {
    console.log("id", id);
    this.router.navigate(['./search'], { relativeTo: this.route, queryParams: { category: id} })
  }

  goHome() {
    this.router.navigate(['./'])
  }

  showBorder(index,cateID) {
    this.headerListSpinner = true;
    this.subCategories =[]
    this.categoriesService.getSubCategories(cateID).subscribe( (data:any) => {
      this.subCategories = data.subcategory;
      console.log("showBorder categories", this.subCategories)
      this.headerListSpinner = false;
    })
    this.lastLink = index;
    this.menueList.fill(false);
    this.menueList[index]= true;
 
  }
  showBorderFromList() {
    this.menueList[this.lastLink]= true;
    
  }
  hideBorderFromList() {
    this.menueList.fill(false);
  }
  hideHeader() {
    this.menueList.fill(false);
  }

  showMenue() {
    let i = this.lastLink;
    this.menue =true;
    this.menueList[i] = true;
  }

  hideMenue() {
    if (!this.headerList) {
      this.menue = false;
      this.menueList.fill(false);
    }
      
  }

  overHeaderList() {
    this.headerList = true;
    this.menueList[this.lastLink] = true;
  }

  outHeaderList() {
    this.headerList =  false;
  }

  hideMenueHL() {
    this.menue = false;
    this.menueList.fill(false);
  }

  insideHeaderList() {
    this.menue= false;
    this.menueList.fill(false);
  }

  selectSubCate(id,index){
    console.log("product id", id);
    this.subCateProd = false;
    this.subCateProducts = [];
    if ( this.lastsubCateIndex != index) {
      this.lastsubCateIndex =index;
      this.subCateList.fill(false);
      this.subCateList[index] = true;
      this.categoriesService.getSubCategoryProducts(id).subscribe( (data:any) => {
        console.log("data products", data);
        this.subCateProd = true;
        this.subCateProducts = data;
        
      })
    
    } else {
      this.lastsubCateIndex = null;
      this.subCateProducts=[];
      this.subCateList.fill(false);
    }
    
  }

  showHideBorderFromMobile(index,cateID) {
    this.subCategories =[]
    this.headerListSpinner = true;
    if (this.lastIndexMobile != index) {
      this.lastIndexMobile = index;
      this.menueList.fill(false);
      this.menueList[index]= true;

      this.categoriesService.getSubCategories(cateID).subscribe( (data:any) => {
        console.log("data sub categories", data);
        this.subCategories = data.subcategory;
        this.subCateList = [...this.subCategories];
        this.subCateList.fill(false);
        this.headerListSpinner = false;
       
      })
    } else {
      this.lastIndexMobile = null;
      this.subCateList = [];
      this.menueList.fill(false);
    }
    
   
  }

  goToCart() {
    this.router.navigate(['./whishlist-cart/cart']);
  }
  goToWhishlist() {
    
    this.router.navigate(['./whishlist-cart/whishlist'])
  }

}
