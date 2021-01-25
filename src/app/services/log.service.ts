import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logging_level = environment.logging_level; // 0: no logging, 1: error, 2: warn, 3: info, 4: debug, 5: log

  log(message: any) {
    if (this.logging_level > 4) {
      console.log(message); // eslint-disable-line no-console
    }
  }

  debug(message: any) {
    if (this.logging_level > 3) {
      console.debug(message); // eslint-disable-line no-console, no-restricted-syntax
    }
  }

  info(message: any) {
    if (this.logging_level > 2) {
      console.info(message); // eslint-disable-line no-console, no-restricted-syntax
    }
  }

  warn(message: any) {
    if (this.logging_level > 1) {
      console.warn(message); // eslint-disable-line no-console
    }
  }

  error(message: any) {
    if (this.logging_level > 0) {
      console.error(message); // eslint-disable-line no-console
    }
  }
}
