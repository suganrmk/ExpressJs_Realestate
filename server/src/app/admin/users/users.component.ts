import { Component, OnInit } from '@angular/core';

import { UserService } from '../provider/index';
import { CommonService } from '../../providers/index';


@Component({
    moduleId: module.id,
    templateUrl: './users.component.html'
})

export class UsersComponent implements OnInit {
    currentUser: any;
    users: any[] = [];
    pagetitle: any;

    constructor(private userService: UserService , private CommonServices: CommonService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.pagetitle = 'User Login';
    }

    onDelete(_id: string) {
        this.CommonServices.delete('/users/' + _id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        this.CommonServices.getAll('/users/alluser').subscribe(users => { this.users = users; console.log(users) });
    }
}
