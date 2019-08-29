import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { AccessibilityConfig, Image, ImageEvent } from '@ks89/angular-modal-gallery';

declare var $:any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images: Image[]; // init this value with your images
  imageIndex = 1;
  galleryId = 1;
  autoPlay = true;
  showArrows = true;
  showDots = true;
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

  imagesRect: Image[] = [
    new Image(
      0,
      {
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/milan-pegasus-gallery-statue.jpg',
        description: 'Description 1'
      },
      { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-milan-pegasus-gallery-statue.jpg',
      title: 'First image title',
      alt: 'First image alt',
      ariaLabel: 'First image aria-label' }
    ),
    new Image(1, { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-47223.jpeg' }, { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-47223.jpg' }),
    new Image(
      2,
      {
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-52062.jpeg',
        description: 'Description 3',
        title: 'Third image title',
        alt: 'Third image alt',
        ariaLabel: 'Third image aria-label'
      },
      {
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-52062.jpg',
        description: 'Description 3'
      }
    ),
    new Image(
      3,
      {
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-66943.jpeg',
        description: 'Description 4',
        title: 'Fourth image title (modal obj)',
        alt: 'Fourth image alt (modal obj)',
        ariaLabel: 'Fourth image aria-label (modal obj)'
      },
      { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-66943.jpg',
      title: 'Fourth image title (plain obj)',
      alt: 'Fourth image alt (plain obj)',
      ariaLabel: 'Fourth image aria-label (plain obj)' }
    ),
    new Image(4, { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-93750.jpeg' }, { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-93750.jpg' }),
    new Image(
      5,
      {
        img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-94420.jpeg',
        description: 'Description 6'
      },
      { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-94420.jpg' }
    ),
    new Image(6, { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/pexels-photo-96947.jpeg' }, { img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/master/examples/systemjs/assets/images/gallery/thumbs/t-pexels-photo-96947.jpg' })
  ];

  accessibilityConfig: AccessibilityConfig = {
    backgroundAriaLabel: 'CUSTOM Modal gallery full screen background',
    backgroundTitle: 'CUSTOM background title',

    plainGalleryContentAriaLabel: 'CUSTOM Plain gallery content',
    plainGalleryContentTitle: 'CUSTOM plain gallery content title',

    modalGalleryContentAriaLabel: 'CUSTOM Modal gallery content',
    modalGalleryContentTitle: 'CUSTOM modal gallery content title',

    loadingSpinnerAriaLabel: 'CUSTOM The current image is loading. Please be patient.',
    loadingSpinnerTitle: 'CUSTOM The current image is loading. Please be patient.',

    mainContainerAriaLabel: 'CUSTOM Current image and navigation',
    mainContainerTitle: 'CUSTOM main container title',
    mainPrevImageAriaLabel: 'CUSTOM Previous image',
    mainPrevImageTitle: 'CUSTOM Previous image',
    mainNextImageAriaLabel: 'CUSTOM Next image',
    mainNextImageTitle: 'CUSTOM Next image',

    dotsContainerAriaLabel: 'CUSTOM Image navigation dots',
    dotsContainerTitle: 'CUSTOM dots container title',
    dotAriaLabel: 'CUSTOM Navigate to image number',

    previewsContainerAriaLabel: 'CUSTOM Image previews',
    previewsContainerTitle: 'CUSTOM previews title',
    previewScrollPrevAriaLabel: 'CUSTOM Scroll previous previews',
    previewScrollPrevTitle: 'CUSTOM Scroll previous previews',
    previewScrollNextAriaLabel: 'CUSTOM Scroll next previews',
    previewScrollNextTitle: 'CUSTOM Scroll next previews',

    carouselContainerAriaLabel: 'Current image and navigation',
    carouselContainerTitle: '',
    carouselPrevImageAriaLabel: 'Previous image',
    carouselPrevImageTitle: 'Previous image',
    carouselNextImageAriaLabel: 'Next image',
    carouselNextImageTitle: 'Next image',
    carouselPreviewsContainerAriaLabel: 'Image previews',
    carouselPreviewsContainerTitle: '',
    carouselPreviewScrollPrevAriaLabel: 'Scroll previous previews',
    carouselPreviewScrollPrevTitle: 'Scroll previous previews',
    carouselPreviewScrollNextAriaLabel: 'Scroll next previews',
    carouselPreviewScrollNextTitle: 'Scroll next previews'
  };

  addRandomImage() {
    const imageToCopy: Image = this.imagesRect[Math.floor(Math.random() * this.imagesRect.length)];
    const newImage: Image = new Image(this.imagesRect.length - 1 + 1, imageToCopy.modal, imageToCopy.plain);
    this.imagesRect = [...this.imagesRect, newImage];
  }

  onChangeAutoPlay() {
    this.autoPlay = !this.autoPlay;
  }

  onChangeShowArrows() {
    this.showArrows = !this.showArrows;
  }

  onChangeShowDots() {
    this.showDots = !this.showDots;
  }

  // output evets
  onShow(event: ImageEvent) {
    console.log('show', event);
  }

  onFirstImage(event: ImageEvent) {
    console.log('firstImage', event);
  }

  onLastImage(event: ImageEvent) {
    console.log('lastImage', event);
  }
}
