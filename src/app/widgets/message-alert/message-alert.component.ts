import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../services';
import { AlertMessageList } from '../../models';

@Component({
  selector: 'widget-message-alert',
  templateUrl: './message-alert.component.html',
})
export class MessageAlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  messages: AlertMessageList;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe((messages: AlertMessageList) => {
      //console.log("messages");
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
