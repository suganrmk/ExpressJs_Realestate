import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { ActiveUserService } from '../../providers/index';


@Pipe({ name: 'price' })
export class PricePipe implements PipeTransform, OnInit {

    CurrecyList: any;

    constructor(private activeUserService: ActiveUserService) {
        this.activeUserService.getcurrency().subscribe(data => {
            this.CurrecyList = data;
        });
    }

    ngOnInit() {

    }

    transform(value: any, args) {
     return (this.CurrecyList[args] * value).toFixed(2);
    }
}





