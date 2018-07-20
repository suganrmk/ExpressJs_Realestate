// ./angular-client/src/app/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { appConfig } from '../../app.config';

import { CommonService, ActiveUserService } from '../../providers/index';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  products: any[] = [];
  bannerImg: string;
  searchobj: any = {};
  searchForm: any;
  setparam: any;
  value: any = 1;
  userId: any;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private activeUserService: ActiveUserService) { }

  ngOnInit(): void {
    document.body.classList.add('home');

    this.commonService.getAll('/route/homeSliders').subscribe((res) => {
      console.log(res);
      this.bannerImg = res.homesliders;
    });

    this.commonService.getAll(appConfig.productApi).subscribe(products => {
      console.log(products)
      this.products = products.products;
    });
    this.activeUserService.getActiveUser().subscribe(res => {
      if(res){
         this.userId = res._id;
      }
         
    });

 



  }

  getFormattedAddress(ev) {
    this.setparam = {};

    for (const key in ev) {
      ev[key] !== null ? this.setparam[key] = ev[key] : null;
    }
    console.log(this.setparam)
  }

  getAddress(event) {
    localStorage.setItem('searchPlace', event.formatted_address)
  }
  ngOnDestroy() {
    document.body.classList.remove('home');
  }

  onSearchProduct({ value, valid }) {
    console.log(this.searchobj, value);
    if (this.setparam) {
      this.router.navigate(['/search'], { queryParams: this.setparam });
    }
  }



}


