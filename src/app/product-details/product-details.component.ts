import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { AccessibilityConfig, Image, ImageEvent } from '@ks89/angular-modal-gallery';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  imagesRect: Image[] = [];
  showGallary: boolean = false;
  constructor( private productsService: ProductsService,  private route: ActivatedRoute) { 
    this.product = {};
  }
  
  ngOnInit() {
    
    let id = this.route.snapshot.paramMap.get('id')
    this.productsService.getProduct(id).subscribe( (data:any) => {
      this.product = data;
      this.setImagesInGallary(data.productimage);
      
    })
  }

  setImagesInGallary(imgArray:any) {
    for ( let i=0;i< imgArray.length; i++) {
      this.imagesRect.push(new Image(i, { img: imgArray[i].image_url},{ img:  imgArray[i].image_url }))
    }
    this.showGallary =true;
  }
  

 

 
  buy() {
    console.log("sfsdfsaffsd");
  }
}


// accessibilityConfig: AccessibilityConfig = {
//   backgroundAriaLabel: 'CUSTOM Modal gallery full screen background',
//   backgroundTitle: 'CUSTOM background title',

//   plainGalleryContentAriaLabel: 'CUSTOM Plain gallery content',
//   plainGalleryContentTitle: 'CUSTOM plain gallery content title',

//   modalGalleryContentAriaLabel: 'CUSTOM Modal gallery content',
//   modalGalleryContentTitle: 'CUSTOM modal gallery content title',

//   loadingSpinnerAriaLabel: 'CUSTOM The current image is loading. Please be patient.',
//   loadingSpinnerTitle: 'CUSTOM The current image is loading. Please be patient.',

//   mainContainerAriaLabel: 'CUSTOM Current image and navigation',
//   mainContainerTitle: 'CUSTOM main container title',
//   mainPrevImageAriaLabel: 'CUSTOM Previous image',
//   mainPrevImageTitle: 'CUSTOM Previous image',
//   mainNextImageAriaLabel: 'CUSTOM Next image',
//   mainNextImageTitle: 'CUSTOM Next image',

//   dotsContainerAriaLabel: 'CUSTOM Image navigation dots',
//   dotsContainerTitle: 'CUSTOM dots container title',
//   dotAriaLabel: 'CUSTOM Navigate to image number',

//   previewsContainerAriaLabel: 'CUSTOM Image previews',
//   previewsContainerTitle: 'CUSTOM previews title',
//   previewScrollPrevAriaLabel: 'CUSTOM Scroll previous previews',
//   previewScrollPrevTitle: 'CUSTOM Scroll previous previews',
//   previewScrollNextAriaLabel: 'CUSTOM Scroll next previews',
//   previewScrollNextTitle: 'CUSTOM Scroll next previews',

//   carouselContainerAriaLabel: 'Current image and navigation',
//   carouselContainerTitle: '',
//   carouselPrevImageAriaLabel: 'Previous image',
//   carouselPrevImageTitle: 'Previous image',
//   carouselNextImageAriaLabel: 'Next image',
//   carouselNextImageTitle: 'Next image',
//   carouselPreviewsContainerAriaLabel: 'Image previews',
//   carouselPreviewsContainerTitle: '',
//   carouselPreviewScrollPrevAriaLabel: 'Scroll previous previews',
//   carouselPreviewScrollPrevTitle: 'Scroll previous previews',
//   carouselPreviewScrollNextAriaLabel: 'Scroll next previews',
//   carouselPreviewScrollNextTitle: 'Scroll next previews'
// };