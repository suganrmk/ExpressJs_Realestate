import { Component, OnInit } from '@angular/core';
import { CommonService, AlertService, ActiveUserService } from '../../../../providers/index';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  user: any;
  updateduser: any = {
    common: {}
  };

  constructor(
    private commonService: CommonService,
    private alertService: AlertService,
    private activeUserService: ActiveUserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
  }

  discardchanges() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

  }
  onBasicUpload(ev) {
    const uploadedImg = JSON.parse(ev.xhr.response).file[0];
    this.user.photoUrl = 'http://localhost:4000/' + uploadedImg.filename;
    this.updateduser._id = this.user._id;
    this.updateduser.common['photoUrl'] = 'http://localhost:4000/' + uploadedImg.filename;

  }


  updatepic() { 
    if (this.updateduser.common.photoUrl) {
      this.commonService.update('/route/userpicupdate', this.updateduser).subscribe(res => {
        this.alertService.success(res.message);
        this.activeUserService.updateUser(this.user);
      });
    }

  }
}
