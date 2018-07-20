// ./angular-client/src/app/product/product-detail/product-detail.component.ts
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { CartService, CommonService } from '../../../providers/index';
import { appConfig } from '../../../app.config';
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var google: any;
import * as moment from 'moment';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  product: any = {};
  cartProduct: any;
  addedProduct: any;
  Inquiry: any = {};
  selectedDateRange: any;
  accommodates: any[];
  booking: any = {};
  options: any;
  overlays: any[];
  infoWindow: any;
  dateRangePickerProps: any;
  lat: any;
  lng: any;
  CalculatedDate: any;
  cleaningFee: number = 0;
  serviceFee: any;
  UserFees: any;
  totalPrice: number;
  gallery: any;
  bannerImage: string;
  contactingHost: boolean = false;
  userData: any;
  galleryOpen:boolean;
  Inquirybooking: any = {};
  InquiryMessage: any;
  searchCata: any = {
    'Location.country': null
  };
  reviewlist: any;
  reviewrating: any;
  similarlisting: any;
  @ViewChild('similarelement') similarel: ElementRef;
  projectId: number;
  datepickerErrorMessage: any;
  moreAmenities: any;
  
  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private location: Location,
    private cartService: CartService,
    private router: Router,
    private rd: Renderer2
  ) { }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter

  }

  ngOnInit() {
    // window.addEventListener('scroll', this.scroll, true); //third parameter
    

    this.commonService.getAll('/route/getservicefees').subscribe(res => {
      this.UserFees = res.servicefees;
    });

    if (localStorage.getItem('currentUser')) {
      const userID = JSON.parse(localStorage.getItem('currentUser'));
      this.userData = userID._id;
    }


    this.dateRangePickerProps = {
      'placeholder': 'Fecha',
      'showClearDate': true,
      'daySize': 30,
      'isDayBlocked': this.isDayBlocked.bind(this),
      // 'minimumNights': 2,
      // 'maximumNights': 4,
      'isOutsideRange': this.isOutsideRange.bind(this),
    };







    this.route.params.subscribe(params => {
      this.commonService.getById(appConfig.productApi + params.id).subscribe(td => {
        this.projectId = params.id;
        this.product = td.product[0];

        this.lat = this.product.Location.lat;
        this.lng = this.product.Location.lng;
        console.log(td, this.lat);
        this.generateGallery(this.product.Photos);
        this.options = {
          center: { lat: this.lat, lng: this.lng },
          zoom: 13
        };
        this.initOverlays();
        this.infoWindow = new google.maps.InfoWindow();

        // similar listing
        if (localStorage.getItem('searchfilter')) {
          this.searchCata['Location.country'] = JSON.parse(localStorage.getItem('searchfilter'));
        } else {
          this.searchCata['Location.country'] = this.product.Location.country;
        }

        // review
        this.getreview(0);
        this.getSimilarproduct(this.projectId);


        if (this.product.Amenities.Common.length + this.product.Amenities.Additional.length > 6) {
          this.moreAmenities = true;
        }
        console.log(this.product.Listing.Accommodates, typeof (this.product.Listing.Accommodates))
        this.accommodates = [{ label: 'Select  accommodates', value: null }];
        for (let i = 1; i <= this.product.Listing.Accommodates; i++) {
          this.accommodates = [...this.accommodates, { label: i, value: i }];
        }
      });



    });
    

  }

  getSimilarproduct(currentProject) {
    scrollTo(0 , 0);
    this.searchCata.productskip = 0;
    this.searchCata.pageLimit = 0;
    

    this.commonService.search('/route/search/', this.searchCata).subscribe((res) => {
      this.similarlisting = [];
      for (let i = 0; i < res.product.length; i++) {
        console.log(currentProject , res.product[i]._id)
        if (currentProject !== res.product[i]._id) {
          this.similarlisting = [...this.similarlisting, res.product[i]]
        }
      }
      
    });
  }

  scroll = (): void => {
    const s = $('#viewpicturre');
    const calendersectionHeight = $('.calendersection').height() + 150;
    const similaitemposition = $(this.similarel.nativeElement).position().top - calendersectionHeight;
    const pos = s.position();
    const windowpos = $(window).scrollTop();
    const totalcal = $(document).height() - 1100;

    if (windowpos > similaitemposition) {
      $('.calendersection').addClass('stickyBottom');
    }
    if (windowpos < similaitemposition) {
      $('.calendersection').removeClass('stickyBottom');
    }
    if (windowpos >= 440) {
      $('.calendersection').addClass('sticky');
      $('.productdetailheader').css('display', 'block')
    } else {
      $('.calendersection').removeClass('sticky');
      $('.productdetailheader').css('display', 'none')
    }
  }


  scrollable = (el): void => {
   const WH = $(window).height();
  //  var elementPos = document.getElementById(el);
  //  var eleOffset = elementPos.offsetTop;
  //  scrollTo(0 , eleOffset + WH);
  let elePos =  $(el).position().top ;
  window.scroll({top: elePos +  $(el).height() , behavior: 'smooth'} );
  console.log(elePos );
  }

  isDayBlocked(a) {
    const curr_date = a._d.getDate();
    const curr_month = a._d.getMonth() + 1;
    const curr_year = a._d.getFullYear();
    const currentDay = curr_date + '-' + curr_month + '-' + curr_year;
    const time5 = moment(currentDay, 'DD-MM-YYYY');

    for (let i = 0; i < this.product.UnavailabeDates.length; i++) {
      var blockDate = new Date(this.product.UnavailabeDates[i]);
      const blk_date = blockDate.getDate();
      const blk_month = blockDate.getMonth() + 1;
      const blk_year = blockDate.getFullYear();
      const blkDay = blk_date + '-' + blk_month + '-' + blk_year;
      const time4 = moment(blkDay, 'DD-MM-YYYY');
      if (moment(time4).isSame(time5)) {
        return true;
      }
    }
    return false;
  }


  isOutsideRange(date) {
    const curr_date = date._d.getDate();
    const curr_month = date._d.getMonth() + 1;
    const curr_year = date._d.getFullYear();
    const currentDay = curr_date + '-' + curr_month + '-' + curr_year;
    // todate
    const todaysdate = new Date();
    const to_date = todaysdate.getDate();
    const to_month = todaysdate.getMonth() + 1;
    const to_year = todaysdate.getFullYear();
    const toDay = to_date + '-' + to_month + '-' + to_year;
    const time1 = moment(toDay, 'DD-MM-YYYY');
    const time2 = moment(currentDay, 'DD-MM-YYYY');

    if (moment(time1).isSameOrAfter(time2)) {
      return true;
    }
    return false;
  }

  // bookingCalc(eve) {
  //   console.log(eve)
  //   const timeDiff = Math.abs(eve.value.selectedDateRange.start.getTime() - eve.value.selectedDateRange.end.getTime());
  //   this.CalculatedDate = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   const calculatedCost = this.CalculatedDate * this.product.Pricing.Baseprice + this.product.Pricing.Additionalprice.cleaning;

  //   if (this.UserFees.hostfeetype === 'Percentage') {
  //     this.serviceFee = Math.round((calculatedCost / 100) * this.UserFees.hostservicefee);
  //   } else {
  //     this.serviceFee = this.UserFees.hostservicefee;
  //   }

  //   this.totalPrice = this.CalculatedDate * this.product.Pricing.Baseprice + this.serviceFee + this.product.Pricing.Additionalprice.cleaning;
  //   this.cartProduct = {
  //     productId: this.product._id,
  //     bookedfrom: eve.value.selectedDateRange.start.getTime(),
  //     bookedto: eve.value.selectedDateRange.end.getTime(),
  //     guest: this.booking.accommodate ? this.booking.accommodate = this.booking.accommodate : 1,
  //     producthost: this.product.host._id
  //   };
  // }

  tripdateselect(ev) {
    if (ev.end && ev.start) {
      this.datepickerErrorMessage = null;
      const timeDiff = Math.abs(ev.start.getTime() - ev.end.getTime());
      this.CalculatedDate = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const calculatedCost = this.CalculatedDate * this.product.Pricing.Baseprice + this.product.Pricing.Additionalprice.cleaning;

      if (this.UserFees.hostfeetype === 'Percentage') {
        this.serviceFee = Math.round((calculatedCost / 100) * this.UserFees.hostservicefee);
      } else {
        this.serviceFee = this.UserFees.hostservicefee;
      }
      this.totalPrice = this.CalculatedDate * this.product.Pricing.Baseprice + this.serviceFee + this.product.Pricing.Additionalprice.cleaning;
      this.cartProduct = {
        productId: this.product._id,
        bookedfrom: ev.start.getTime(),
        bookedto: ev.end.getTime(),
        guest: this.booking.accommodate ? this.booking.accommodate = this.booking.accommodate : 1,
        producthost: this.product.host._id
      };
      this.checkforUnavailDates(ev.start.getTime(), ev.end.getTime());
      // if (this.CalculatedDate > this.product.Listing.Accommodates) {
      //   this.datepickerErrorMessage = 'Can Select Max' + this.product.Listing.Accommodates;
      // }
    }
    console.log(ev)
  }

  checkforUnavailDates(startDate, EndDate) {
    var dates = this.betweendates(new Date(startDate), new Date(EndDate));

    for (let i = 0; i < dates.length; i++) {
      let d1 = new Date(dates[i]).setHours(0, 0, 0, 0);
      // console.log(d1)
      for (let j = 0; j < this.product.UnavailabeDates.length; j++) {
        let d2 = new Date(this.product.UnavailabeDates[j]).setHours(0, 0, 0, 0);
        if (d1 === d2) {
          this.datepickerErrorMessage = "can not select block dates";
          this.booking.selectedDateRange = null;
          break;
        }

        // console.log(d2)
      }

    }


  }



  betweendates(startDate, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;

  }

  checkout(val) {
    console.log(this.datepickerErrorMessage)

    if (!this.datepickerErrorMessage) {
      if (this.userData) {
        sessionStorage.setItem('cartProduct', JSON.stringify(this.cartProduct));
        this.router.navigate(['/cart']);
      } else {
        this.router.navigate(['/login'], { queryParams: { 'returnUrl': 'product/' + this.projectId } });
      }
    }

  }

  datepickchange(ev) {
    console.log('yes', ev);

  }


  generateGallery(images) {
    this.gallery = [];

    images.forEach(element => {
      this.gallery = [...this.gallery, { source: 'http://localhost:4000/' + element.filename }];
    });

  }

  exitcontactingHost() {
    this.contactingHost = false;
  }
  initOverlays() {
    const newlat = parseInt(this.lat, 10);
    console.log(typeof (newlat), newlat)
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [
        new google.maps.Circle({
          center: { lat: this.lat, lng: this.lng },
          fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500
        }),
      ];
    }
  }


  InquiryBooking(val, ev) {
    console.log(this.userData);
    if (this.userData) {
      this.InquiryMessage = {
        message: this.Inquiry.message,
        subject: 'Enquiry',
        hoster: this.product.host._id,
        from: this.userData,
        to: this.product.host._id,
        bookingStatus: 'Enquiry',
        traveller: this.userData,
        bookingId: 'HS' + Math.floor(10000 + Math.random() * 90000) + Math.abs(new Date().getTime()),
        type: 'enquiry'
      };
      this.commonService.create('/route/reply', this.InquiryMessage).subscribe(res => {
        this.Createbooking();
        this.contactingHost = false;
      });
    } else {
      this.router.navigate(['/login'], { queryParams: { 'returnUrl': 'product/' + this.projectId } });

    }
  }

  Createbooking() {
    this.Inquirybooking.bannerImage = this.product.Photos[0].filename;
    const timeDiff = Math.abs(this.Inquiry.hostselectedDateRange.start.getTime() - this.Inquiry.hostselectedDateRange.end.getTime());
    this.CalculatedDate = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.Inquirybooking.bookedfrom = this.Inquiry.hostselectedDateRange.start.getTime();
    this.Inquirybooking.bookedto = this.Inquiry.hostselectedDateRange.end.getTime();
    this.Inquirybooking.status = 'enquiry';
    this.Inquirybooking.type = 'enquiry';
    this.Inquirybooking.bookingId = this.InquiryMessage.bookingId;
    this.Inquirybooking.bookedby = this.userData;
    this.Inquirybooking.traveller = this.userData;
    this.Inquirybooking.hoster = this.product.host._id;
    this.Inquirybooking.productId = this.product._id;
    this.Inquirybooking.numberofguest = 5;
    this.Inquirybooking.producthost = this.product.host._id;

    const calculatedCost = this.CalculatedDate * this.product.Pricing.Baseprice + this.product.Pricing.Additionalprice.cleaning;

    if (this.UserFees.hostfeetype === 'Percentage') {
      this.serviceFee = Math.round((calculatedCost / 100) * this.UserFees.hostservicefee);
    } else {
      this.serviceFee = this.UserFees.hostservicefee;
    }

    this.Inquirybooking.pricing = {
      baseprice: this.product.Pricing.Baseprice,
      calculatedprice: this.CalculatedDate * this.product.Pricing.Baseprice,
      cleaningprice: this.product.Pricing.Additionalprice.cleaning ? this.product.Pricing.Additionalprice.cleaning : 0,
      currency: this.product.Pricing.currency,
      serviceprice: this.serviceFee,
      staydays: Math.ceil(timeDiff / (1000 * 3600 * 24))
    };
    this.Inquirybooking.pricing.totalprice = (this.Inquirybooking.pricing.calculatedprice
      + this.Inquirybooking.pricing.serviceprice +
      this.Inquirybooking.pricing.cleaningprice);


    this.commonService.post('/route/addreservation', this.Inquirybooking).subscribe(res => {
      console.log(res);
    });


  }

  getreview(pagevalue) {
    console.log(this.projectId, pagevalue)

    this.commonService.search('/route/getreview/' + this.projectId, { productskip: pagevalue }).subscribe(res => {
      console.log(res);

      this.reviewlist = res.filteredreview;
      this.reviewrating = res.productReview;

    });

  }


  paginate(event) {
    const pagevalue = event.page * 2;
    this.getreview(pagevalue);
  }

  opengallery(){
    this.galleryOpen = true;
    $('body').addClass('gallery');
  }


  closegallery(){
    this.galleryOpen = false;
    $('body').removeClass('gallery');
  }

 
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
    $('body').removeClass('gallery');
  }


}
