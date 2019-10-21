import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { RadwanSpinnerService } from '../services/radwan-spinner.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})

export class AboutUsComponent implements OnInit {
 lat: number =30.061103;
 lng: number =  31.219599;
 zoom: number = 15;
  constructor( private spinner: RadwanSpinnerService) { }
 
 ngOnInit(): void {
  this.spinner.show();
  setTimeout(()=> {
    this.spinner.hide();
  })
}
  

}
