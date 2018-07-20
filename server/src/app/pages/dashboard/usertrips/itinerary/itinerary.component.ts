import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {  CommonService } from '../../../../providers/index';
import { appConfig } from '../../../../app.config';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit {
  bookingId: number;
  booking: any;
  
  constructor(    private route: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.bookingId = params.id;
      
      this.commonService.getById('/route/getbooking/' + params.id).subscribe(res => {
        console.log(res.bookings[0]);
        this.booking = res.bookings[0];
        // this.productDetails = td.product[0];
        // console.log(this.productDetails);
      });
    });


  }

}
