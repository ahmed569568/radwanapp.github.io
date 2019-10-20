import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AgmCoreModule } from '@agm/core';
import 'hammerjs'; 
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { NgxGalleryModule } from 'ngx-gallery';
import { StorageServiceModule } from 'ngx-webstorage-service';

// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
// library.add(faExternalLinkAlt, faPlus, faTimes, faDownload);





import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
import {  HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './common/slider/slider.component';
import { SliderItemDirective } from './directives/slider-item.directive';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WhishlistCartComponent } from './whishlist-cart/whishlist-cart.component';
import { CartComponent } from './whishlist-cart/cart/cart.component';
import { WhishlistComponent } from './whishlist-cart/whishlist/whishlist.component';
import { LocalStorageService } from './services/local-storage.service';
import { CompareComponent } from './compare/compare.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng5SliderModule } from 'ng5-slider';
import {AtomSpinnerModule} from 'angular-epic-spinners'

import {LoopingRhumbusesSpinnerModule} from 'angular-epic-spinners';
import {FingerprintSpinnerModule} from 'angular-epic-spinners';
import { RadwanSpinnerComponent } from './common/radwan-spinner/radwan-spinner.component';

import {SelfBuildingSquareSpinnerModule} from 'angular-epic-spinners';
import {BreedingRhombusSpinnerModule} from 'angular-epic-spinners';
import {HalfCircleSpinnerModule} from 'angular-epic-spinners';
import { CheckoutComponent } from './whishlist-cart/checkout/checkout.component';


library.add(faExternalLinkAlt, faPlus, faTimes, faDownload);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    ProductDetailsComponent,
    ContactUsComponent,
    AboutUsComponent,
    SliderComponent,
    SliderItemDirective,
    NotfoundComponent,
    WhishlistComponent,
    CartComponent,
    WhishlistCartComponent,
    CompareComponent,
    RadwanSpinnerComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgxGalleryModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBUb5Iw_VNw2jOaToFuPbGF5Wz5Pp7mem8'
    }),
    GalleryModule.forRoot(),
    StorageServiceModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    AtomSpinnerModule,
    LoopingRhumbusesSpinnerModule,
    FingerprintSpinnerModule,
    SelfBuildingSquareSpinnerModule,
    BreedingRhombusSpinnerModule,
    HalfCircleSpinnerModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
