import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../providers/index';

import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
@Component({
  selector: 'app-trust',
  templateUrl: './trust.component.html',
  styleUrls: ['./trust.component.css']
})
export class TrustComponent implements OnInit {
  userVerfication: any = {};
  user: any;
  FullUserData: any = {};
  constructor(
    private commonService: CommonService,
    private authService: AuthService) { }


  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.commonService.create('/route/getuser', this.user).subscribe(res => {
      this.FullUserData = res.json().user[0];
      this.userVerfication = this.FullUserData.verfication;
    });

  }



  verifygoogle() {
    const Forthis = this;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(function (value) {
      console.log(value, 'googlelogin');
      const verify = {
        verifyMethod: 'google',
        verifyStatus: true,
        userId: Forthis.FullUserData._id
      };
      Forthis.commonService.create('/route/googleverification', verify).map(res => {
        if (res.json().success) {
          Forthis.userVerfication.google = true;
        }
        return res.json();
      }).subscribe(res => {
        console.log(Forthis.userVerfication);
      });

    });

  }

  disconnect(method){
    const verify = {
      verifyMethod: method,
      verifyStatus: false,
      userId: this.FullUserData._id
    };
    this.commonService.create('/route/googleverification', verify).map(res => {
      if (res.json().success) {
        this.userVerfication.google = false;
      }
      return res.json();
    }).subscribe(res => {
      console.log(this.userVerfication);
    });
  }


}
