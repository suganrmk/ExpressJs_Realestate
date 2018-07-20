import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AccountComponent} from './account/account.component';
import {NotificationComponent} from './notification/notification.component';
import {TranscationComponent} from './transcation/transcation.component';
import {SettingComponent} from './setting/setting.component';
import {SecurityComponent} from './security/security.component';
import {PayoutComponent} from './payout/payout.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: NotificationComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'transcation',
        component: TranscationComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      },
      {
        path: 'security',
        component: SecurityComponent
      },
      {
        path: 'payout',
        component: PayoutComponent
      }   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

