import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WishlistService {
    private Wishlistsubject = new Subject<any>();
   
    constructor(private router: Router) {
    }

    openWishlist(status) {
        this.Wishlistsubject.next(status);
    }


    getWishlist(): Observable<any> {
        return this.Wishlistsubject.asObservable();
    }
}
