import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../providers/index';

@Component({
  selector: 'app-transcation',
  templateUrl: './transcation.component.html',
  styleUrls: ['./transcation.component.css']
})
export class TranscationComponent implements OnInit {
  transactions: any;
  userData: any;
  searchCata: any = {};

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('currentUser'));

    if (this.userData._id) {
      this.searchCata.host = this.userData._id;
      this.commonService.create('/route/completedtransaction', this.searchCata).subscribe(res => {
 
        console.log(res.json());
         this.transactions = res.json().transaction;
      });
    }
  }
}
