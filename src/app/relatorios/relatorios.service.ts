import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environment/environment';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  public relatorioLancamentosPorPessoa(inicio: Date, fim: Date): Promise<Blob> {
    const params = new HttpParams()
      .set('inicio', moment(inicio).format('YYYY-MM-DD'))
      .set('fim', moment(fim).format('YYYY-MM-DD'));

    return firstValueFrom(this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, {
      params,
      responseType: 'blob'
    })) as Promise<Blob>;
  }

}
