import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../providers/index';

@Component({
  selector: 'app-previoustrips',
  templateUrl: './userprevioustrips.component.html',
  styleUrls: ['./userprevioustrips.component.css']
})
export class UserprevioustripsComponent implements OnInit {
  userData: any;
  trips: any;
  searchCata: any = {
   // 'host': '5a3e9fe0049feb2bd08934cd'
  };
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));

    if (this.userData._id) {
      this.searchCata.host = this.userData._id;
      this.commonService.create('/route/previoustrips', this.searchCata).subscribe(res => {
 
        console.log(res.json());
        this.trips = res.json().trips;
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
}
