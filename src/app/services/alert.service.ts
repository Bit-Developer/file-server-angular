import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Subject, Observable } from 'rxjs';

import { AlertMessage, AlertMessageList } from '../models';
import { LogService } from './log.service';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  alertMessage: AlertMessage = {
    type: '',
    text: '',
  };

  constructor(private router: Router, private logService: LogService) {
    // clear alert message on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string | AlertMessageList, keepAfterNavigationChange = false) {
    this.logService.log(message);
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (message instanceof Array) {
      this.subject.next(message);
    } else {
      this.alertMessage.type = 'success';
      this.alertMessage.text = message;
      this.subject.next([this.alertMessage]);
    }
  }

  error(messages: string | AlertMessageList, keepAfterNavigationChange = false) {
    this.logService.error(messages);
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    if (messages instanceof Array) {
      this.subject.next(messages);
    } else {
      this.alertMessage.type = 'error';
      this.alertMessage.text = messages;
      this.subject.next([this.alertMessage]);
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
