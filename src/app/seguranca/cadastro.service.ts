import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../core/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  cadastroUrl: string;

  constructor(private  http: HttpClient) { 
    this.cadastroUrl = `${environment.apiUrl}/usuarios`;
  }

  public cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return firstValueFrom(
      this.http.post<any>(this.cadastroUrl, JSON.stringify(usuario), { headers })
    );
  }

}
