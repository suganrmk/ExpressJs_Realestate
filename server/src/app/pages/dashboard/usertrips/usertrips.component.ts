import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../providers/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './usertrips.component.html',
  styleUrls: ['./usertrips.component.css']
})
export class UsertripsComponent implements OnInit {
  userData: any;
  trips: any;
  cartProduct: any;
  searchCata: any = {
   // 'host': '5a3e9fe0049feb2bd08934cd'
  };
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));

    if (this.userData._id) {
      this.searchCata.host = this.userData._id;
      this.commonService.create('/route/currenttrips', this.searchCata).subscribe(res => {
        console.log(res.json());
        this.trips = res.json().trips;
      });
    }
  }


  paynow(trip) {
    // const timeDiff = Math.abs(ev.start.getTime() - ev.end.getTime());
    this.cartProduct = {
      productId: trip.productId._id,
      bookedfrom: new Date(trip.bookedfrom).getTime(),
      bookedto: new Date(trip.bookedto).getTime(),
      guest: trip.numberofguest,
      producthost: trip.producthost._id
    };

    sessionStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
    this.router.navigate(['/cart'], { queryParams: { booking_Id: trip.bookingId } });

  }

  // getactiveLising(type){
  //   this.searchCata.status = type;
  //   this.commonService.create('/route/user/listing', this.searchCata).subscribe(res => {
  //            console.log(res.json());
  //            this.listings = res.json().product;
  //          });
  // }
}
