import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../providers/index';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  userData: any = {};
  messages: any[];
  messageContent: any;
  messageform: any = {};
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    const userID = JSON.parse(localStorage.getItem('currentUser'));
    this.userData.id = userID._id;
    this.userData.inboxtype = 'travelling';
    this.getMessage();
  }

  inboxtype(type) {
    this.userData.inboxtype = type;
    this.getMessage();
  }

  getMessage() {
    console.log(this.userData)
    this.commonService.search('/route/message', this.userData).subscribe(res => {
      console.log(res);
      this.messages = res.message;
    });
  }

  onSubmitForm({ value, valid }, message) {
    const reply = value;
    reply.to = message.from._id;
    reply.from = this.userData.id;
    this.commonService.create('/route/reply', reply).subscribe(res => {
      console.log(res);
    });
  }
  statusChange(Mesgstatus, id) {
    if (Mesgstatus === 'read') {
      const status = {
        status: 'unread',
        _id: id
      };
      this.commonService.update('/route/statuschange', status).subscribe(res => this.getMessage());
    }
  }
  openMessage(ev) {
    this.messageContent = ev;
    if (this.messageContent.status === 'unread') {
      const status = {
        status: 'read',
        _id: this.messageContent._id
      };
      this.commonService.update('/route/statuschange', status).subscribe(res => this.getMessage());
    }
  }
  closeMessage() {
    this.messageContent = null;
  }
  deleteMessage(id, index) {
    this.commonService.delete('/route/deletemessage/' + id).subscribe(res => {
      this.messages = this.messages.filter((data, i) => i !== index);
    });
  }
}
