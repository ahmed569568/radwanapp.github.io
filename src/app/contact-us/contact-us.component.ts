import { Component, OnInit } from '@angular/core';
import { RadwanSpinnerService } from '../services/radwan-spinner.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    message : new FormControl('',Validators.required)
  });
  constructor(private spinner: RadwanSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(()=> {
      this.spinner.hide();
    })
  }

  get email() {
    return this.contactForm.get('email');
  }
  contact() {
    console.log("Shokry Suleiman")
  }
}
