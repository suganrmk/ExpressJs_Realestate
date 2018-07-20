// ./angular-client/src/app/product/product-list/product-list.component.ts
import { Component, OnInit , Output, EventEmitter } from '@angular/core';

import { CommonService } from '../../../providers/index';
import { appConfig } from '../../../app.config';



@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductCatComponent implements OnInit {

  product: any = {};
  products: any[] = [];
  // @Output() onproducthover = new EventEmitter();
  

  productToEdit: any = {};
  productToDelete: any = {};
  fetchingData: boolean = false;
  apiMessage: string;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getAll(appConfig.productApi).subscribe(products => {
      console.log(products)
      this.products = products.products;
    });
  }

  // myproducthover(val){
  //    console.log('hover', val)
  //   this.onproducthover.emit(val.value)
  // }
}
