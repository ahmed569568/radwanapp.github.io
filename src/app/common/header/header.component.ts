import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menue: boolean;
  menueList: Array<boolean> ;
  constructor() { 
     this.menue =false; 
     this.menueList = [ false, false, false, false, false];
  }
  ngOnInit() {
  }
  goTo() {
    console.log("shokryaaat")
  }
  showHeader(index) {
    console.log("HEADer")
    this.menue = true;
    this.menueList.fill(false);
    this.menueList[index]= true;
    console.log(index);

  }
  hideHeader() {
     this.menue = false;
     this.menueList.fill(false);
  }
}
