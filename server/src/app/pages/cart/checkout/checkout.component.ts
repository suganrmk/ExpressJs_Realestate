// ./angular-client/src/app/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService, CommonService } from '../../../providers/index';
@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    cartProduct: any;

    constructor( private cartService: CartService, private commonService: CommonService) { }

    ngOnInit(): void {

        
    }

}
