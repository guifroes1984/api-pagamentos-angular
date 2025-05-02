import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';

import { Lancamento } from '../core/model/lancamento';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number = 0;
  itensPorPagina: number = 5;
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
    
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', 
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', 
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return firstValueFrom(this.http.get<{content: any[], totalElements: number, totalPages: number, size: number, 
      number: number, numberOfElements: number, first: boolean, last: boolean}>(`${this.lancamentosUrl}`, { headers, params }
      )).then(response => {
      return { lancamentos: response.content, totalElements: response.totalElements, totalPages: response.totalPages, size: response.size,
        number: response.number, numberOfElements: response.numberOfElements, first: response.first, last: response.last
      };
    });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');
  
    return firstValueFrom(
      this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers })
    );
  }

  adicionarLancamento(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu')
      .set('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Lancamento>(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
    )
  }
 
}
