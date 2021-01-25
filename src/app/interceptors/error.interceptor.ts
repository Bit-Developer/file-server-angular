import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AlertMessage, AlertMessageList } from './../models';
import { AlertService } from './../services/';
import { map, retry, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService, private router: Router) {}
  messages: AlertMessageList = [];

  /**
   * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
   * @see HttpInterceptor
   * @param request the outgoing HTTP request
   * @param next a HTTP request handler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          if (error.status < 500 && error.status >= 400) {
            // validation error
            this.alertService.error(error.error.message); //eslint-disable-line
          } else if (error.status == 500) {
            // internal server error
            const message = error.error?.message || error.message; //eslint-disable-line
            this.alertService.error(message);
          } else {
            const message = `${error.message || error}`; //eslint-disable-line
            this.alertService.error(message);
          }
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        //window.alert(errorMessage);
        return throwError(errorMessage);
      }),
    );
  }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHttpInterceptor,
  multi: true,
};
