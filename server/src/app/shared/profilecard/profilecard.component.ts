import { Component, OnInit } from '@angular/core';
import {  ActiveUserService } from '../../providers/index';

@Component({
  selector: 'app-profilecard',
  templateUrl: './profilecard.component.html',
  styleUrls: ['./profilecard.component.css']
})
export class ProfilecardComponent implements OnInit {
userData: any;
userName: string;
userImg: string;
  constructor(private activeUserService: ActiveUserService) {}

  ngOnInit() {
    this.activeUserService.getActiveUser().subscribe(data => this.userData = data);
  }

}
