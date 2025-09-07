import { HttpClient, HttpParams } from '@angular/common/http';
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

  public lancamentosPorCategoria(dataInicio?: Date, dataFim?: Date): Promise<any[]> {
    let httpParams = new HttpParams();

    if (dataInicio) {
      httpParams = httpParams.set('dataInicio', moment(dataInicio).format('YYYY-MM-DD'));
    }

    if (dataFim) {
      httpParams = httpParams.set('dataFim', moment(dataFim).format('YYYY-MM-DD'));
    }

    return firstValueFrom(
      this.http.get<any[]>(`${this.lancamentosUrl}/estatisticas/por-categoria`, {
        params: httpParams
      })
    );
  }

  public lancamentosPorDia(dataInicio?: Date, dataFim?: Date): Promise<any[]> {
    let httpParams = new HttpParams();

    if (dataInicio) {
      httpParams = httpParams.set('dataInicio', moment(dataInicio).format('YYYY-MM-DD'));
    }

    if (dataFim) {
      httpParams = httpParams.set('dataFim', moment(dataFim).format('YYYY-MM-DD'));
    }

    return firstValueFrom(
      this.http.get<any[]>(`${this.lancamentosUrl}/estatisticas/por-dia`, {
        params: httpParams
      })
    ).then(dados => {
      this.converteStringParaDatas(dados);
      return dados;
    });
  }

  private converteStringParaDatas(dados: any[]) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
