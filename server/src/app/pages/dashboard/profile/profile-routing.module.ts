import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {EditprofileComponent} from './editprofile/editprofile.component';
import {TrustComponent} from './trust/trust.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {PhotosComponent} from './photos/photos.component';



const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: EditprofileComponent
      },
      {
        path: 'editprofile',
        component: EditprofileComponent
      },
      {
        path: 'photos',
        component: PhotosComponent
      },
      {
        path: 'trust',
        component: TrustComponent
      },
      {
        path: 'reviews',
        component: ReviewsComponent
      }   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

