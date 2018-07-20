import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap , Router } from '@angular/router';
import { CommonService, AlertService } from '../../providers/index';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: any = {};
  productId: number;
  userId: any;
  productDetails: any;
  bookings: any;
  bookingId: any; 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
     private commonService: CommonService,
      private alertService: AlertService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }



    this.route.params.subscribe(params => {
      this.bookingId = params.id;
      this.commonService.getById('/route/getbooking/' + params.id).subscribe(res => {
        console.log(res);
        if (res.bookings[0]) {
          this.bookings = res.bookings[0];
          this.productId = this.bookings.productId._id;
          if (this.bookings.review) {
            this.alertService.error('Have already submitted the Review for this booking' , true);
            this.router.navigate(['/']);
          }
          this.commonService.getById(appConfig.productApi + this.productId).subscribe(td => {
            this.productDetails = td.product[0];
            console.log(this.productDetails);
          });

        }

      });


    });
  }

  onSubmitProduct({ value, valid }) {
    value.productid = this.productId;
    value.Reviewby = this.userId;
    value.host = this.productDetails.host._id;
    value.productrating = (value.productvalue + value.productcleanliness +
      value.productcheckin + value.productcommunication +
      value.productlocation + value.productaccuracy) / 6;

    this.commonService.post('/route/review', value).subscribe(res => {

      this.commonService.search('/route/getreview/' + this.productId, { productskip: 0 }).subscribe(data => {
        const reviewData = {
          ProductRating: data.productReview.totalproductrating,
          ProductRatingCount: data.reviewCount,
          bookingid: this.bookingId,
          _id: this.productId
        };
        const BookingReview = {
          review: true,
          reviewId: res.product._id,
          bookingId: this.bookings.bookingId
        };
        console.log()
        this.commonService.update('/route/products', reviewData).subscribe(reviewRes => console.log(reviewRes));
        this.commonService.update('/route/updatereservation', BookingReview).subscribe(reservationRes => {
          console.log(reservationRes);
        });
      });
    });
  }

}
