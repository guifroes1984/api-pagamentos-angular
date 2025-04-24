import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(nome?: string): Promise<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');
  
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome);
    }
  
    return firstValueFrom(
      this.http.get(this.pessoasUrl, { headers, params })
    );
  }  

}
