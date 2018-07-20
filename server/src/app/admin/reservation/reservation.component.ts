import { Component, OnInit, NgZone } from '@angular/core';
import { CommonService } from '../../providers/index';
import * as moment from 'moment';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  pageTitle: string;
  bookings: any;
  display: any;
  refundType: String;
  refundDetails: any;
  cardDetails: any;
  paymentType: String;
  constructor(private CommonService: CommonService, private _zone: NgZone, ) { }

  ngOnInit() {
    this.pageTitle = 'Reservations';
    this.CommonService.getAll('/route/getallReservations').subscribe(res => {
      console.log(res)
      this.bookings = res.bookings;
    });


  }

  proceedrefund(data) {

    this.refundType = 'Refund to Guest';
    this.paymentType = 'refund';
    this.processpayment(data);
    // this.CommonService.getById('/route/getcard/' + data.traveller._id).subscribe(res => {
    //   if (res.cards) {
    //     if (res.cards[0].bankdetails) {
    //       this.cardDetails = res.cards[0].bankdetails;
    //       this.processpayment(data);
    //     } else if (res.cards[0].paypaldetail) {
    //       this.cardDetails = res.cards[0].paypaldetail;
    //       this.processpayment(data);
    //     }
    //   } else {
    //     alert('payoutmethod not found')
    //   }



    // });


  }


  processpayment(data) {
    const BookedDate = moment(data.bookedfrom);
    const DeclinedDate = moment(data.declinedAt);
    const dateDiff = BookedDate.diff(DeclinedDate, 'days');

    if (data.status === 'hostdeclined') {
      data.refundAmount = data.pricing.totalprice - data.pricing.serviceprice;
    } else if (data.status === 'userdeclined') {
      if (dateDiff > data.productId.cancellation.cancellationType.halfRefund) {
        console.log(dateDiff, data.productId.cancellation.cancellationType.halfRefund);
        data.refundAmount = (data.pricing.totalprice  - data.pricing.serviceprice ) / 2;
      } else if (dateDiff > data.productId.cancellation.cancellationType.fullRefund) {
        data.refundAmount = data.pricing.totalprice - data.pricing.serviceprice;
      }
    }

    this.refundDetails = data;
    this.display = true;
  }

  proceedpayout(data) {

    this.refundType = 'Payout to Host';
    this.paymentType = 'payout';
    const BookedDate = moment(data.bookedfrom);
    const DeclinedDate = moment(data.declinedAt);
    const dateDiff = BookedDate.diff(DeclinedDate, 'days');


    if (data.status === 'hostdeclined') {
      data.refundAmount = data.pricing.totalprice - data.pricing.serviceprice;
    } else if (data.status === 'userdeclined') {
      if (dateDiff > data.productId.cancellation.cancellationType.halfRefund) {
        const userrefund = (data.pricing.totalprice  - data.pricing.serviceprice ) / 2;
        data.refundAmount =  (data.pricing.totalprice  - data.pricing.serviceprice ) - userrefund;
      } else if (dateDiff > data.productId.cancellation.cancellationType.fullRefund) {
        data.refundAmount = data.pricing.totalprice - data.pricing.serviceprice;
      }
    }
    data.refundAmount = data.pricing.totalprice - data.pricing.serviceprice;
    this.refundDetails = data;
    this.display = true;

    // this.CommonService.getById('/route/getcard/' + data.traveller._id).subscribe(res => {
    //   if (res.cards) {
    //     if (res.cards[0].bankdetails) {
    //       this.cardDetails = res.cards[0].bankdetails;
    //       this.display = true;
    //     } else if (res.cards[0].paypaldetail) {
    //       this.cardDetails = res.cards[0].paypaldetail;
    //       this.display = true;
    //     }
    //   } else {
    //     alert('payoutmethod not found')
    //   }



    // });


  }




  payoutHost(amount) {
    (<any>window).Stripe.card.createToken({
      number: this.cardDetails.account,
      exp_month: this.cardDetails.expiryMonth,
      exp_year: this.cardDetails.expiryYear,
      cvc: this.cardDetails.ssn,
      amount: amount
    }, (status: number, response: any) => {
      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          if (this.paymentType = 'refund') {
            this.refundDetails.refundtoGuest = 'completed';
          } else if (this.paymentType = 'payout') {
            this.refundDetails.payouttoHost = 'completed';
          }
          this.CommonService.update('/route/updatereservation', this.refundDetails).subscribe(res => {
            console.log(res);
          });

        } else {
          console.log(response.error.message);
        }
        this.display = false;
      });
    });

  }



  // payoutHost(amount) {
  //   (<any>window).Stripe.card.createToken({
  //     number: 4242424242424242,
  //     exp_month: 11,
  //     exp_year: 2020,
  //     cvc: 343,
  //     amount: amount
  //   }, (status: number, response: any) => {
  //     // Wrapping inside the Angular zone
  //     this._zone.run(() => {
  //       if (status === 200) {
  //         this.refundDetails.payouttoHost = 'completed';
  //         this.CommonService.update('/route/updatereservation', this.refundDetails).subscribe(res => {
  //           console.log(res)
  //         });

  //       } else {
  //         console.log(response.error.message)
  //       }
  //       this.display = false;
  //     });
  //   });

  // }



}
