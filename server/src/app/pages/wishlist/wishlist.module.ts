import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistdashboardComponent } from './wishlistdashboard/wishlistdashboard.component';
import { WishlistdetailComponent } from './wishlistdetail/wishlistdetail.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { SharedModuled } from '../../shared/shared.module';
import { CommonService } from '../../providers/index';
import { WishlistComponent } from './wishlist/wishlist.component';
// import { ProductarrayComponent } from '../../pages/product/product-array/product-array.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModuled,
    WishlistRoutingModule
  ],
  providers: [

  ],
  declarations: [
    WishlistdashboardComponent,
    WishlistdetailComponent,
    WishlistComponent,
    // ProductarrayComponent
  ]
})
export class WishlistModule { }
