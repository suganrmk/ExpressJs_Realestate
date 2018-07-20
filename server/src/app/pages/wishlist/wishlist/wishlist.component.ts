import { Component, OnInit } from '@angular/core';
import { CartService, CommonService, WishlistService, ActiveUserService } from '../../../providers/index';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  userId: any;
  userdetail: any;
  wishlist:  any;
  privacyoption: any;
  wishlistdetail: any = {};

    constructor(
      private wishlistService: WishlistService,
      private commonService: CommonService,
      private activeUserService: ActiveUserService) { }

  ngOnInit() {
    this.privacyoption = [{
      label: 'Everyone',
      value: 1
    },
    {
      label: 'Only me',
      value: 0
    }]

    this.activeUserService.getActiveUser().subscribe(res => {
      this.userId = res._id;
      this.userdetail = res;
      console.log(this.userdetail)
      this.getwishlist();
    });


  }


  getwishlist() {
    this.commonService.post('/route/getuserlist', { wishlistUser: this.userId }).subscribe(res => {
      if (res.wishlist) {
        this.wishlist = res.wishlist;
        console.log(this.wishlist)
      }
    });

  }

  savewishlist({value , error}){
    value.wishlistUser = this.userId;
    this.commonService.create('/route/createwishlist', value).subscribe(res => {
      this.getwishlist();
    });
  }


}
