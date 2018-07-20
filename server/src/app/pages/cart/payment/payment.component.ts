import { Component, OnInit , NgZone } from '@angular/core';
import { CartService, CommonService } from '../../../providers/index';
import { ActivatedRoute , Router} from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  message: string;
  cartItem: any = {};
  productId: any;
  sub: any;
  userID: any;
  paymentForms: any;
  expireMonth: any;
  expireyear: any;
  constructor(
    private _zone: NgZone ,
    private commonService: CommonService ,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.expireMonth = [{ label: 'Month', value: null }];
    for (let i = 1; i < 13; i++) {
        this.expireMonth = [...this.expireMonth, { label: i, value: i }];
    }

    this.expireyear = [{ label: 'Year', value: null }];
    for (let i = 2018; i < 2050; i++) {
        this.expireyear = [...this.expireyear, { label: i, value: i }];
    }

    this.sub = this.route.params.subscribe(params => {
      this.productId = params['id'];
      console.log(this.productId , params)
    });
    const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
    this.userID = currentUserId._id;
  }
  getToken() {
    this.message = 'Loading...';

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc,
      amount: 1000
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
          this.cartItem.transactionId = response.card.id;
          this.cartItem.transactionMethod = response.card.type;
          this.cartItem.payment = 'completed';
          this.cartItem.status = 'completed';
          this.cartItem.hostapproval = 'approved';
          this.cartItem.hoster = this.userID;
          this.cartItem.productId = this.productId;
          this.cartItem.paymentfor = 'listing';
          // this.commonService.update('/route/updatereservation' , this.cartItem ).subscribe(res => {
          //   console.log(res)
          // });
          this.commonService.create('/route/savetransaction' , this.cartItem ).subscribe(res => {
            
            this.commonService.update('/route/products', {
                                                            _id: this.productId,
                                                            status: 'completed',
                                                            payment: 'completed',
                                                            published: true
                                                          }).subscribe(data => console.log(data));
             this.router.navigate(['/user/listing']);
          });
        } else {
          this.message = response.error.message;
        }
      });
    });
  }
}
