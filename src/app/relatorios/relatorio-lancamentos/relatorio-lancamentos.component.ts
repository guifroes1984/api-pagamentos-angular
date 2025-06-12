import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio!: Date;
  periodoFim!: Date;

  constructor(
    private relatorioService: RelatoriosService, 
    private title:            Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Relatório de lançamentos por pessoa');
  }

  public gerar() {
    this.relatorioService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }

  public limpar(form: any) {
    form.resetForm(); 
    this.periodoInicio = undefined!;
    this.periodoFim = undefined!;
  }

}
