import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TooltipItem } from 'chart.js';
import { PainelControleService } from '../painel-controle.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit {

  dadosGraficoPizza: any;
  dadosGraficoLinha: any;

  dataInicio: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  dataFim: Date = new Date();

  opcoes = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'pie'>) =>
            this.formatarTooltip(tooltipItem)
        }
      }
    }
  };

  constructor(
    private painelControleService: PainelControleService,
    private decimalPipe: DecimalPipe,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.atualizarGraficos();
    this.title.setTitle('Painel de controle');
  }

  private atualizarGraficos() {
    if (this.dataInicio && this.dataFim) {
      this.configurarGraficoPizza();
      this.configurarGraficoLinha();
    }
  }

  public configurarGraficoPizza() {
    this.painelControleService.lancamentosPorCategoria(this.dataInicio, this.dataFim)
      .then(dados => {
        this.dadosGraficoPizza = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: [
                '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912'
              ]
            }
          ]
        };
      });
  }

  public configurarGraficoLinha() {
    this.painelControleService.lancamentosPorDia(this.dataInicio, this.dataFim)
      .then(dados => {
        const diasDoPeriodo = this.configurarDiasPeriodo(this.dataInicio, this.dataFim);

        const totaisReceitas = this.totaisPorCadaDia(
          dados.filter(dado => dado.tipo === 'RECEITA'),
          diasDoPeriodo
        );

        const totaisDespesas = this.totaisPorCadaDia(
          dados.filter(dado => dado.tipo === 'DESPESA'),
          diasDoPeriodo
        );

        this.dadosGraficoLinha = {
          labels: diasDoPeriodo.map(d => d.getDate() + '/' + (d.getMonth() + 1)),
          datasets: [
            { label: 'Receitas', data: totaisReceitas, borderColor: '#3366CC', fill: false },
            { label: 'Despesas', data: totaisDespesas, borderColor: '#D62B00', fill: false }
          ]
        };
      });
  }

  private configurarDiasPeriodo(inicio: Date, fim: Date): Date[] {
    const dias: Date[] = [];
    let atual = new Date(inicio);

    while (atual <= fim) {
      dias.push(new Date(atual));
      atual.setDate(atual.getDate() + 1);
    }

    return dias;
  }

  private totaisPorCadaDia(dados: any[], dias: Date[]): number[] {
    return dias.map(dia => {
      const registro = dados.find(d => {
        const dataRegistro = new Date(d.dia);
        return dataRegistro.toDateString() === dia.toDateString();
      });
      return registro ? registro.total : 0;
    });
  }

  private formatarTooltip(tooltipItem: TooltipItem<'pie'>): string {
    const dataset = tooltipItem.dataset;
    const valor = dataset.data[tooltipItem.dataIndex] as number;
    const label = dataset.label ? dataset.label + ': ' : '';
    return label + 'R$ ' + this.decimalPipe.transform(valor, '1.2-2');
  }

  public onPeriodoSelecionado() {
    if (this.dataInicio && this.dataFim) {
      this.atualizarGraficos();
    }
  }

}
