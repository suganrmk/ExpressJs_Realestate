import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../providers/index';
import { CommonService, ActiveUserService } from '../../providers/index';

import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
import { CookieService } from 'ngx-cookie-service';
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    forget: any = {};
    loading = false;
    forgetpass: boolean = false;
    returnUrl: string;

    user: any = {};
    emailPattern: any = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    validateEmail: boolean = true;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private authService: AuthService,
        private activeUserService: ActiveUserService,
        private cookieService: CookieService,
        private commonService: CommonService) { }


    forgetsubmit({ value, error }) {
        console.log(value)
        this.commonService.create('/users/forgetpass', value).map(res => res.json()).subscribe(res => {
            console.log(res)
            this.alertService.error(res.message);
            this.forgetpass = false;
        });
    }


    signInWithGoogle(): void {
        //  this.CommonService.getAll('/users/auth/google').subscribe(res => console.log(res));
        const Forthis = this;
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(function (value) {
            console.log(value, 'googlelogin');
            Forthis.commonService.create('/users/auth/google', value).map(res => res.json()).subscribe(res => {
                console.log(res)
                const userId = res.user.google;
                userId._id = res.user._id;
                userId.token = res.token;
                userId.photoUrl = res.user.common.photoUrl;
                localStorage.setItem('currentUser', JSON.stringify(userId));
                Forthis.activeUserService.updateUser(userId);
                Forthis.authenticationService.isLoginSubject.next(true);
                Forthis.router.navigate([Forthis.returnUrl]);
            });

        });




        //        this.authService.authState.subscribe((user) => {
        //   this.user = user;
        //   this.loggedIn = (user != null);
        // });
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(function (value) {
            console.log(value, 'facebooklogin');
        });
    }

    signOut(): void {
        this.authService.signOut();
    }



    ngOnInit() {
        console.log('in');
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        console.log(this.returnUrl);

        if (this.cookieService.get('SpaceInnValue')) {
            const RememberMe = JSON.parse(this.cookieService.get('SpaceInnValue'));
            this.model.email = RememberMe.email;
            this.model.password = RememberMe.password;
            this.model.remember = true;
        }

    }

    login() {
        this.loading = true;
        if (this.model.remember) {
            this.cookieService.set('SpaceInnValue', JSON.stringify(this.model));
        } else {
            this.cookieService.delete('SpaceInnValue');
        }


        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
            data => {
                console.log(data)
                if (data.success) {
                    this.router.navigate([this.returnUrl]);

                } else if (!data.success) {
                    this.alertService.error(data.message);
                    this.loading = false;
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }


}
