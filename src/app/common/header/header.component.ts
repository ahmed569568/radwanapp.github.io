import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor( private route: Router ) { 
     this.menue =false; 
     this.menueList = [ false, false, false, false, false];

  }

  ngOnInit( ) {
  }

  goTo() {
    this.route.navigate(['./search']);
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
    console.log("this.lastLink", this.lastLink);
    let i = this.lastLink;
    this.menue =true;
    this.menueList[i] = true;
    console.log("this.lastLink", this.menueList[i]);
  }

  hideMenue() {
    console.log("now hide list");
    if (!this.headerList) {
      this.menue = false;
      this.menueList.fill(false);
    }
      
  }

  overHeaderList() {
    this.headerList = true;
    this.menueList[this.lastLink] = true;
    console.log("this.lastLink", this.menueList[this.lastLink]);
    console.log("mouseOverHeader", this.headerList);
  }

  outHeaderList() {
    this.headerList =  false;
    console.log("mouseOutHeader", this.headerList);
  }


  hideMenueHL() {
    
    console.log("hideMenueHL()");
    this.menue = false;
    this.menueList.fill(false);
  }
  showData() {
    this.menue= false;
    this.menueList.fill(false);
  }

}
