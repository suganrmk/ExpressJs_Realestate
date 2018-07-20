// ./angular-client/src/app/product/product-list/product-list.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService, CommonService, ActiveUserService , WishlistService } from '../../../providers/index';
import { appConfig } from '../../../app.config';
import * as $ from 'jquery';
@Component({
  selector: 'app-productsingle',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})

export class ProductsingleComponent implements OnInit {
  @Input() productName;
  @Input() productPrice;
  @Input() productId;
  @Input() productImg;
  @Input() rating;
  @Input() ratingCount;
  // @Input() productCurrency;
  @Input() activeCurrency;
  

  @Output() producthover = new EventEmitter();
  @Output() producthoverout = new EventEmitter();
  @Output() wishlistProduct = new EventEmitter();

  cartProduct: any;
  addedProduct: any;

  constructor(
    private cartService: CartService,
    private commonService: CommonService,
    private activeUserService: ActiveUserService,
  private wishlistService: WishlistService) { }

  ngOnInit(): void {
    

  }

  addwishlist(val){
    this.wishlistProduct.emit(val);
   this.wishlistService.openWishlist(val);
  }

  productover(event) {
    //  console.log(event)
    this.producthover.emit(event)
  }

  productoverout(event) {
    //  console.log(event)
    this.producthoverout.emit(event)
  }
}
