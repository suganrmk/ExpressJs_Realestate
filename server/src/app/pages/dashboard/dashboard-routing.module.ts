import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InboxComponent} from './inbox/inbox.component';
import {ListingComponent} from './listing/listing.component';
import {ReservationComponent} from './reservation/reservation.component';
import {UsertripsComponent} from './usertrips/usertrips.component';
import {UserprevioustripsComponent} from './userprevioustrips/userprevioustrips.component';
import {DashboardhomeComponent} from './dashboardhome/dashboardhome.component';
import { InboxfullComponent } from './inbox/inboxfull/inboxfull.component';
import { ItineraryComponent } from './usertrips/itinerary/itinerary.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: InboxComponent
      },
      {
        path: 'inbox',
        component: InboxComponent
      },
      {
        path: 'inbox/:id',
        component: InboxfullComponent
      },
      {
        path: 'itinerary/:id',
        component: ItineraryComponent
      },
      {
        path: 'dashboard',
        component: DashboardhomeComponent
      },
      {
        path: 'listing',
        component: ListingComponent
      },
      {
        path: 'reservation',
        component: ReservationComponent
      },
      {
        path: 'usertrips',
        component: UsertripsComponent
      },
      {
        path: 'userprevioustrips',
        component: UserprevioustripsComponent
      },
      {
        path: 'profile',
        loadChildren: 'app/pages/dashboard/profile/profile.module#ProfileModule'
      },
      {
        path: 'account',
        loadChildren: 'app/pages/dashboard/account/account.module#AccountModule'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }





export const routing: ModuleWithProviders = RouterModule.forChild(routes);
