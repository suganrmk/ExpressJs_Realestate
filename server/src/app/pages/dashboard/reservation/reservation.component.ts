import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../providers/index';
import { Router, CanActivate, ActivatedRouteSnapshot  } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userData: any;
  trips: any;
  searchCata: any = {
    // 'host': '5a3e9fe0049feb2bd08934cd'
  };
  constructor(private commonService: CommonService , private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));

    if (this.userData._id) {
      this.searchCata.host = this.userData._id;
      this.commonService.create('/route/reservation', this.searchCata).subscribe(res => {
        console.log(res.json());
        this.trips = res.json().trips;
      });
    }
  }

  hostapproval(value, id, item) {
    console.log(value, id, item, )


    if (value === 'approve') {
      this.trips[item].hostapproval = 'approved';
      console.log(this.trips[item]);
      this.commonService.update('/route/updatereservation', this.trips[item]).subscribe(res => {
        console.log(res);
      });

    }
    if (value === 'reject') {
      this.trips[item].hostapproval = 'reject';
      this.commonService.update('route/updatereservation', this.trips[item]).subscribe(res => {
        console.log(res);
      });
    }
  }

  // getactiveLising(type){
  //   this.searchCata.status = type;
  //   this.commonService.create('/route/user/listing', this.searchCata).subscribe(res => {
  //            console.log(res.json());
  //            this.listings = res.json().product;
  //          });
  // }

  messagehistory(tripId) {
    this.router.navigate(['/user/inbox/' + tripId]);
  }
}
