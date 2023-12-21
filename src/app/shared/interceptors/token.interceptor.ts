import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private dataService: DataService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let changedReq = null;

    if (this.dataService.activeToken !== '') {
      changedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.dataService.activeToken}`,
        },
      });
    } else {
      changedReq = request;
    }

    return next.handle(changedReq);
  }
}
