import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request sent ', req);

    // Append auth header to all requests
    const authRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });

    // execute the http request
    return next.handle(authRequest);
  }
}
