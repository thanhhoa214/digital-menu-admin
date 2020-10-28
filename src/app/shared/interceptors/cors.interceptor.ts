import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedReq: HttpRequest<any> = request;
    const hasOfflineRequest = !!request.headers.get('Authorization');
    if (!hasOfflineRequest) {
      let headers = request.headers.set('Content-Type', 'application/json');
      if (modifiedReq.url.includes('firebasestorage.googleapis')) {
        headers = headers.set('Access-Control-Allow-Origin', '*');
      }
      modifiedReq = request.clone({
        headers,
      });
    }
    return next.handle(modifiedReq);
  }
}
