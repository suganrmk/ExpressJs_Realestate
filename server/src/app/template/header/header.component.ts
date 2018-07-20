// ./angular-client/src/app/header.component.ts
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css' ]
})
export class HeaderComponent implements OnInit {
  products: any[] = [];
  CitySearch:any;
  headertype: string;
  constructor() { }

  ngOnInit(): void {
  
  }

  getAddress(ev) {
  }
  getFormattedAddress(ev) {
  //  this.searchCata.Location.country = ev.country;
    console.log(ev)
  }

}
