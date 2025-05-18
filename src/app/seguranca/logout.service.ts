import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl: string;

  constructor(
    private http: HttpClient, 
    private auth: AuthService
  ) { 
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  public logout() {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }

}
