import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, from, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class MoneyHttp implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isPublicEndpoint =
      req.url.includes('/oauth/token') ||
      req.url.includes('/usuarios') ||
      req.url.includes('/auth/esqueci-senha') ||
      req.url.includes('/auth/resetar-senha');

    if (isPublicEndpoint) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token');

    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(

      catchError(error => {

        if (error.status === 401) {

          return from(this.auth.obterNovoAccessToken()).pipe(

            mergeMap(() => {
              const newToken = localStorage.getItem('token');

              if (!newToken) {
                this.auth.limparAccessToken();
                return throwError(() => error);
              }

              const retryReq = this.addToken(req, newToken);
              return next.handle(retryReq);
            }),

            catchError(err => {
              this.auth.limparAccessToken();
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
