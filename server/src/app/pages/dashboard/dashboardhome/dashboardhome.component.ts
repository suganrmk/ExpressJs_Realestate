import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../providers/index';

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})
export class DashboardhomeComponent implements OnInit {
  userData: any = {};
  messages: any;
  user: any;
verification; any;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userData.id = this.user._id;
    console.log(this.userData.id)
    this.userData.inboxtype = 'travelling';
    this.getMessage();
    this.gettingdata();
  }

  gettingdata() {
    this.commonService.post('/route/getuser', this.user).subscribe(res => {
       console.log(res.user[0])
       this.verification =  res.user[0].verfication;
    });
  }

  getMessage() {
    console.log(this.userData);
    this.commonService.search('/route/message', this.userData).subscribe(res => {
      console.log(res);
      this.messages = res.message;
    });
  }

}
