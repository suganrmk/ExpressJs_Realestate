import { Component, OnInit } from '@angular/core';
import { CommonService, AlertService } from '../../../../providers/index';
import { ConfirmationService } from 'primeng/primeng';
@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent implements OnInit {
  payoutform: boolean;
  payaddress: any = {};
  payout: any = {};
  bankdetail: any = {};
  paypaldetail: any = {};
  payoutMethod: boolean;
  bankaccount: boolean;
  paypalaccount: boolean;
  payoutlists: boolean;
  userData: any;
  cardlist: any;
  countrylist: any;
  currencylist: any[];
  constructor(
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService) { 
      this.currencylist = [
        { label: 'currency'   },
        { label: 'USD' , value: '$' },
        { label: 'Euro' , value: '€' }
        
      ];
      
    }

  ngOnInit() {



    this.payoutlists = true;
    this.userData = JSON.parse(localStorage.getItem('currentUser'));
    this.getCarddetail();
    this.getcountry();
  }

  getcountry() {
    this.commonService.getAll('/route/getcountries').subscribe(res => {
      console.log(res)
      this.countrylist = [{ label: 'No of Guest' }];
      for (let i = 0; i < res.country[0].countrylist.length; i++) {
        this.countrylist = [...this.countrylist, { label: res.country[0].countrylist[i].label, value: res.country[0].countrylist[i].value }];
      }
    });
  }

  getCarddetail() {
    if (this.userData) {
      this.commonService.getById('/route/getcard/' + this.userData._id).subscribe(res => {
        this.cardlist = res.cards;
      });
    }
  }

  payoutaddress(form) {
    console.log(this.payaddress);
    this.payout.billingaddress = this.payaddress;
    this.payout.user = this.userData._id;
    this.payoutform = false;
    this.payoutMethod = true;
 
  }
  addpaymethod(val) {
    this.payoutMethod = false;
    if (val === 'paypal') {
      this.paypalaccount = true;
    } else if (val === 'bank') {
      this.bankaccount = true;
    }
  }

  savebankacc() {
    this.payout.bankdetails = this.bankdetail;
    this.payout.method = 'Card';
    this.commonService.post('/route/savecard', this.payout).subscribe(res => {
      this.alertService.success(res.message);
      this.payoutMethod = false;
      this.paypalaccount = false;
      this.bankaccount = false;
      this.payoutlists = true;
      this.getCarddetail();
    });
  }


  savepaypalacc() {
    this.payout.paypaldetail = this.paypaldetail;
    this.payout.method = 'paypal';
    this.commonService.post('/route/savecard', this.payout).subscribe(res => {
      this.payoutMethod = false;
      this.paypalaccount = false;
      this.payoutlists = true;
      this.alertService.success(res.message);
      this.getCarddetail();
    });
  }

  updateCard(data) {
    const updatedCard = {
      default: true,
      _id: data,
      userId: this.userData._id,

    };
    this.commonService.update('/route/updatecard', updatedCard).subscribe(res => {
      this.alertService.success(res.message);
      this.getCarddetail();
    });
  }
  deleteCard(data) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Remove?',
      accept: () => {
        this.commonService.delete('/route/deletecard/' + data).map((res) => res.json()).subscribe(res => {
          this.alertService.success(res.message);
          this.getCarddetail();
        });
      }
    });
  }
}
