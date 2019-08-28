import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';


declare var $:any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [
      {
          small: 'https://assets.mspimages.in/wp-content/uploads/2019/03/Redmi-7-2-696x435.jpg',
          medium: 'https://assets.mspimages.in/wp-content/uploads/2019/03/Redmi-7-2-696x435.jpg',
          big: 'https://assets.mspimages.in/wp-content/uploads/2019/03/Redmi-7-2-696x435.jpg'
      },
      {
          small: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3FhqqKkXN014RAPg2F5KtUb5h9nLX55-O6ZApg7WBK3HS5vtVJg',
          medium: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3FhqqKkXN014RAPg2F5KtUb5h9nLX55-O6ZApg7WBK3HS5vtVJg',
          big: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3FhqqKkXN014RAPg2F5KtUb5h9nLX55-O6ZApg7WBK3HS5vtVJg'
      },
      {
          small: 'https://www.91-img.com/pictures/132944-v6-xiaomi-redmi-7-mobile-phone-large-1.jpg',
          medium: 'https://www.91-img.com/pictures/132944-v6-xiaomi-redmi-7-mobile-phone-large-1.jpg',
          big: 'https://www.91-img.com/pictures/132944-v6-xiaomi-redmi-7-mobile-phone-large-1.jpg'
      }
  ];
  }

  buy(){
    console.log("sfsdfsdfa");
  }
  next() {
    console.log("next");
  }
  previous(){
    console.log("previous");
  }
}
