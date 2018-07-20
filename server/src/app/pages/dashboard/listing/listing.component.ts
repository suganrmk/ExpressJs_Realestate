import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../providers/index';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  userData: any;
  listings: any;
  searchCata: any = {
    // 'host': '5a3e9fe0049feb2bd08934cd'
  };
  listingOptions: any;
  bannerImage: string = 'https://dummyimage.com/1200X500/ccc/444.jpg&text=your+image+goes+here';
  constructor(private commonService: CommonService) {
    this.listingOptions = [
      { label: 'Listed', value: true },
      { label: 'Unlisted', value: false }
    ];
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.userData._id);
    if (this.userData._id) {
      this.searchCata.host = this.userData._id;
      this.getingdata(this.searchCata);  
    }
  }

  getactiveLising(type) {
    this.searchCata.status = type;
    this.getingdata(this.searchCata);
  }


  getingdata(searchCata) {
    this.commonService.create('/route/user/listing', searchCata).subscribe(res => {
      this.listings = res.json().product;

    });
  }


  publish(ev, id) {
    console.log(ev)
    const listingdata = {
      published: ev.value,
      _id: id
    };
    console.log(listingdata)
    this.commonService.update('/route/products', listingdata).subscribe(res => console.log(res));
  }
}
