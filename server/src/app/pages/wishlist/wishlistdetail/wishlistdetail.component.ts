import { Component, OnInit } from '@angular/core';
import { CartService, CommonService, WishlistService, ActiveUserService } from '../../../providers/index';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-wishlistdetail',
  templateUrl: './wishlistdetail.component.html',
  styleUrls: ['./wishlistdetail.component.css']
})
export class WishlistdetailComponent implements OnInit {
  userId: any;
  wishlistid: any;
  userdetail: any;
  wishlist: any;

  constructor(
    private wishlistService: WishlistService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private activeUserService: ActiveUserService) { }

  ngOnInit() {
    this.activeUserService.getActiveUser().subscribe(res => {
      this.userId = res._id;
      this.userdetail = res;
    });
    this.route.params.subscribe(params => {
      this.wishlistid = params.id;
      this.getwishlist(params.id)
    });

  }


  getwishlist(id) {
    this.commonService.post('/route/getwishlistbyId', { listid: id }).subscribe(res => {
      console.log(res)
      if (res.wishlist) {
        this.wishlist = res.wishlist[0].productlist;
        console.log(this.wishlist)
      }
    });

  }

  savewishlist({ value, error }) {
    value.wishlistUser = this.userId;
    this.commonService.create('/route/createwishlist', value).subscribe(res => {
      this.getwishlist(this.wishlistid);
    });
  }


}
