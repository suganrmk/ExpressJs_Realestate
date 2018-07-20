import { Injectable , OnInit} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject , BehaviorSubject , Observable} from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CartService implements OnInit {
    cartItems = new BehaviorSubject<any>(null);

    constructor(private router: Router, private http: Http) {}

    ngOnInit() {
    }

    getById(_id: string) {
        return this.http.get('/users/' + _id).map((response: Response) => response.json());
    }
}
