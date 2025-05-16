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

  public pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();
    
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
      number: number, numberOfElements: number, first: boolean, last: boolean}>(`${this.lancamentosUrl}`, { params }
      )).then(response => {
      return { lancamentos: response.content, totalElements: response.totalElements, totalPages: response.totalPages, size: response.size,
        number: response.number, numberOfElements: response.numberOfElements, first: response.first, last: response.last
      };
    });
  }

  public excluir(codigo: number): Promise<void> {
  
    return firstValueFrom(
      this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`)
    );
  }

  public adicionarLancamento(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return firstValueFrom(
      this.http.post<Lancamento>(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
    )
  }

  public atualizarLancamento(lancamento: Lancamento): Promise<Lancamento> {
    
    return firstValueFrom(
      this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
    ).then(lancamentoAtualizado => {
      this.converteStringParaDatas([lancamentoAtualizado]);
      return lancamentoAtualizado;
    });
  }

  public buscarLancamentoPorCodigo(codigo: number): Promise<Lancamento> {

    return firstValueFrom(
      this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
    ).then(lancamento => {
      this.converteStringParaDatas([lancamento]);
      return lancamento;
    });
  }

  private converteStringParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
 
}
