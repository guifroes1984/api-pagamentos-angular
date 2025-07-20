import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class MoneyHttp implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isPublicEndpoint = 
      req.url.includes('/oauth/token') || 
      req.url.includes('/usuarios') ||
      req.url.includes('/auth/esqueci-senha') ||
      req.url.includes('/auth/resetar-senha');

    if (isPublicEndpoint) {
      return next.handle(req);
    }

    if (this.auth.isAccessTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');
      return from(this.auth.obterNovoAccessToken()).pipe(
        mergeMap(() => {
          const token = localStorage.getItem('token');
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(req);
        })
      );
    }

    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
