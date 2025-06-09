import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PainelControleService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) { 
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  public lancamentosPorCategoria(): Promise<Array<any>> {
    return firstValueFrom(
      this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
    );
  }

  public lancamentosPorDia(): Promise<Array<any>> {
    return firstValueFrom(this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`))
      .then(dados => {
        this.converteStringParaDatas(dados);
        return dados;
    });
  }

  private converteStringParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
