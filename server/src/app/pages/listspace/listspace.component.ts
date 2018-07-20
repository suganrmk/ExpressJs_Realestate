import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, ActiveUserService } from '../../providers/index';
import { ConfirmationService } from 'primeng/primeng';
import { appConfig } from '../../app.config';
declare var google: any;

@Component({
  selector: 'app-listspace',
  templateUrl: './listspace.component.html',
  styleUrls: ['./listspace.component.css']
})
export class ListspaceComponent implements OnInit, OnDestroy {
  products: any = {};
  sub: any;
  index: number = 0;
  propertytype: any = [];
  roomtype: any = [];
  accommodates: any = [];
  currencyList: any = [];
  bathroom: any = [];
  ProductImages: any = [];
  commonAmenities: any;
  additionalAmenities: any;
  houseruleslist: any;
  eventType: string;
  SelectedCurrency: string = '$';

  cancelationpolicytype: any;
  productid: any;
  calenderAlways: boolean;
  calenderSometimes: boolean;

  dates: any;
  map: any;
  options: any = null;

  overlays: any[];

  dialogVisible: boolean;

  markerTitle: string;

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean;

  msgs: any[] = [];
  bedrooms: any;
  beds: any;
  bathrooms: any;
  currencylist: any;
  currencylistvalue: any;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private commonService: CommonService,
    private activeUserService: ActiveUserService) {

  }

  ngOnInit() {
    document.body.classList.add('listyourspacepage');

    this.options = null;

    this.activeUserService.getcurrency().subscribe(list => {
      this.currencyList = [{ label: 'Select currency'}];
      this.currencylistvalue = list;
      for (let i = 0; i < Object.keys(list).length; i++) {
        this.currencyList = [...this.currencyList, { label: Object.keys(list)[i], value: Object.keys(list)[i] }];
      }
    });
    this.accommodates = [{ label: 'Select accommodates', value: null }];
    for (let i = 1; i < 12; i++) {
      this.accommodates = [...this.accommodates, { label: i, value: i }];
    };
    this.bedrooms = [{ label: 'Select No of  bedrooms', value: null }];
    for (let i = 1; i < 12; i++) {
      this.bedrooms = [...this.bedrooms, { label: i, value: i }];
    }
    this.beds = [{ label: 'Select No of beds', value: null }];
    for (let i = 1; i < 12; i++) {
      this.beds = [...this.beds, { label: i, value: i }];
    }
    this.bathrooms = [{ label: 'Select No of bathrooms', value: null }];
    for (let i = 1; i < 12; i++) {
      this.bathrooms = [...this.bathrooms, { label: i, value: i }];
    }

    this.commonService.getAll('/route/essentialamenities/filtered').subscribe((res) => {
      this.commonAmenities = [];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.commonAmenities = [...this.commonAmenities, { label: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/safetyamenities/filtered').subscribe((res) => {
      this.additionalAmenities = [];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.additionalAmenities = [...this.additionalAmenities, { label: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/roomtype/filtered').subscribe((res) => {
      this.roomtype = [{ label: 'Select Roomtype', value: null }];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.roomtype = [...this.roomtype, { label: res.roomTypes[i].title, value: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/housetype/filtered').subscribe((res) => {
      this.propertytype = [{ label: 'Select Property type', value: null }];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.propertytype = [...this.propertytype, { label: res.roomTypes[i].title, value: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/houserules/filtered').subscribe((res) => {
      console.log(res)
      this.houseruleslist = [];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.houseruleslist = [...this.houseruleslist, { label: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/bathroomtype/filtered').subscribe((res) => {
      this.bathroom = [{ label: 'Select bathroom type', value: null }];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.bathroom = [...this.bathroom, { label: res.roomTypes[i].title, value: res.roomTypes[i].title }];
      }
    });

    this.commonService.getAll('/route/getcancellationpolicy').subscribe((res) => {
      this.cancelationpolicytype = [{ label: 'Select type', value: null }];
      for (let i = 0; i < res.cancellationpolicy.length; i++) {
        this.cancelationpolicytype = [...this.cancelationpolicytype, { label: res.cancellationpolicy[i].type, value: res.cancellationpolicy[i]._id }];
      }
    });

    this.sub = this.route.params.subscribe(params => {
      this.productid = params['id'];
      if (params['id']) {
        this.commonService.getById('/route/products/' + params['id']).subscribe(res => {
          const products = res.product[0];
          console.log(products);
          const dateArray = [];
          for (let i = 0; i < products.UnavailabeDates.length; i++) {
            dateArray.push(new Date(products.UnavailabeDates[i]));
          }
          this.products._id = products._id;
          this.products.ProductType = products.Listing.ProductType;
          this.products.RoomType = products.Listing.RoomType;
          this.products.Accommodates = products.Listing.Accommodates;
          this.products.Title = products.Description.Title;
          this.products.Summary = products.Description.Summary;
          this.products.Bedrooms = products.Rooms.Bedrooms;
          this.products.Beds = products.Rooms.Beds;
          this.products.Bathrooms = products.Rooms.Bathrooms;
          this.products.country = products.Location.country;
          this.products.street_number = products.Location.street_number;
          this.products.street = products.Location.street;
          this.products.state = products.Location.state;
          this.products.city = products.Location.city;
          // this.products.lat = products.Location.coords[1];
          // this.products.lng = products.Location.coords[0];
          this.products.lat = products.Location.lat;
          this.products.lng = products.Location.lng;

          this.products.postal_code = products.Location.postal_code;
          this.products.Common = products.Amenities.Common;
          this.products.Additional = products.Amenities.Additional;
          this.products.Photos = products.Photos;
          this.products.currency = products.Pricing.currency ;
          this.SelectedCurrency = products.Pricing.currency ;
          this.products.Baseprice = products.Pricing.Baseprice * this.currencylistvalue[this.SelectedCurrency];
          this.products.Weekly = products.Pricing.Longtermprice.Weekly * this.currencylistvalue[this.SelectedCurrency];
          this.products.Montly = products.Pricing.Longtermprice.Montly * this.currencylistvalue[this.SelectedCurrency];
          this.products.cleaning = products.Pricing.Additionalprice.cleaning * this.currencylistvalue[this.SelectedCurrency];   
          this.products.houseruleslist = products.extradetails.houseruleslist;
          this.products.houserules = products.extradetails.houserules;
          this.products.otherdetail = products.extradetails.otherdetail;
          this.products.spacedetail = products.extradetails.spacedetail;
          this.products.cancellationType = products.cancellation.cancellationType;
          this.products.deposit = products.cancellation.deposit;
          this.products.calendertype = products.calendertype;
          this.products.payment = products.payment;
          this.products.coverphoto = products.coverphoto;
          if (products.UnavailabeDates.length > 0) { this.products.blockdates = dateArray; }

          this.initOverlays();
          this.infoWindow = new google.maps.InfoWindow();
          console.log(this.products);
        });

      }
    });


  }






  handleDragEnd(event) {
    console.log(event)
    this.products.lat = event.originalEvent.latLng.lat();
    this.products.lng = event.originalEvent.latLng.lng();


    this.geocodeLatLng();
  }

  geocodeLatLng() {
    var that = this;
    var geocoder = new google.maps.Geocoder;
    const latlng = { lat: parseFloat(this.products.lat), lng: parseFloat(this.products.lng) };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
      if (status === 'OK') {
        console.log(results)
        if (results[0]) {
          const adressArea = results[0].address_components;
          for (let i = 0; i < adressArea.length; i++) {
            if (adressArea[i].types.includes('postal_code')) {
              that.products.postal_code = adressArea[i].long_name;
            }
            if (adressArea[i].types.includes('country')) {
              that.products.country = adressArea[i].long_name;
            }
            if (adressArea[i].types.includes('administrative_area_level_1')) {
              that.products.state = adressArea[i].long_name;
            }
            if (adressArea[i].types.includes('administrative_area_level_2')) {
              that.products.city = adressArea[i].long_name;
            }
            if (adressArea[i].types.includes('street_number')) {
              that.products.street_number = adressArea[i].long_name;
            }
            if (adressArea[i].types.includes('route')) {
              that.products.street = adressArea[i].long_name;
            }
          }
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [new google.maps.Marker({ position: { lat: this.products.lat, lng: this.products.lng }, draggable: true, title: "" })];
    }
  }


  MapOptions() {
    console.log(this.products)
    this.options = {
      center: { lat: this.products.lat, lng: this.products.lng },
      zoom: 12
    };
    console.log(this.overlays)
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
    document.body.classList.remove('listyourspacepage');

  }

  onSubmitProduct({ value, valid }, ev) {
    console.log(valid)
    if (valid && this.products.payment === 'completed') {
      this.saveProduct('completed', 'Listing is completed. Are you sure you want to save and exit', value);
    } else {
      this.saveProduct('Draft', 'Listing is not completed yet. Are you sure you want to save and exit', value);
    }


    console.log(value, ev)
  }

  saveProduct(status, message, value) {
    this.confirmationService.confirm({
      message: message,
      accept: () => {
        value.status = status;
        this.saveLisiting(value);
        this.router.navigate(['/user/listing']);
      }
    });
  }


  Submitforapproval({ value, valid }) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Pay and publish',
      accept: () => {
        this.saveLisiting(value);
        this.router.navigate(['/payment/' + this.productid]);
      }
    });

  }

  saveLisiting(value) {
    const currentUserId = JSON.parse(localStorage.getItem('currentUser'));
    value.host = currentUserId._id;
    value.Photos = this.products.Photos;
    value._id = this.products._id;
    value.Location.coords = [this.products.lng, this.products.lat];
    value.UnavailabeDates = this.products.UnavailabeDates;
    // pricing convertion
   
    console.log((value.Pricing.Additionalprice.cleaning) , this.currencylistvalue[this.SelectedCurrency])
    value.Pricing.Additionalprice.cleaning = (value.Pricing.Additionalprice.cleaning) / this.currencylistvalue[this.SelectedCurrency];
    value.Pricing.Baseprice = (value.Pricing.Baseprice) / this.currencylistvalue[this.SelectedCurrency];
    value.Pricing.Longtermprice.Montly = (value.Pricing.Longtermprice.Montly) / this.currencylistvalue[this.SelectedCurrency];
    value.Pricing.Longtermprice.Weekly = (value.Pricing.Longtermprice.Weekly) / this.currencylistvalue[this.SelectedCurrency];
    
    console.log(value)
    if ((this.products.coverphoto === undefined || this.products.coverphoto === null) && this.products.Photos.length > 0) {
      console.log('in', this.products.Photos[0])
      value.coverphoto = this.products.Photos[0];
    } else {
      value.coverphoto = this.products.coverphoto;
    }
    this.commonService.update('/route/products', value).subscribe(res => {
      console.log('sucess')
    });
  }


  publishproduct({ value, valid }) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to publish',
      accept: () => {
        value.published = true;
        value.status = 'completed';
        this.saveLisiting(value);

      }
    });

  }


  onBasicUpload(ev) {
    const uploadedImg = JSON.parse(ev.xhr.response).file[0];
    this.products.Photos = [...this.products.Photos, uploadedImg];
    console.log(this.products)
  }

  currencyChange(event) {
    this.SelectedCurrency = event.value;
  }

  removeProductImage(index) {
    console.log(this.products.coverphoto)
    if (this.products.Photos[index].cover) {
      this.products.coverphoto = null;
      console.log(this.products.coverphoto);
    }
    this.products.Photos = this.products.Photos.filter((data, i) => i !== index);
    console.log(this.products.Photos)

  }

  SetCoverImage(index) {
    for (let i = 0; i < this.products.Photos.length; i++) {
      this.products.Photos[i].cover = false;
    }
    this.products.Photos[index].cover = true;
    this.products.coverphoto = this.products.Photos[index];
    console.log(this.products.coverphoto)
  }

  selectcalender(type) {
    console.log(type)
    if (type === 'always') {
      this.calenderAlways = true;
      this.calenderSometimes = false;
      this.products.UnavailabeDates = [];
    } else if (type === 'sometime') {
      this.calenderAlways = false;
      this.calenderSometimes = true;
    }
  }

  dateSelect({ value }) {
    this.products.UnavailabeDates = value;
    console.log(this.products.UnavailabeDates)
  }

  tabChange(ev) {
    const element = document.getElementsByClassName('listingMenu');
    const tabpanel = document.getElementsByClassName('tab-pane');
    console.log(ev)
    const ActiveElement = document.getElementsByClassName(ev);
    const ActiveTab = document.getElementById(ev);

    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove('active');
    }
    for (let i = 0; i < tabpanel.length; i++) {
      tabpanel[i].classList.remove('active');
    }
    ActiveElement[0].classList.add('active');
    console.log(ActiveTab)
    // ActiveTab[0].classList.add('active');

  }
}
