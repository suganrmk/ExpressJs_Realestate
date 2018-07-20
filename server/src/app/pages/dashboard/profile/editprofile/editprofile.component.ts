import { Component, OnInit } from '@angular/core';
import { CommonService, AlertService, ActiveUserService } from '../../../../providers/index';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  Formdata: any;
  user: any = {};
  userId: any;
  dateofbirth: any;
  FullUserData: any = {};
  verifytoken: any;
  tokenform: boolean;
  birthmonth: any;
  birthdate: any;
  birthyear: any;
  constructor(
    private commonService: CommonService,
    private alertService: AlertService,
    private activeUserService: ActiveUserService) { }
  // getuser
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.gettingdata();
    this.birthmonth = [{ label: 'Month', value: null }];
    for (let i = 1; i < 12; i++) {
      this.birthmonth = [...this.birthmonth, { label: i, value: i }];
    }

    this.birthdate = [{ label: 'day', value: null }];
    for (let i = 1; i < 31; i++) {
      this.birthdate = [...this.birthdate, { label: i, value: i }];
    }

    this.birthyear = [{ label: 'year', value: null }];
    for (let i = 1980; i < 2010; i++) {
      this.birthyear = [...this.birthyear, { label: i, value: i }];
    }

  }

  gettingdata() {
    this.commonService.create('/route/getuser', this.user).subscribe(res => {
      this.FullUserData = res.json().user[0];
      this.user = this.FullUserData.common;
      this.user.year = this.user.birthday.year;
      this.user.day = this.user.birthday.day;
      this.user.month = this.user.birthday.month;
      console.log(this.FullUserData);
      this.userId = this.FullUserData._id;
      this.user._id = this.FullUserData._id;
      // console.log(this.user)
    });
  }

  discardchanges() {
    this.gettingdata();
  }

  onSubmitForm({ value, valid }) {
    console.log(value, this.user);
    this.FullUserData.common = value;
    console.log(this.FullUserData);
    this.commonService.update('/route/userupdate', this.FullUserData).subscribe(res => {
      this.alertService.success(res.message);
      //  console.log(res.json());

      this.activeUserService.updateUser(this.user); 
    });
  }

  verifyNumber(val) {

    if (val !== '') {
      const userverficationInfo = {
        userId: this.userId,
        usernumber: val
      };
      this.commonService.create('/route/generatemobileverfication', userverficationInfo).subscribe(res => {
        console.log(res);
        this.tokenform = true;
      });


    }
  }

  verifyMobileToken(token) {
    if (token !== '') {
      const userverficationInfo = {
        userId: this.userId,
        mobiletoken: token
      };
      this.commonService.create('/route/verifymobileToken', userverficationInfo).subscribe(res => {
        console.log(res);
        this.tokenform = false;

      });

    }

  }

}
