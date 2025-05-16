import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  public login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return firstValueFrom(
      this.http.post<{ access_token: string }>(this.oauthTokenUrl, body, { headers })
    ).then(response => {
      this.armazenarToken(response.access_token);
    }).catch(error => {
      if (error.status === 400 && error.error?.error === 'invalid_grant') {
        return Promise.reject('Usuário ou senha inválida!');
      }
      return Promise.reject(error);
    });
  }

  public temPermissao(permissao: string): boolean {
    return this.jwtPayload?.authorities?.includes(permissao) ?? false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }
}
