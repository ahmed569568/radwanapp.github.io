import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';


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
  categories: any;
  showCate: boolean;
  constructor( private router: Router, private categoriesService: CategoriesService , private route: ActivatedRoute) { 
     this.categories =[];
     this.menue =false; 
     this.menueList = [ false, false, false, false, false];
     this.showCate = false;

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

  showHeader(index) {
    this.lastLink = index;
    this.menueList.fill(false);
    this.menueList[index]= true;
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

}
