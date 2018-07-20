import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { WishlistdashboardComponent } from './wishlistdashboard/wishlistdashboard.component';
import { WishlistdetailComponent } from './wishlistdetail/wishlistdetail.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: WishlistdashboardComponent,
    children: [
      {
        path: '',
        component: WishlistComponent  
      },
      {
        path: ':id',
        component: WishlistdetailComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }





export const routing: ModuleWithProviders = RouterModule.forChild(routes);
