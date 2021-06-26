import { Injectable, OnInit } from '@angular/core';
// import { NgxSpinnerService } from "ngx-spinner";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'app/Services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private notification: NotificationService,
    private spinner: NgxSpinnerService,
  ) { }






  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('call made');
    return next.handle(request)
      .pipe(catchError((error) => {
        console.error(error);
        this.spinner.hide();
        this.notification.showNotification('top', 'right', error.error.responseStatus.errorMessage, 4)
        return throwError(error.essage);

      })
      )}
  
}