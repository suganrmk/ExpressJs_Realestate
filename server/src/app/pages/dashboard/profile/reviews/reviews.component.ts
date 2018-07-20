import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../providers/index';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  user: any;
  reviewForyou: any;
  reviewByyou: any;
  
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.commonService.search('/route/getuserreview', { host: this.user._id }).subscribe(res => {
      console.log(res)
      this.reviewForyou = res.review;
    });

    this.commonService.search('/route/getReviewsByuser', { Reviewby: this.user._id }).subscribe(res => {
      console.log(res)
      this.reviewByyou = res.review;
    });
  }

}
