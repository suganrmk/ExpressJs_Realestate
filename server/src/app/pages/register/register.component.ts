import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, CommonService } from '../../providers/index';
import { AuthenticationService } from '../../providers/index';

import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;
    birthmonth: any[];
    birthyear: any[];
    birthdate: any[];



    constructor(
        private router: Router,
        private commonService: CommonService,
        private authenticationService: AuthenticationService,
        private authService: AuthService,
        private alertService: AlertService) { }

    ngOnInit() {

        this.birthmonth = [{ label: 'Month', value: null }];
        for (let i = 1; i < 12; i++) {
            this.birthmonth = [...this.birthmonth, { label: i, value: i }];
        }

        this.birthdate = [{ label: 'day', value: null }];
        for (let i = 1; i < 31; i++) {
            this.birthdate = [...this.birthdate, { label: i, value: i }];
        }

        this.birthyear = [{ label: 'year', value: null }];
        for (let i = 1980; i < 2010; i++) {
            this.birthyear = [...this.birthyear, { label: i, value: i }];
        }


    }

    register({ value, error }) {
        console.log(this.model, value)
        this.loading = true;
        this.commonService.create('/users/register', value).map(res => res.json())
            .subscribe(
            data => {
                this.loading = false;
                if (data.success) {
                   this.alertService.success(data.message, true);
                    this.router.navigate(['/login']);
                } else {
                    this.alertService.error(data.message, true);
                }
            },
            // error => {
            //     this.alertService.error(error);
            //     this.loading = false;
            // }
        );
    }

    signInWithGoogle(): void {
        //  this.CommonService.getAll('/users/auth/google').subscribe(res => console.log(res));
        const Forthis = this;
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(function (value) {
            console.log(value, 'googlelogin');
            Forthis.commonService.create('/users/auth/google', value).map(res => res.json()).subscribe(res => {
                const userId = res.user.google;
                userId._id = res.user._id;
                userId.photoUrl = res.user.common.photoUrl;
                localStorage.setItem('currentUser', JSON.stringify(userId));
                Forthis.authenticationService.isLoginSubject.next(true);
                Forthis.router.navigate(['/']);
            });

        });
    }



}

