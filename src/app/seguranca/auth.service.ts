import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  public login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return firstValueFrom(
      this.http.post<{ access_token: string }>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
    ).then(response => {
      this.armazenarToken(response.access_token);
    }).catch(error => {
      if (error.status === 400 && error.error?.error === 'invalid_grant') {
        return Promise.reject('Usuário ou senha inválida!');
      }
      return Promise.reject(error);
    });
  }

  public obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const refreshToken = localStorage.getItem('refresh_token');
    const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;

    return firstValueFrom(
      this.http.post<{ access_token: string, refresh_token: string }>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
    ).then(response => {
      this.armazenarToken(response.access_token);
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      }
      console.log('Novo access token criado!');
    }).catch(response => {
      console.error('Erro ao renovar token', response);
      return Promise.resolve();
    });
  }

  public limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  public isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public temPermissao(permissao: string): boolean {
    return this.jwtPayload?.authorities?.includes(permissao) ?? false;
  }

  public temQualquerPermissao(roles: string[]): boolean {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
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

  public isAdmin(): boolean {
    return this.jwtPayload?.nome === 'Administrador';
  }

  public esqueciSenha(email: string) {
    return this.http.post<void>(`${environment.apiUrl}/auth/esqueci-senha`, { email });
  }

}
