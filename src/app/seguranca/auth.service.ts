import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(
    private http: HttpClient
  ) { }

  public login(usuario: string, senha: string): Promise<void> {
    
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<void>(this.oauthTokenUrl, body, { headers })
    .toPromise()
    .then(response => {
      console.log(response);
    })
    .catch(response => {
    console.log(response);
    });
  }

}
