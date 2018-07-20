// ./angular-client/src/app/product/product-list/product-list.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { CommonService, ActiveUserService } from '../../../providers/index';

@Component({
  selector: 'app-productarray',
  templateUrl: './product-array.component.html'
})

export class ProductarrayComponent implements OnInit {

  @Input() product;
  @Input() searchCountry;
  @Output() onproducthover = new EventEmitter();
  @Output() onproducthoverout = new EventEmitter();
  @Output() wishlistProduct = new EventEmitter();
  searchCata: any = {};
  productLenght: boolean;
  activeCurrency: any;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private activeUserService: ActiveUserService) { }

  ngOnInit(): void {
    if (this.searchCountry) {
      this.searchCata['Location.country'] = this.searchCountry;
      this.commonService.search('/route/search/', this.searchCata).subscribe((res) => {
        this.product = res.product;
        console.log(this.product)
        this.productLenght = this.product.length;
      });

    }

    this.activeUserService.getActiveCurrency().subscribe(res => {
      this.activeCurrency = res;
    });
  }

  showall() {
    if (this.searchCountry) {
      this.router.navigate(['/search'], { queryParams: { country: this.searchCountry } });
    }
  }


  myproducthover(val) {
    this.onproducthover.emit(val)
  }

  myproducthoverout(val) {
    this.onproducthoverout.emit(val)
  }

  mywishlistProduct(val){
  this.wishlistProduct.emit(val);
  }

}
