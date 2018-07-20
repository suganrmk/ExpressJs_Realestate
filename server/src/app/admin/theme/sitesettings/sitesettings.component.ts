import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../providers/index';

@Component({
  selector: 'app-sitesettings',
  templateUrl: './sitesettings.component.html',
  styleUrls: ['./sitesettings.component.css']
})
export class SitesettingsComponent implements OnInit {
  site: any = {};
  pagetitle: string;
  constructor(private CommonService: CommonService) { }

  ngOnInit() {

    this.getsettings();
    this.pagetitle = 'Site Settings';

  }

  getsettings() {
    this.CommonService.getAll('/route/getsitesettings').subscribe(res => {
      this.site = res.settings;
    });
  }

  savesettings({data, error}) {
    this.CommonService.update('/route/updatesitesettings', this.site).subscribe(res => {
      console.log(res);
    });
  }

  onBasicUpload(ev) {
    const uploadedImg = JSON.parse(ev.xhr.response).file[0];
    this.site.logo = uploadedImg;
    console.log(this.site)
  }

}
