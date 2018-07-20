import { Component, OnInit } from '@angular/core';

import { AlertService , ActiveUserService } from '../providers/index';

@Component({
    moduleId: module.id,
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
}) 

export class AlertComponent implements OnInit {
    message: any;

    constructor(private alertService: AlertService ) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {
             this.message = message;
            const ForThis = this;
              setTimeout(function(){ ForThis.message = false; }, 3000);
            
            });
    }

    removemessage(){
     this.message = false;
    }
}
