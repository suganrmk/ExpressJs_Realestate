import { Component, OnInit } from '@angular/core';
import { CommonService , AlertService } from '../../../../providers/index';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  password: any = {};
  userData: any;
  constructor(
    private commonService: CommonService, 
    private alertService: AlertService) { }
  

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
  }

  savepassword(){
 console.log(this.password);
  }

  onSubmitForm({ value, valid }) {
    value.id = this.userData._id;

    this.commonService.post('/users/changepass' , value).subscribe(res => {
      this.alertService.success(res.message);
      console.log(res);
    });

    console.log(value);
  }
}
