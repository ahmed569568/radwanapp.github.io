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
// import { library, dom } from '@fortawesome/fontawesome-svg-core';
// import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
// library.add(faExternalLinkAlt, faPlus, faTimes, faDownload);
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';




import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt, faPlus, faTimes, faDownload } from '@fortawesome/free-solid-svg-icons';
import {  HttpClientModule } from '@angular/common/http';
import { SliderComponent } from './common/slider/slider.component';
import { SliderItemDirective } from './directives/slider-item.directive';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    NotfoundComponent
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
    GalleryModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
