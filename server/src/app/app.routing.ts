import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/index';
import { RegisterComponent } from './pages/register/index';
import { AuthGuard } from './providers/index';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/landing/home.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductCatComponent } from './pages/product/productlist/productlist.component';
import { CheckoutComponent } from './pages/cart/checkout/checkout.component';
import { CartComponent } from './pages/cart/cart/cart.component';

import { ListspaceComponent } from './pages/listspace/listspace.component';
import { BecomehostComponent } from './pages/becomehost/becomehost.component';
import { SearchComponent } from './pages/search/search.component';
import { PaymentComponent } from './pages/cart/payment/payment.component';
import {ResetpasswordComponent} from './pages/user/resetpassword/resetpassword.component';
import { ReviewComponent } from './pages/review/review.component';
import { ProfileComponent } from './profile/profile.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { ConfirmationComponent } from './pages/user/confirmation/confirmation.component';



export const appRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'resetpass/:id', component: ResetpasswordComponent },
    
    { path: 'home', component: HomePageComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'review/:id', component: ReviewComponent },
    
    { path: 'productlist', component: ProductCatComponent },
    { path: 'listspace/:id', component: ListspaceComponent },
    { path: 'Becomehost', component: BecomehostComponent, canActivate: [AuthGuard]  },
    { path: 'search', component: SearchComponent },
    { path: 'profile/:id', component: ProfileComponent },
    
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'payment/:id', component: PaymentComponent, canActivate: [AuthGuard] },
    {path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    {path: 'receipt/:id', component: ReceiptComponent, canActivate: [AuthGuard] },
    {path: 'user/verfication/:id', component: ConfirmationComponent },

    
    // loading modules
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'user', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
    { path: 'wishlist', loadChildren: 'app/pages/wishlist/wishlist.module#WishlistModule' },
    
    
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);


