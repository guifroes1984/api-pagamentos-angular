import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';
import { Pessoa } from '../core/model/pessoa';

export class NomeFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  public pesquisar(filtro: NomeFiltro): Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
  
    return firstValueFrom(
      this.http.get(this.pessoasUrl, { headers, params })
    );
  }

  public excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');
  
    return firstValueFrom(
      this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
    );
  }

  public mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu')
      .set('Content-Type', 'application/json');
  
    return firstValueFrom(
      this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    );
  }

  public listarTodasPessoas(): Promise<any[]> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return firstValueFrom(
      this.http.get<any[]>(this.pessoasUrl, { headers }));
  }

  public adicionarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
       .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu')
       .set('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa), { headers })
    )
  }

  public atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return firstValueFrom(
      this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
    ).then(pessoaAtualizada => {
      return pessoaAtualizada;
    })
  }

  public buscarPessoaPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return firstValueFrom(
      this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers })
    ).then(pessoa => {
      return pessoa;
    })
  }
  
}
