import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { TooltipItem } from 'chart.js';

import { PainelControleService } from '../painel-controle.service';

@Component({
  selector: 'app-painel-controle',
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent implements OnInit {

  dadosGraficoPizza: any;
  dadosGraficoLinha: any;

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
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  public configurarGraficoPizza() {
    this.painelControleService.lancamentosPorCategoria()
      .then(dados => {
        this.dadosGraficoPizza = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

  public configurarGraficoLinha() {
    this.painelControleService.lancamentosPorDia()
      .then(dados => {
        const diasDoMes = this.configurarDiasMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);
        this.dadosGraficoLinha = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC',
              fill: false
            },
            {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00',
              fill: false
            }
          ]
        };
      })
  }

  private totaisPorCadaDiaMes(dados: any[], diasDoMes: number[]): number[] {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();
    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }

  private formatarTooltip(tooltipItem: TooltipItem<'pie'>): string {
    const dataset = tooltipItem.dataset;
    const valor = dataset.data[tooltipItem.dataIndex] as number;
    const label = dataset.label ? dataset.label + ': ' : '';

    return label + 'R$ ' + this.decimalPipe.transform(valor, '1.2-2');
  }

}
