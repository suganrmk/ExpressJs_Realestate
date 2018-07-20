import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonService } from '../../providers/index';
import { appConfig } from '../../app.config';
import { ActivatedRoute, Router } from '@angular/router';
declare var google: any;
import * as $ from 'jquery';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  checked: boolean = true;
  products: any;
  options: any;
  searchedPlace: string;
  overlays: any[];
  infoWindow: any;
  dialogVisible: boolean;
  SearchGuest: any = {};
  accomd: any = {};
  counterValue = 3;
  minValue = 0;
  maxValue = 12;
  markerTitle: string;

  selectedPosition: any;

  draggable: boolean;

  msgs: any[] = [];
  des: any = 'tedt';

  searchDateRange: any;
  Pricerange: any = {};
  Housetype: any = {};
  searchCata: any = {
    'Location.country': '',
    ProductType: '',
    'Pricing.Baseprice': { $gt: 0, $lt: 10000000 },
    'Listing.RoomType': '',
    'Amenities.Common': '',
    'Listing.Accommodates': { $gt: 0 },
    'Rooms.Bathrooms': '',
    'Rooms.Beds': '',
    'Rooms.Bedrooms': ''
  };

  rangeValues: number[] = [0, 50000];
  sub: any;
  dateRangePickerProps: any;
  commonAmenities: any[];
  additionalAmenities: any[];
  roomtype: any[];
  propertytype: any[];
  houseruleslist: any[];
  totalrecord: number;
  mapDisplay: boolean;
  pagelimit: number;

  constructor(private commonService: CommonService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.options = null;
    this.mapDisplay = false;
    this.pagelimit = 2;

    this.searchedPlace = localStorage.getItem('searchPlace');

    this.sub = this.route.queryParams.subscribe(params => {
      this.searchCata = {};
      this.mapDisplay = false;
      this.overlays = [];
      this.products = null;

      this.searchedPlace = localStorage.getItem('searchPlace');

      this.searchCata['Location.country'] = params.country;
      if (params.city) {
        this.searchCata['Location.city'] = params.city;
      }
      if (params.state) {
        this.searchCata['Location.state'] = params.state;
      }

      this.generatemap(0);
      this.infoWindow = new google.maps.InfoWindow();
      this.displayMap();

    });

    document.body.classList.add('searchPage');
 
    this.dateRangePickerProps = {
      'keepOpenOnDateSelect': true,
    };

    this.commonService.getAll('/route/essentialamenities').subscribe((res) => {
      this.commonAmenities = [];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.commonAmenities = [...this.commonAmenities, { label: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/safetyamenities').subscribe((res) => {
      this.additionalAmenities = [];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.additionalAmenities = [...this.additionalAmenities, { label: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/roomtype').subscribe((res) => {
      this.roomtype = [{ label: 'Select Roomtype', value: null }];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.roomtype = [...this.roomtype, { label: res.roomTypes[i].title, value: res.roomTypes[i].title }];
      }
    });
    this.commonService.getAll('/route/housetype').subscribe((res) => {
      this.propertytype = [{ label: 'Select Property type', value: null }];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.propertytype = [...this.propertytype, { label: res.roomTypes[i].title, value: res.roomTypes[i].title }];
      }
    });

    this.commonService.getAll('/route/houserules').subscribe((res) => {
      this.houseruleslist = [];
      for (let i = 0; i < res.roomTypes.length; i++) {
        this.houseruleslist = [...this.houseruleslist, { label: res.roomTypes[i].title, value: res.roomTypes[i].title }];
      }
    });

    $('.searchFilterList #toggletbn button').on('click', function () {
      $(this).parents().find('#toggletbn').addClass('open');
      $('.searchFilterList li > .dropdown').removeClass('open');
    });

    $('.searchFilterList li > .dropdown').on('click', function () {
      $('#toggletbn').removeClass('open');
    });

    $('body').on('click', function (e) {
      if (!$('.dropdown-menu').is(e.target)
        && $('.searchFilterList li.dropdown').has(e.target).length === 0
        && $('.open').has(e.target).length === 0
      ) {
        $('#toggletbn').removeClass('open');
      }
    });
    $('#dateapplybtn').on('click', function () {
      $('#toggletbn').removeClass('open');
    });


  }

  displayMap() {
    const that = this;
    setTimeout(function () { that.mapDisplay = true; }, 10);
  }


  generatemap(paginate) {
    const searchParm = {
      searchFilter: this.searchCata,
      productskip: paginate,
      pageLimit: this.pagelimit
    };
    this.commonService.search('/route/search/', searchParm).subscribe((res) => {
      console.log(searchParm)
      this.products = res.product;
      localStorage.setItem('searchfilter', JSON.stringify(this.searchCata));
      if (this.products.length > 0) {
        this.totalrecord = res.totalrecord;
        this.overlays = [];
        this.options = {
          center: { lat: res.product[0].Location.lat, lng: res.product[0].Location.lng },
          zoom: 10
        };
        for (let i = 0; i < res.product.length; i++) {
          this.overlays = [...this.overlays, new google.maps.Marker(
            { position: { lat: res.product[i].Location.lat, lng: res.product[i].Location.lng },
              title: [i].toString(),
              icon: 'http://feedus.media/wp/wp-content/uploads/leaflet-maps-marker-icons/countrynaturalbeef.png' },
          )];
        }
      } else {
        this.products = null;
      }


    });
  }

  ngAfterViewInit() { console.log('hai'); }

  onMapDragEnd(map) {
    const NElat = map.getBounds().getNorthEast().lat();
    const NElng = map.getBounds().getNorthEast().lng();
    const SWlat = map.getBounds().getSouthWest().lat();
    const SWlng = map.getBounds().getSouthWest().lng();
    this.searchCata['Location.coords'] = {
      $geoWithin: {
        $box: [
          [SWlng, SWlat],
          [NElng, NElat]
        ]
      }
    };
    this.searchCata['Location.country'] = '';
    this.searchCata['Location.state'] = '';
    this.searchCata['Location.city'] = '';

    this.generatemap(0);
  }

  setMap(map) {
    if (map) {
      var that = this;
      var maps = map.getMap();
      const geocoder = new google.maps.Geocoder();
      if (geocoder) {
        geocoder.geocode({ 'address': this.searchedPlace }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            maps.fitBounds(results[0].geometry.viewport);
            //  that.onMapDragEnd( map.getMap());
          }
        });
      }

    }
  }


  handleOverlayClick(event) {
    this.msgs = [];
    const isMarker = event.overlay.getTitle !== undefined;
    const title = event.overlay.getTitle();
    const contentString = '<div class="productHolder">' +
      '<div class="imageholds">' +
      '<img src="http://localhost:4000/' + this.products[title].Photos[0].filename + '" />' +
      '</div>' +
      '<div class="productcontent">' +
      '<div class="topContent">' +
      ' <span >' + this.products[title].Listing.RoomType + ' </span> <span>' + this.products[title].Rooms.Beds + '  BEDS</span>' +
      '</div>' +
      ' <span class="productName">' + this.products[title].Description.Title + ' </span>' +
      '<span  class="productPrice"> $' + this.products[title].Pricing.Baseprice + ' per night</span>' +
      '</div>' +
      '</div>';

    if (isMarker) {
      this.infoWindow.setContent(contentString, title);
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
      this.msgs.push({ severity: 'info', summary: 'Marker Selected', detail: title });
    } else {
      this.msgs.push({ severity: 'info', summary: 'Shape Selected', detail: '' });
    }
  }

  onSubmitProduct({ value, valid }) { }

  getAddress(ev) { }

  getFormattedAddress(ev) {
    this.searchCata.Location.country = ev.country;
    console.log(this.searchCata)
    this.generatemap(0);
  }

  advancedSearch({ value, valid }) {
    for (const key in value) {
      value[key] !== '' ? this.searchCata[key] = value[key] : '';
    }
    this.generatemap(0);
  }

  // arraySearch({ value, valid }) {
  //   for (const key in value) {
  //     console.log(value[key], value, key)
  //     if (typeof (value[key]) !== 'undefined') {
  //       if (value[key].length > 0) {
  //         this.searchCata[key] = value[key];
  //       }
  //       else {
  //         console.log('delete', key)
  //         delete this.searchCata[key];
  //       }
  //     }
  //     else {
  //       console.log('delete', key)
  //       delete this.searchCata[key];
  //     }
  //   }

  arraySearch({ value, valid }) {
    for (const key in value) {
      if (typeof (value[key]) !== 'undefined') {
        console.log(value[key], value, key)
        if (value[key].length > 0) {
          this.searchCata['Listing.RoomType'] = value[key];
        } else {
          console.log('delete', key)
          delete this.searchCata['Listing.RoomType'];
        }
      } else {
        console.log('delete', key)
        delete this.searchCata['Listing.RoomType'];
      }
    }
    this.overlays = [];
    this.generatemap(0);
  }

  acomdateSearch({ value, valid }) {
    this.searchCata = {
      'Pricing.Baseprice': { $gt: 0, $lt: 10000000 },
      'Listing.Accommodates': { $gt: 0 }
    };
    console.log(value, this.searchCata)
    let valArray = 0;
    for (const key in value) {
      if (value[key]) {
        valArray = valArray + value[key]
      }
    }
    valArray !== 0 ? this.searchCata['Listing.Accommodates'].$gt = valArray : this.searchCata['Listing.Accommodates'].$gt = '';
    console.log(this.searchCata, valArray);
    this.overlays = [];
    this.generatemap(0);
  }

  priceFilter({ value, valid }) {
    this.searchCata = {
      'Pricing.Baseprice': { $gt: 0, $lt: 10000000 },
      'Listing.Accommodates': { $gt: 0 }
    };
    this.searchCata['Pricing.Baseprice'].$gt = value.rang[0];
    this.searchCata['Pricing.Baseprice'].$lt = value.rang[1];
    console.log(typeof (value.rang[1]), this.searchCata);
    this.overlays = [];
    this.generatemap(0);
  }

  dateFilter({ value, valid }) {
    this.searchCata.UnavailabeDates = {
      startDate: value.daterang.start,
      endDate: value.daterang.end
    };
    const start = value.daterang.start;
    const end = new Date(value.daterang.end);
    const currentDate = new Date(start);
    const SelectedDates = [];
    while (currentDate <= end) {
      const month = new Date(currentDate).getUTCMonth() + 1;
      const day = new Date(currentDate).getUTCDate();
      const year = new Date(currentDate).getUTCFullYear();
      SelectedDates.push(year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + 'T18:30:00.000Z');
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.searchCata.UnavailabeDates = { $nin: SelectedDates };
    this.overlays = [];
    this.generatemap(0);
  }

  moverFilter({ value, valid }) {
    for (const key in value.Rooms) {
      if (typeof (value.Rooms[key]) !== 'undefined') {
        value.Rooms[key] !== 0 ? this.searchCata['Rooms.' + key] = { $gte: value.Rooms[key] } : delete this.searchCata['Rooms.' + key];
      } else {
        this.searchCata['Rooms.' + key] = '';
      }
    }
    // For Common Aminities
    if (typeof (value.Amenities.Common) !== 'undefined') {
      if (value.Amenities.Common.length > 0) {
        this.searchCata['Amenities.Common'] = {
          $all: value.Amenities.Common
        };
      } else {
        this.searchCata['Amenities.Common'] = '';
      }
    } else {
      this.searchCata['Amenities.Common'] = '';
    }

    // Aditional amenitiess
    if (typeof (value.Amenities.Additional) !== 'undefined') {
      if (value.Amenities.Additional.length > 0) {
        this.searchCata['Amenities.Additional'] = {
          $all: value.Amenities.Additional
        };
      } else {
        this.searchCata['Amenities.Additional'] = '';
      }
    } else {
      this.searchCata['Amenities.Additional'] = '';
    }
    // For Common Aminities
    if (typeof (value.houseruleslists.rules) !== 'undefined') {
      if (value.houseruleslists.rules.length > 0) {
        this.searchCata['extradetails.houseruleslist'] = {
          $all: value.houseruleslists.rules
        };
      } else {
        this.searchCata['extradetails.houseruleslist'] = '';
      }
    } else {
      this.searchCata['extradetails.houseruleslist'] = '';
    }
    this.overlays = [];
    this.generatemap(0);
  }


  productdetail(val) {
    console.log(val)
  }

  ngOnDestroy() {
    document.body.classList.remove('searchPage');
    this.sub.unsubscribe();
  }

  paginate(event) {
    this.generatemap(event.page);
  }

  showmap(event) {
    if (event.checked) {
      $('app-search').removeClass('productView');
    } else {
      $('app-search').addClass('productView');
    }
  }



  producthover(val) {
    const index = this.products.findIndex(x => x._id == val);
    this.overlays[index].setIcon('http://feedus.media/wp/wp-content/uploads/leaflet-maps-marker-icons/beer_pin-2.png');
    this.overlays[index].setAnimation(google.maps.Animation.BOUNCE);
  }
  //
  producthoverout(val) {
    const index = this.products.findIndex(x => x._id == val);
    this.overlays[index].setIcon('http://feedus.media/wp/wp-content/uploads/leaflet-maps-marker-icons/countrynaturalbeef.png');
    this.overlays[index].setAnimation(null);
  }

}
