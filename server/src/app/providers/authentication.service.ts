import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
// We want to avoid any 'name not found'
// warnings from TypeScript


@Injectable()
export class AuthenticationService {
    isLoginSubject = new BehaviorSubject<any>(this.hasToken());

    constructor(private http: Http) { }
    private hasToken(): boolean {
        // console.log(localStorage.getItem('currentUser') , 'sd')
        return !!localStorage.getItem('currentUser');
    }

    login(email: string, password: string) {
        return this.http.post('/users/authenticate', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                
                if (user && user.token) {
                    const userId = user.res.common;
                    userId._id = user.res._id;
                    userId.token = user.token;
                    userId.photoUrl = user.res.common.photoUrl;
                    localStorage.setItem('currentUser', JSON.stringify(userId));
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    
                    this.isLoginSubject.next(true);
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoginSubject.next(false);
    }

    isLoggedIn() {
        return this.isLoginSubject.asObservable();
      }
    
}
