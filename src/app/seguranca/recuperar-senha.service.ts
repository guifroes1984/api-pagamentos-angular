import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {

  recuperarSenhaUrl: string;

  constructor(private http: HttpClient) { 
    this.recuperarSenhaUrl = `${environment.apiUrl}/auth/esqueci-senha`;
  }

  public solicitarRecuperacao(email: string): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email });

    return firstValueFrom(
      this.http.post<void>(this.recuperarSenhaUrl, body, { headers })
    )
  }

}
