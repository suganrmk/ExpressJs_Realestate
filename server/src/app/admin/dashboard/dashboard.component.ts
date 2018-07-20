import { Component, OnInit , OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy {

  constructor() { }

  ngOnInit() {
    document.body.classList.add('adminpage');
  }

  ngOnDestroy() {
    document.body.classList.remove('adminpage');
  }

}