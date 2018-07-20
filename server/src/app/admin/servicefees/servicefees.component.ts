import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/index';

@Component({
  selector: 'app-servicefees',
  templateUrl: './servicefees.component.html',
  styleUrls: ['./servicefees.component.css']
})
export class ServicefeesComponent implements OnInit {
  site: any = {};
  pagetitle: string;
  currenylist: any;
  constructor(private CommonService: CommonService) { }

  ngOnInit() {

    this.getservicefees();
    this.pagetitle = 'Service Fees';

    this.currenylist = [
      { label: 'Select Currency', value: null },
      {label: 'INR', value:'INR'}
    ];

 


  }

  getservicefees() {
    this.CommonService.getAll('/route/getservicefees').subscribe(res => {
      console.log(res)
      if ( res.servicefees) {
        this.site = res.servicefees;
      }
    });
  }

  updateservicefees({ data, error }) {
    this.CommonService.update('/route/updateservicefees', this.site).subscribe(res => {
      console.log(res);
    });
  }

}
