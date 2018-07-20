import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ActiveUserService { 

    CurrentUser = new BehaviorSubject<any>(null);
    currency = new BehaviorSubject<any>(null);
    activecurrency = new BehaviorSubject<any>(null);

    constructor() {}

    updateUser(data) {
        this.CurrentUser.next(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
    }



    getActiveUser(){
        const ActiveUserData = JSON.parse(localStorage.getItem('currentUser'));
        this.CurrentUser.next(ActiveUserData);
        return this.CurrentUser;
    }


    updateCurrency(data) {
        this.currency.next(data);
        localStorage.setItem('currency', JSON.stringify(data));
    }



    getcurrency(){
        const currencylist = JSON.parse(localStorage.getItem('currency'));
        this.currency.next(currencylist);
        return this.currency;
    }


    updateActiveCurrency(data) {
        this.activecurrency.next(data);
        localStorage.setItem('activecurrency', JSON.stringify(data));
    }



    getActiveCurrency(){
        const activecurrency = JSON.parse(localStorage.getItem('activecurrency'));
        this.activecurrency.next(activecurrency);
        return this.activecurrency;
    }
}
