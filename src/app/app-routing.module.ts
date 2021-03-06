import { NgModule, InjectionToken, Component } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { WhishlistComponent } from './whishlist-cart/whishlist/whishlist.component';
import { CartComponent } from './whishlist-cart/cart/cart.component';
import { WhishlistCartComponent } from './whishlist-cart/whishlist-cart.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './whishlist-cart/checkout/checkout.component';
import { ThanksComponent } from './thanks/thanks.component';


const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent},
      { path: 'search', component: SearchComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent},
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent},
      { path:'whishlist-cart', component: WhishlistCartComponent, children: [
        { path: '', component: WhishlistComponent},
        { path: 'whishlist', component: WhishlistComponent},
        { path:'cart', component: CartComponent},
        { path: 'checkout', component: CheckoutComponent}
      ]},
      {
        path:'compare', component: CompareComponent
      },
      { path: 'thanks', component:ThanksComponent},
      //this for open external links which in slider 
      {
        path: 'externalRedirect',
        canActivate: [externalUrlProvider],
        // We need a component here because we cannot define the route otherwise
        component: NotfoundComponent,
      },
      
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled',onSameUrlNavigation: 'reload' })
],
  exports: [RouterModule],
  providers: [ { provide: externalUrlProvider,  useValue: (route: ActivatedRouteSnapshot) => { const externalUrl = route.paramMap.get('externalUrl'); window.open(externalUrl, '_self'); } } ]
})
export class AppRoutingModule { }
