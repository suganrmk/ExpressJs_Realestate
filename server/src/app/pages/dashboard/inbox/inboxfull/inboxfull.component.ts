import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService, CommonService } from '../../../../providers/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inboxfull',
  templateUrl: './inboxfull.component.html',
  styleUrls: ['./inboxfull.component.css']
})
export class InboxfullComponent implements OnInit {
  userData: any = {};
  messages: any;
  bookings: any;
  messageto: any;
  messageform: any = {};
  userphoto: any;
  usertype: any;
  cartProduct: any;
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const userID = JSON.parse(localStorage.getItem('currentUser'));
    this.userData.id = userID._id;
    this.userphoto = userID.photoUrl;


    this.route.params.subscribe(params => {
      this.userData.bookingId = params.id;
      this.getmessagedata();

      this.commonService.getById('/route/getbooking/' + params.id).subscribe(res => {
        console.log(res);
        if (res.bookings[0]) {
          this.bookings = res.bookings[0];
          this.messageto = this.bookings.bookedby._id;
        }

      });
    });
  }


  gettingUserdata(userdata) {
    if (userdata === 'traveller') {

    } else if (userdata === 'hoster') {

    }

  }


  getmessagedata() {
    this.commonService.search('/route/bookingmessage', this.userData).subscribe(res => {
      console.log(res);
      this.messages = res.message;

      if (this.userData.id === this.messages[this.messages.length - 1].traveller) {
        this.usertype = 'traveller';
        this.gettingUserdata(this.usertype);
      } else if (this.userData.id === this.messages[this.messages.length - 1].hoster) {
        this.usertype = 'hoster';
        this.gettingUserdata(this.usertype);
      }
    });
  }

  onSubmitForm({ value, valid }, message) {
    const reply = value;
    reply.to = this.messageto;
    reply.from = this.userData.id;
    reply.bookingId = this.userData.bookingId;
    this.commonService.post('/route/reply', reply).subscribe(res => {
      this.getmessagedata();
      this.messageform.message = '';
    });
  }

  paynow() {
    // const timeDiff = Math.abs(ev.start.getTime() - ev.end.getTime());
    this.cartProduct = {
      productId: this.bookings.productId._id,
      bookedfrom: new Date(this.bookings.bookedfrom).getTime(),
      bookedto: new Date(this.bookings.bookedto).getTime(),
      guest: this.bookings.numberofguest,
      producthost: this.bookings.producthost._id
    };

    sessionStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
    this.router.navigate(['/cart'], { queryParams: { booking_Id: this.bookings.bookingId } });

  }


  userrespond(data) {
    console.log(this.bookings)
    this.bookings.hostapproval = data;
    if (data === 'declined') {
      this.bookings.status = 'hostdeclined';

    }
    this.commonService.update('/route/updatereservation', this.bookings).subscribe(res => {
      console.log(res);
    });


  }

  hostdecline() {
    console.log(this.bookings)
    this.bookings.hostapproval = 'declined';
    this.bookings.status = 'hostdeclined';
    this.commonService.update('/route/updatereservation', this.bookings).subscribe(res => {
      console.log(res);
    });
  }

  userdecline() {
    console.log(this.bookings)
    this.bookings.hostapproval = 'declined';
    this.bookings.status = 'userdeclined';
    this.commonService.update('/route/updatereservation', this.bookings).subscribe(res => {
      console.log(res);
    });
  }



}
