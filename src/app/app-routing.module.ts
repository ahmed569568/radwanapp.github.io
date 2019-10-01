import { NgModule, InjectionToken } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent},
      { path: 'search', component: SearchComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent},
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'about-us', component: AboutUsComponent},
      { path:'whishlist', component: WhishlistComponent},
      {
        path: 'externalRedirect',
        canActivate: [externalUrlProvider],
        // We need a component here because we cannot define the route otherwise
        component: NotfoundComponent,
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [ { provide: externalUrlProvider,  useValue: (route: ActivatedRouteSnapshot) => { const externalUrl = route.paramMap.get('externalUrl'); window.open(externalUrl, '_self'); } } ]
})
export class AppRoutingModule { }
