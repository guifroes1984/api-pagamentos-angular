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
  dataFimInvalida = false;
  relatorio: any = null;
  carregando = false;
  erro: string | null = null;

  constructor(
    private relatorioService: RelatoriosService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Relatório financeiro');
    const hoje = new Date();
    this.periodoInicio = this.formatarData(new Date(hoje.getFullYear(), hoje.getMonth(), 1));
    this.periodoFim = this.formatarData(new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0));
  }

  private formatarData(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  public validarDatas(): void {
    if (this.periodoInicio && this.periodoFim) {
      this.dataFimInvalida = new Date(this.periodoFim) < new Date(this.periodoInicio);
    } else {
      this.dataFimInvalida = false;
    }
  }

  public gerar(): void {
    if (this.dataFimInvalida) return;
    this.carregando = true;
    this.relatorio = null;
    this.erro = null;

    const inicio = new Date(this.periodoInicio + 'T00:00:00');
    const fim = new Date(this.periodoFim + 'T00:00:00');

    this.relatorioService.relatorioFinanceiro(inicio, fim)
      .then(r => {
        this.relatorio = r;
        this.carregando = false;
      })
      .catch(() => {
        this.erro = 'Erro ao gerar relatório. Verifique o período e tente novamente.';
        this.carregando = false;
      });
  }

  public imprimir(): void {
    window.print();
  }

  public limpar(form: any): void {
    form.resetForm();
    this.periodoInicio = undefined!;
    this.periodoFim = undefined!;
    this.relatorio = null;
    this.erro = null;
    this.dataFimInvalida = false;
  }
}
