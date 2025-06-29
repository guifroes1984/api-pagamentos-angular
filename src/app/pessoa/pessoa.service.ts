import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import * as moment from 'moment';
import { Pessoa } from '../core/model/pessoa';
import { environment } from 'src/environment/environment';
import { NomeFiltro } from '../core/model/nome-filtro';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: HttpClient) { 
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  public pesquisar(filtro: NomeFiltro): Promise<any> {
    let params = new HttpParams();
  
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
  
    return firstValueFrom(
      this.http.get(this.pessoasUrl, { params })
    );
  }

  public excluir(codigo: number): Promise<void> {
  
    return firstValueFrom(
      this.http.delete<void>(`${this.pessoasUrl}/${codigo}`)
    );
  }

  public mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return firstValueFrom(
      this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    );
  }

  public listarTodasPessoas(): Promise<any[]> {

    return firstValueFrom(
      this.http.get<any[]>(this.pessoasUrl));
  }

  public adicionarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return firstValueFrom(
      this.http.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa), { headers })
    )
  }

  public atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {

    return firstValueFrom(
      this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
    ).then(pessoaAtualizada => {
      return pessoaAtualizada;
    })
  }

  public buscarPessoaPorCodigo(codigo: number): Promise<Pessoa> {

    return firstValueFrom(
      this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
    ).then(pessoa => {
      return pessoa;
    })
  }
  
}
