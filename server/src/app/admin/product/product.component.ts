import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/index';
import { Address } from 'angular-google-place';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any = {};
  sub: any;
  index: number = 0;
  propertytype: any;
  roomtype: any;
  accommodates: any;
  bathroom: any;
  ProductImages: any = [];
  eventType: string;


  constructor(
    private commonServices: CommonService,
    private route: ActivatedRoute,
    private router: Router) {
    this.propertytype = [
      { label: 'Property type', value: null },
      { label: 'Cabin', value: 'Cabin' },
      { label: 'Villa', value: 'Villa' },
      { label: 'Slip', value: 'Slip' }
    ];
    this.roomtype = [
      { label: 'Room type', value: null },
      { label: 'Private', value: 'Private' },
      { label: 'Shared', value: 'Shared' }
    ];
    this.bathroom = [
      { label: 'Bathroom', value: null },
      { label: 'Private', value: 'Private' },
      { label: 'Public', value: 'Public' },
      { label: 'Both', value: 'Both' }
    ];
    this.accommodates = [
      { label: 'Accommodates', value: null },
      { label: '1', value: '1' },
      { label: '2', value: '2' }
    ];
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.commonServices.getById('/route/products/' + params['product']).subscribe(res => {
          this.eventType = 'edit';
          const products = res.product[0];
          const dateArray = [];
          for (let i = 0; i <  products.UnavailabeDates.length; i++) {
            dateArray.push(new Date(products.UnavailabeDates[i]));
          }
          this.products = {
            '_id': products._id,
            'ProductType': products.ProductType,
            'RoomType': products.RoomType,
            'Accommodates': products.Accommodates,
            'City': products.City,
            'Title': products.Description.Title,
            'Summary': products.Description.Summary,
            'Bedrooms': products.Rooms.Bedrooms,
            'Beds': products.Rooms.Beds,
            'Bathrooms': products.Rooms.Bathrooms,
            'Country': products.Location.Country,
            'Street1': products.Location.Street1,
            'Street2': products.Location.Street2,
            'State': products.Location.State,
            'Zipcode': products.Location.Zipcode ,
            'Common': products.Amenities.Common ,
            'Additional': products.Amenities.Additional,
            'Photos': products.Photos,
            'Baseprice': products.Pricing.Baseprice,
            'Weekly': products.Pricing.Longtermprice.Weekly,
            'Montly': products.Pricing.Longtermprice.Montly,
            'UnavailabeDates': dateArray
          };
        });
      } else {
        this.products = {};
        this.eventType = 'create';
      }
    });
  }

  openNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
  }
  openPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
  }
  onSubmitProduct({ value, valid } , ev) {
    const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
    value.host = currentUserId._id;
    console.log(value)
    
      if ( ev === 'submit') { 
        value.status = 'Pending';
      } else {
        value.status = 'Draft';
      }
      if ( this.eventType === 'create') {
      this.commonServices.create('/route/products', value).subscribe(res => console.log(res));
      }else if ( this.eventType === 'edit') {
        this.commonServices.update('/route/products', value).subscribe(res => console.log(res));
      }
  }
  getFormattedAddress(event: any) {
    console.log(event);
  }
  getAddress(place: Address) {
    const list = place.address_components;
    for (let i in list) {
      let placetype = list[i].types;
      if (placetype.includes('neighborhood')) {
        this.products.Street1 = list[i].long_name;
      }
      if (placetype.includes('sublocality_level_1')) {
        this.products.Street2 = list[i].long_name;
      }
      if (placetype.includes('administrative_area_level_1')) {
        this.products.State = list[i].long_name;
      }
      if (placetype.includes('locality')) {
        this.products.City = list[i].long_name;
      }
      if (placetype.includes('country')) {
        this.products.Country = list[i].long_name;
      }
      if (placetype.includes('postal_code')) {
        this.products.Zipcode = list[i].long_name;
      }
    }
  }
  onBasicUpload(ev) {
    const uploadedImg = JSON.parse(ev.xhr.response).file[0];
    this.ProductImages.push(uploadedImg);
    this.products.Photos = this.ProductImages;
  }

}
