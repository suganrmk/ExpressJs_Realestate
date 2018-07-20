import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {  CommonService } from '../providers/index';
import { appConfig } from '../app.config';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: any;
  user: any;
  review: any;
  constructor(    private route: ActivatedRoute, private commonService: CommonService) { }

  ngOnInit() {
  
    this.route.params.subscribe(params => {
      this.userId = params.id;
      this.commonService.search('/route/getuser'  , {_id: params.id}).subscribe(res => {
        console.log(res); 
        this.user = res.user[0];

        this.commonService.search('/route/getuserreview', {host: this.userId}).subscribe(review => {
          this.review = review.review;
          console.log(this.review ); 
        });
      });
    });
  }

}
