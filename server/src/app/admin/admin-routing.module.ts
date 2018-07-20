import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SliderComponent } from './slider/slider.component';
import {ProductComponent} from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UsersComponent } from './users/users.component';
import { ListingpropertytypeComponent } from './listingpropertytype/listingpropertytype.component';
import { SitesettingsComponent } from './theme/sitesettings/sitesettings.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ServicefeesComponent } from './servicefees/servicefees.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: LandingComponent
       },
      {
        path: 'housetype',
        component: ListingpropertytypeComponent,
        data : {routeApi : '/route/housetype' ,  title: 'House Type'}
      },
      {
        path: 'roomtype',
        component: ListingpropertytypeComponent,
        data : {routeApi : '/route/roomtype' ,  title: 'Room Type'}
      },
      {
        path: 'bathroomtype',
        component: ListingpropertytypeComponent,
        data : {routeApi : '/route/bathroomtype', title: 'Bathroom Type'}
      },
      {
        path: 'essentialamenities',
        component: ListingpropertytypeComponent,
        data : {routeApi : '/route/essentialamenities', title: 'Common Amenities'}
      },
      {
        path: 'safetyamenities',
        component: ListingpropertytypeComponent,
        data : {routeApi : '/route/safetyamenities', title: 'Safety Amenities'}
      },
      {
        path: 'houserules',
        component: ListingpropertytypeComponent,
        data : {routeApi : '/route/houserules', title: 'House Rules'}
      },
      {
        path: 'slider',
        component: SliderComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
       path: 'editproducts',
       component: ProductListComponent
      },
      {
        path: 'users',
        component: UsersComponent
       },
       {
        path: 'site_settings',
        component: SitesettingsComponent
       },
       {
        path: 'reservation',
        component: ReservationComponent
       },
       {
        path: 'servicefees',
        component: ServicefeesComponent
       }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }





export const routing: ModuleWithProviders = RouterModule.forChild(routes);
