import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap , Router } from '@angular/router';
import { AlertService, CommonService } from '../../../providers/index';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private commonService: CommonService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (params.id) {
        this.commonService.getById('/users/confirmation/' + params.id).subscribe(res => {
          console.log(res);
          if (res.success) {
            this.alertService.success(res.msg, true);
             this.router.navigate(['/login']);
          } else {
            this.alertService.error(res.msg, true);
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

}
