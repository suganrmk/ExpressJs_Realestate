import { Component, OnInit } from '@angular/core';
import { CommonService , ActiveUserService } from '../../../../providers/index';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userdata:any;

  constructor(private activeUserService: ActiveUserService) { }

  ngOnInit() {

    this.activeUserService.getActiveUser().subscribe(data => this.userdata = data);
    
  }

}
