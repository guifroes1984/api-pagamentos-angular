import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ResetarSenha } from '../core/model/resetar-senha';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {

  recuperarSenhaUrl: string;
  resetarSenhaUrl: string;

  constructor(private http: HttpClient) { 
    this.recuperarSenhaUrl = `${environment.apiUrl}/auth/esqueci-senha`;
    this.resetarSenhaUrl = `${environment.apiUrl}/auth/resetar-senha`;
  }

  public solicitarRecuperacao(email: string): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email });

    return firstValueFrom(
      this.http.post<void>(this.recuperarSenhaUrl, body, { headers })
    );
  }

  public resetarSenha(dto: ResetarSenha): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return firstValueFrom(
      this.http.post<void>(this.resetarSenhaUrl, dto, { headers })
    );
  }

}
