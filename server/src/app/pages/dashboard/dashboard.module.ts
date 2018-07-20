import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms';
import { SharedModuled } from '../../shared/shared.module';
import { CommonServices } from './provider/common.service';
import { ProductService } from './provider/product.service';
import { UserService } from './provider/index';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InboxComponent} from './inbox/inbox.component';
import { ListingComponent } from './listing/listing.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UsertripsComponent } from './usertrips/usertrips.component';
import { UserprevioustripsComponent } from './userprevioustrips/userprevioustrips.component';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { InboxfullComponent } from './inbox/inboxfull/inboxfull.component';
import { ItineraryComponent } from './usertrips/itinerary/itinerary.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModuled,
    DashboardRoutingModule
  ],
  providers: [
    CommonServices,
    ProductService,
    UserService
  ],
  declarations: [
    DashboardComponent,
    InboxComponent,
    ListingComponent,
    ReservationComponent,
    UsertripsComponent,
    UserprevioustripsComponent,
    DashboardhomeComponent,
    InboxfullComponent,
    ItineraryComponent
  ]
})
export class DashboardModule { }
