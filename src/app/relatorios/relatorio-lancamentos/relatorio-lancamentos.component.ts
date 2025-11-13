import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio!: string;
  periodoFim!: string;
  dataFimInvalida: boolean = false;

  constructor(
    private relatorioService: RelatoriosService, 
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Relatório de lançamentos por pessoa');
  }

  public validarDatas(): void {
    if (this.periodoInicio && this.periodoFim) {
      const inicio = new Date(this.periodoInicio);
      const fim = new Date(this.periodoFim);
      this.dataFimInvalida = fim < inicio;
    } else {
      this.dataFimInvalida = false;
    }
  }

  public gerar() {
    if (this.dataFimInvalida) {
      return;
    }

    const inicio = new Date(this.periodoInicio);
    const fim = new Date(this.periodoFim);
    
    this.relatorioService.relatorioLancamentosPorPessoa(inicio, fim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      })
      .catch(erro => {
        console.error('Erro ao gerar relatório:', erro);
      });
  }

  public limpar(form: any) {
    form.resetForm(); 
    this.periodoInicio = undefined!;
    this.periodoFim = undefined!;
    this.dataFimInvalida = false;
  }
}