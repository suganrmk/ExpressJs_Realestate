import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService , AlertService } from '../../../providers/index';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  reset: any = {};
  token: any;

  paswordErrors: any;
  constructor(private route: ActivatedRoute,
     private commonService: CommonService,
     private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.token = params['id']);
  }

  resetsubmit({ value, error }) {
 
    if (value.confirmpass !== value.password) {
      this.paswordErrors = true;
    } else {
      this.paswordErrors = false;
      value.token = this.token;
      console.log(value)
      this.commonService.post('/users/updatepass', value).subscribe(res => {
        this.alertService.success(res.msg , true);
        this.router.navigate(['/login']);
      });
    }
  }

}
