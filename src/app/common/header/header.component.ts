import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormControl } from '@angular/forms';


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
  lastsubCateProductIndex:any;
  keyword = new FormControl('');
  constructor( private router: Router, private categoriesService: CategoriesService ,
               private route: ActivatedRoute) { 
     this.categories =[];
     this.menue =false; 
     this.menueList = [ false, false, false, false, false];
     this.showCate = false;
     this.subCateProducts= [];
     
  }

  ngOnInit( ) {
    this.categoriesService.getCategories().subscribe( (data:any) => {
  
      console.log("Categories", data);
      this.categories = data;
      this.showCate = true;
    })
  }

  goTo() {
    this.router.navigate(['./search'], { relativeTo: this.route})
    
  }
  search() {
    this.router.navigate(['./search/'],  { relativeTo: this.route ,queryParams: { search: this.keyword.value } })
    
  }

  goHome() {
    this.router.navigate(['./'])
  }
  showBorder(index,cateID) {
    this.subCategories =[]
    this.categoriesService.getSubCategories(cateID).subscribe( (data:any) => {
      console.log("Sub Categories", data);
      this.subCategories = data.subcategory;
      
      this.subCateProducts = [...data.subcategory];
      this.subCateProducts.fill(false);
      console.log("this.subCateProducts", this.subCateProducts)
      console.log("this.subCategories", this.subCategories);
    })
    this.lastLink = index;
    this.menueList.fill(false);
    this.menueList[index]= true;
    console.log("From Hover")
  }
  showBorderFromList() {
    this.menueList[this.lastLink]= true;
  }
  hideBorderFromList() {
    this.menueList.fill(false);
    console.log("momo")
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
  selectSubCate(index){
    if ( this.lastsubCateProductIndex != index) {
      this.lastsubCateProductIndex =index;
      this.subCateProducts.fill(false);
      this.subCateProducts[index] = true;
    } else {
      this.lastsubCateProductIndex =null;
      this.subCateProducts.fill(false);
    }
    
  }
  showHideBorderFromMobile(index,cateID) {
    this.subCategories =[]
    if (this.lastIndexMobile != index) {
      this.lastIndexMobile = index;
      this.menueList.fill(false);
      this.menueList[index]= true;
      this.categoriesService.getSubCategories(cateID).subscribe( (data:any) => {
        this.subCategories = data.subcategory;
        this.subCateProducts = [...data.subcategory];
        this.subCateProducts.fill(false);
      })
    } else {
      this.lastIndexMobile = null;
      this.menueList.fill(false);
    }
    
   
  }
}
