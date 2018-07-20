import { Component, OnInit } from '@angular/core';
import { CartService, CommonService, WishlistService, ActiveUserService } from '../../providers/index';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistProduct: any;
  productdata: any;
  wishlist: any;
  userId: any;
  constructor(
    private wishlistService: WishlistService,
    private commonService: CommonService,
    private activeUserService: ActiveUserService) { }

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe(data => {
      this.wishlistProduct = data;
      if (data) {
        this.commonService.getById('/route/products/' + data).subscribe(productdetail => {
          console.log(productdetail);
          this.productdata = productdetail.product[0];
        });

        this.activeUserService.getActiveUser().subscribe(res => {
          this.userId = res._id;
          console.log(this.userId)
          this.getwishlist();
        });
      }
    });
  }

  getwishlist() {
    this.commonService.post('/route/getuserlist', { wishlistUser: this.userId }).subscribe(res => {
      if (res.wishlist) {
        this.wishlist = res.wishlist;
        this.Addwishlist();
      }
    });

  }

  Addwishlist() {
    for (let i = 0; i < this.wishlist.length; i++) {
      const productlength = this.wishlist[i].productlist.length;
      for (let j = 0; j < productlength; j++) {
        console.log(this.wishlist[i].productlist[j]._id, this.wishlistProduct)
        if (this.wishlist[i].productlist[j]._id === this.wishlistProduct) {
          this.wishlist[i].active = true;
        }
      }
    }
    console.log(this.wishlist)
  }

  updatewishlist(list, type) {
    const updateWishlist = {
      listid: list._id,
      productid: this.wishlistProduct,
      type: type,
    };
    this.commonService.update('/route/updatewishlist', updateWishlist).subscribe(res => {
      this.getwishlist();
    });
  }





  wishlistcreateForm({ value, valid }) {
    value.wishlistUser = this.userId;
    // this.wishlist = [...this.wishlist, value];
    
    this.commonService.create('/route/createwishlist', value).subscribe(res => {
      this.getwishlist();
    });
  }

}
