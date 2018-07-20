import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { customHttpProvider } from './providers/index';
import { AlertComponent } from './directives/index';
import {
  AlertService,
  AuthenticationService, ActiveUserService,
  CartService, CommonService, AuthGuard,
  WishlistService
} from './providers/index';

import { ConfirmationService } from 'primeng/primeng';
import { LoginComponent } from './pages/login/index';
import { RegisterComponent } from './pages/register/index';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/landing/home.component';
import { HeaderComponent } from './template/header/header.component';
import { ProductCatComponent } from './pages/product/productlist/productlist.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
// import { ProductsingleComponent } from './pages/product/product-single/product-single.component';
// import { ProductarrayComponent } from './pages/product/product-array/product-array.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import { CheckoutComponent } from './pages/cart/checkout/checkout.component';
import { SharedModuled } from './shared/shared.module';
import { CounterInputComponent } from './shared/components/counter.component';
import { ListspaceComponent } from './pages/listspace/listspace.component';
import { BecomehostComponent } from './pages/becomehost/becomehost.component';
import { SearchComponent } from './pages/search/search.component';
// import { AngularGooglePlaceModule } from 'angular-google-place';
import { AngularReactDatesModule } from 'angular-react-dates';
import { MomentModule } from 'angular2-moment';
import { PaymentComponent } from './pages/cart/payment/payment.component';
import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

import { FooterComponent } from './template/footer/footer.component';
import { LoginHeaderComponent } from './template/login-header/login-header.component';
import { ResetpasswordComponent } from './pages/user/resetpassword/resetpassword.component';
import { ReviewComponent } from './pages/review/review.component';
import { ProfileComponent } from './profile/profile.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { ConfirmationComponent } from './pages/user/confirmation/confirmation.component';
import { CookieService } from 'ngx-cookie-service';
import { WishlistComponent } from './shared/wishlist/wishlist.component';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('794869107629-sq8eflbo87bpi4qlj5smesqmehqngcle.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('370689913334879')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductDetailComponent,
    AlertComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    // ProductsingleComponent,
    // ProductarrayComponent,
    ProductCatComponent,
    CartComponent,
    SearchComponent,
    CheckoutComponent,
    ListspaceComponent,
    CounterInputComponent,
    BecomehostComponent,
    PaymentComponent,
    FooterComponent,
    LoginHeaderComponent,
    ResetpasswordComponent,
    ReviewComponent,
    ProfileComponent,
    ReceiptComponent,
    ConfirmationComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModuled,
    routing,
    MomentModule,
    // AngularGooglePlaceModule,
    AngularReactDatesModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    CartService,
    AuthenticationService,
    CommonService,
    ConfirmationService,
    ActiveUserService,
    CookieService,
    WishlistService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
