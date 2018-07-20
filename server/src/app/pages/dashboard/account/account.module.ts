import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import { SharedModuled } from '../../../shared/shared.module';

import { NotificationComponent } from './../account/notification/notification.component';
import { PayoutComponent } from './../account/payout/payout.component';
import { TranscationComponent } from './../account/transcation/transcation.component';
import { SecurityComponent } from './../account/security/security.component';
import { SettingComponent } from './../account/setting/setting.component';
import {AccountComponent} from './../account/account/account.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModuled,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent,
    NotificationComponent,
    PayoutComponent,
    TranscationComponent,
    SecurityComponent,
    SettingComponent, ]
})
export class AccountModule { }
