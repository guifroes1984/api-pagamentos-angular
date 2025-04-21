import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date | null;
  dataVencimentoFim: Date | null;
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

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', 
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', 
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'))
    }

    return firstValueFrom(this.http.get<{ content: any[] }>(
      `${this.lancamentosUrl}?resumo`,
      { headers, params }
    )).then(response => response.content);
  }
  

}
