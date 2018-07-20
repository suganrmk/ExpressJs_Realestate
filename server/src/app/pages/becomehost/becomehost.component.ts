import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/index';
import { appConfig } from '../../app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-becomehost',
  templateUrl: './becomehost.component.html',
  styleUrls: ['./becomehost.component.css']
})
export class BecomehostComponent implements OnInit {
  products: any = {
    Listing: {
      ProductType: null,
      RoomType: null,
      Accommodates: null,
    },
    Location: {}
  };

  propertytype: any;
  roomtype: any;
  accommodates: any;
  bathroom: any;
  addressSelected: boolean;

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.commonService.getAll('/route/roomtype/filtered').subscribe((res) => {
      this.roomtype = [{ label: 'Select Room type', value: null }];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.roomtype = [...this.roomtype, { label: res.roomTypes[i].title, value: res.roomTypes[i].title }];
      }
    });

    this.accommodates = [{ label: 'Select Accomodate', value: null }];
    for (let i = 1; i < 20; i++) {
      this.accommodates = [...this.accommodates, { label: i, value: i }];
    }
  }

  onSubmitProduct({ value, valid }) {
    const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
    this.products.host = currentUserId._id;
    console.log(valid);
    if (this.addressSelected && valid) {
      this.commonService.post('/route/products', this.products).subscribe(res => {
        const Id = res.product._id;
        this.router.navigate(['/listspace/' + Id]);
      });
    }
  }

  getAddress(ev) {
    console.log(ev);
    this.products.fulladdress = ev.formatted_address;
  }
  getFormattedAddress(ev) {
    this.products.Location = ev;
    this.addressSelected = true;
  }
}
