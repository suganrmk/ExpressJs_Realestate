// ./angular-client/src/app/home.component.ts
import { Component, OnInit, NgZone } from '@angular/core';
import { AlertService, CartService, CommonService } from '../../../providers/index';
import { appConfig } from '../../../app.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {
    cartProduct: any;
    products: any;
    houserules: any;
    CalculatedDate: any;
    checkoutForm: any;
    totalPrice: any;
    product: any;
    bannerImage: any;
    booking: any = {};
    messages: any = {};
    stripForm: any;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    message: string;
    cartItem: any;
    expireMonth: any;
    expireyear: any;
    NoofGuest: any;
    booking_ID: any;
    UserFees: any;
    serviceFees: any;
    constructor(
        private _zone: NgZone,
        private cartService: CartService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        private commonService: CommonService) { }

    ngOnInit(): void {

        this.commonService.getAll('/route/getservicefees').subscribe(res => {
            this.UserFees = res.servicefees;
          });

        this.booking = JSON.parse(sessionStorage.getItem('cartProduct'));
        this.booking_ID = this.route.snapshot.queryParams['booking_Id'] || null;

        this.commonService.getById(appConfig.productApi + this.booking.productId).subscribe(res => {
            this.product = res.product[0];
            this.houserules = this.product.extradetails.houseruleslist;
            this.booking.bannerImage = this.product.Photos[0].filename;
            const timeDiff = Math.abs(this.booking.bookedfrom - this.booking.bookedto);
            this.CalculatedDate = Math.ceil(timeDiff / (1000 * 3600 * 24));
            this.booking.bookingId = 'HS' + Math.floor(10000 + Math.random() * 90000) + Math.abs(new Date().getTime());
            this.booking.bookedby = JSON.parse(localStorage.getItem('currentUser'))._id;
            this.booking.traveller = JSON.parse(localStorage.getItem('currentUser'))._id;
            this.booking.hoster = this.booking.producthost;

            const calculatedCost = this.CalculatedDate * this.product.Pricing.Baseprice + this.product.Pricing.Additionalprice.cleaning;
            
                if (this.UserFees.hostfeetype === 'Percentage') {
                  this.serviceFees = Math.round( (calculatedCost / 100) * this.UserFees.hostservicefee);
                } else {
                  this.serviceFees = this.UserFees.hostservicefee;
                }


            this.booking.pricing = {
                baseprice: this.product.Pricing.Baseprice,
                calculatedprice: this.CalculatedDate * this.product.Pricing.Baseprice,
                cleaningprice: this.product.Pricing.Additionalprice.cleaning ? this.product.Pricing.Additionalprice.cleaning : 0,
                currency: this.product.Pricing.currency,
                serviceprice: this.serviceFees,
                staydays: Math.ceil(timeDiff / (1000 * 3600 * 24))
            };
            this.booking.pricing.totalprice = this.booking.pricing.calculatedprice + this.serviceFees + this.booking.pricing.cleaningprice;
            console.log(this.booking)
        });


        this.NoofGuest = [{ label: 'No of Guest', value: null }];
        for (let i = 1; i < 30; i++) {
            this.NoofGuest = [...this.NoofGuest, { label: i, value: i }];
        }
        this.expireMonth = [{ label: 'Month', value: null }];
        for (let i = 1; i < 12; i++) {
            this.expireMonth = [...this.expireMonth, { label: i, value: i }];
        }
        this.expireyear = [{ label: 'Year', value: null }];
        for (let i = 2018; i < 2050; i++) {
            this.expireyear = [...this.expireyear, { label: i, value: i }];
        }
    }

    checkout() {
        if (!this.booking_ID) {
            this.commonService.create('/route/addreservation', this.booking).subscribe(res => {
                this.messages.traveller = JSON.parse(localStorage.getItem('currentUser'))._id;
                this.messages.hoster = this.booking.producthost;
                this.sendingMessage(this.booking.bookingId);
            });
        } else if (this.booking_ID) {
            this.booking.bookingId = this.booking_ID;
            this.booking.payment = 'completed' ;
            this.messages.traveller = null;
            this.messages.hoster = null;
            console.log( this.booking);
            console.log( this.messages);
            this.commonService.update('/route/updatereservation', this.booking).subscribe(res => {
                this.sendingMessage(this.booking_ID);
            });
        }
    }

    sendingMessage(booking_Id){
        this.messages.bookingStatus = 'Approved';
        this.messages.to = this.booking.producthost;
        this.messages.from = JSON.parse(localStorage.getItem('currentUser'))._id;
   
        this.messages.subject = 'Booking Request';
        this.messages.message = this.messages.message;
        this.messages.bookingId = booking_Id;

        this.commonService.create('/route/reply', this.messages).subscribe(res => {
            console.log(res);
        });

    }




    getToken() {
        console.log(this.booking.guest, this.messages.message)
        if (this.booking.guest > 0 && this.messages.message !== '') {
            this.message = 'Loading...';

            (<any>window).Stripe.card.createToken({
                number: this.cardNumber,
                exp_month: this.expiryMonth,
                exp_year: this.expiryYear,
                cvc: this.cvc,
                amount: 12
            }, (status: number, response: any) => {

                // Wrapping inside the Angular zone
                this._zone.run(() => {
                    if (status === 200) {
                        this.message = `Success! Card token ${response.card.id}.`;
                        this.booking.transactionId = response.card.id;
                        this.booking.transactionMethod = response.card.type;
                        this.booking.payment = 'completed';
                        this.booking.type = 'booking';
                        this.booking.status = 'completed';
                        this.booking.hostapproval = 'accepted';
                        this.booking.paymentfor = 'booking';
                        // this.commonService.update('/route/updatereservation' , this.cartItem ).subscribe(res => {
                        //   console.log(res)
                        // });
                        this.checkout();
                        console.log(this.booking)
                        this.alertService.success(`Success! Card token ${response.card.id}.`);

                        this.commonService.post('/route/savetransaction', this.booking).subscribe(res => {
                            this.router.navigate(['/user']);
                            this.alertService.error(res.success);
                        });
                    } else {
                        this.message = response.error.message;
                        this.alertService.error(response.error.message);
                    }
                });
            });
        }
    }


}
