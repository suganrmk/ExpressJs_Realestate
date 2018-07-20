import { Component, OnInit } from '@angular/core';
import { CommonService , AlertService } from '../../../../providers/index';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  Formdata: any;
  user: any;
  dateofbirth: any;
  mobilealert: string = '';
  emailnotify: string[] = [];
  notifywhen: string[] = [];
  constructor(
    private commonService: CommonService,
    private alertservice: AlertService) { }
  // getuser
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user) {
      this.gettingdata();
    }
  }

  gettingdata() {
    this.commonService.create('/route/getuser', this.user).subscribe(res => {
      this.user = res.json().user[0];
      if (this.user.notification.mobilenotify.mobilealert) {
        this.mobilealert = this.user.notification.mobilenotify.mobilealert;
      }
      if (this.user.notification.mobilenotify.notifywhen) {
        this.notifywhen = this.user.notification.mobilenotify.notifywhen;
      }
      if (this.user.notification.emailnotify) {
        this.emailnotify = this.user.notification.emailnotify;
      }
    });
  }

  onSubmitForm({ value, valid }) {
    this.user.notification.mobilenotify.mobilealert = this.mobilealert;
    this.user.notification.emailnotify = this.emailnotify;
    this.user.notification.mobilenotify.notifywhen = this.notifywhen;
    this.commonService.update('/route/userupdate', this.user).subscribe(res => {
      this.alertservice.success(res.message);
    });
  }

  discardchanges() {
    this.gettingdata();   
  }

}
