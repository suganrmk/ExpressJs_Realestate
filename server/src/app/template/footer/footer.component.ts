import { Component, OnInit } from '@angular/core';
import { AlertService, CommonService, ActiveUserService } from '../../providers/index';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currencylist: any;

  constructor(private commonService: CommonService, private activeUserService: ActiveUserService) { }

  ngOnInit() {


    this.activeUserService.getcurrency().subscribe(list => {
      this.currencylist = [];
      for (let i = 0; i < Object.keys(list).length; i++) {
        this.currencylist = [...this.currencylist, { label: Object.keys(list)[i], value: Object.keys(list)[i] }];
      }
    });


  }


  selectcurrency(event) {
    this.activeUserService.updateActiveCurrency(event.value);
  }
}
