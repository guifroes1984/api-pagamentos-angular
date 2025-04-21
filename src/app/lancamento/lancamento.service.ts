import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');
  
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }
  
    console.log('Params:', params.toString());  // Mostra os parâmetros enviados
    console.log('URL:', `${this.lancamentosUrl}?resumo&${params.toString()}`);  // Mostra a URL completa
  
    return firstValueFrom(this.http.get<{ content: any[] }>(
      `${this.lancamentosUrl}?resumo`,
      { headers, params }
    )).then(response => response.content);
  }
  

}
