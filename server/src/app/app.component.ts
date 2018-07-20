import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ActiveUserService, CommonService , WishlistService } from './providers/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    private activeUserService: ActiveUserService,
    private commonService: CommonService, 
    private wishlistService: WishlistService) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.commonService.getAll('/route/getcurrency').subscribe(res => {
      this.activeUserService.updateCurrency(res.currency[0].rates);
    });




    this.activeUserService.updateActiveCurrency('INR');

  }
}
