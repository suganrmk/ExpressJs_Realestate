import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModuled } from '../../../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { PhotosComponent } from './photos/photos.component';
import { TrustComponent } from './trust/trust.component';
import { ReviewsComponent } from './reviews/reviews.component';
// import {InboxComponent} from './../inbox/inbox.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    SharedModuled,
    ProfileRoutingModule,
  ],
  declarations: [
    EditprofileComponent,
    ProfileComponent,
    PhotosComponent,
    TrustComponent,
    ReviewsComponent]
})
export class ProfileModule { }
