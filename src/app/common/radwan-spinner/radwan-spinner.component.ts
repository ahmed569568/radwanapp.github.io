import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RadwanSpinnerService } from 'src/app/services/radwan-spinner.service';

@Component({
  selector: 'radwan-spinner',
  templateUrl: './radwan-spinner.component.html',
  styleUrls: ['./radwan-spinner.component.scss']
})
export class RadwanSpinnerComponent implements OnInit {
  show:boolean;
  constructor(private spinner: RadwanSpinnerService) { }

  ngOnInit() {
   this.spinner.showSpinner.subscribe( data => {
     this.show = data;
   })
  }

}
