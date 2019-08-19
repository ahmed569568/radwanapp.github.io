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
