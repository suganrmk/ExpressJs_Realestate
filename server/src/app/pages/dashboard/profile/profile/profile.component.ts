import { Component, OnInit } from '@angular/core';
import { CommonService , ActiveUserService } from '../../../../providers/index';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private commonService: CommonService, private activeUserService: ActiveUserService) { }
// getuser
  ngOnInit() {
    this.activeUserService.getActiveUser().subscribe(data => this.userData = data);
  }

}
