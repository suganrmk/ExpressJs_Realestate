import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService, ActiveUserService } from '../../providers/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit {
  products: any[] = [];
  CitySearch: any;
  headertype: string;
  userData: any;
  userImg: string;
  setparam: any;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private activeUserService: ActiveUserService
  ) { }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn().subscribe(res => {
      if (res) {
        this.userData = JSON.parse(localStorage.getItem('currentUser'));
        this.activeUserService.getActiveUser().subscribe(data => this.userImg = data.photoUrl);
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
  getFormattedAddress(ev) {
    this.setparam = {};

    for (const key in ev) {
      ev[key] !== null ? this.setparam[key] = ev[key] : null;
    }

    console.log(this.setparam);
    if (this.setparam) {
      console.log(this.setparam);

      this.router.navigate(['/search'], { queryParams: this.setparam });
    }
  }

  getAddress(event) {
    localStorage.setItem('searchPlace', event.formatted_address)
  }

}
