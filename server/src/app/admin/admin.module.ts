import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
// import { FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { SharedModuled } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SliderComponent } from './slider/slider.component';
import { ProductService } from './provider/product.service';
import { UserService } from './provider/index';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';

import { UsersComponent } from './users/users.component';
import { ListingpropertytypeComponent } from './listingpropertytype/listingpropertytype.component';
import { SitesettingsComponent } from './theme/sitesettings/sitesettings.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ServicefeesComponent } from './servicefees/servicefees.component';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModuled,
  ],
  providers: [
    ProductService,
    UserService
  ],
  declarations: [
    DashboardComponent,
    SliderComponent,
    ProductComponent,
    UsersComponent,
    ProductListComponent,
    ListingpropertytypeComponent,
    SitesettingsComponent,
    ReservationComponent,
    ServicefeesComponent,
    LandingComponent
  ]
})
export class AdminModule { }
