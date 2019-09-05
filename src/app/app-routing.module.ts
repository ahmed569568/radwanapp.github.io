import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AboutUsComponent } from './about-us/about-us.component'
const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent},
      { path: 'search', component: SearchComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent},
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
