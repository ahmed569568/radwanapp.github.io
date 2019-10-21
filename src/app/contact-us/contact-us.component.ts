import { Component, OnInit } from '@angular/core';
import { RadwanSpinnerService } from '../services/radwan-spinner.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private spinner: RadwanSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(()=> {
      this.spinner.hide();
    })
  }

}
