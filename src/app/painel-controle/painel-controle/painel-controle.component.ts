import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

  dataInicioControl = new FormControl('');
  dataFimControl = new FormControl('');

  opcoesPizza = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => this.formatarTooltip(tooltipItem)
        }
      }
    }
  };

  opcoesLinha = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private painelControleService: PainelControleService,
    private decimalPipe: DecimalPipe,
    private title: Title
  ) { }

  ngOnInit(): void {
    // COMEÇA VAZIO - sem datas pré-definidas
    this.dataInicioControl.setValue('');
    this.dataFimControl.setValue('');

    this.dataInicioControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.atualizarGraficos();
    });

    this.dataFimControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.atualizarGraficos();
    });

    // Gráficos começam em branco
    this.dadosGraficoPizza = null;
    this.dadosGraficoLinha = null;
    
    this.title.setTitle('Painel de controle');
  }

  public limparDatas(): void {
    this.dataInicioControl.setValue('');
    this.dataFimControl.setValue('');
    this.atualizarGraficos();
  }

  private atualizarGraficos() {
    const dataInicioStr = this.dataInicioControl.value;
    const dataFimStr = this.dataFimControl.value;
    
    if (!dataInicioStr || !dataFimStr) {
      this.dadosGraficoPizza = null;
      this.dadosGraficoLinha = null;
      return;
    }

    const dataInicio = this.converterStringParaDate(dataInicioStr);
    const dataFim = this.converterStringParaDate(dataFimStr);
    
    if (dataInicio && dataFim) {
      this.configurarGraficoPizza(dataInicio, dataFim);
      this.configurarGraficoLinha(dataInicio, dataFim);
    }
  }

  public configurarGraficoPizza(dataInicio: Date, dataFim: Date) {
    this.painelControleService.lancamentosPorCategoria(dataInicio, dataFim)
      .then(dados => {
        this.dadosGraficoPizza = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: [
                '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                '#DD4477', '#3366CC', '#DC3912', '#66AA00', '#B82E2E',
                '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
                '#E67300', '#8B0707', '#329262', '#3B3EAC'
              ],
              borderColor: '#fff',
              borderWidth: 2
            }
          ]
        };
      });
  }

  public configurarGraficoLinha(dataInicio: Date, dataFim: Date) {
    this.painelControleService.lancamentosPorDia(dataInicio, dataFim)
      .then(dados => {
        const diasDoPeriodo = this.configurarDiasPeriodo(dataInicio, dataFim);

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
            { 
              label: 'Receitas', 
              data: totaisReceitas, 
              borderColor: '#28a745', 
              backgroundColor: 'rgba(40, 167, 69, 0.1)',
              tension: 0.4,
              fill: true
            },
            { 
              label: 'Despesas', 
              data: totaisDespesas, 
              borderColor: '#dc3545', 
              backgroundColor: 'rgba(220, 53, 69, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        };
      });
  }

  public formatarDataParaInput(data: Date): string {
    if (!data) return '';
    return data.toISOString().split('T')[0];
  }

  private converterStringParaDate(dataString: string | null): Date | null {
    if (!dataString) return null;
    try {
      return new Date(dataString + 'T00:00:00');
    } catch {
      return null;
    }
  }

  public bloquearDigitacao(event: KeyboardEvent): void {
    const teclasPermitidas = [
      'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'Enter', 'Escape', 'Backspace', 'Delete'
    ];
    
    if (event.ctrlKey || event.metaKey) {
      return;
    }
    
    if (!teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
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

  private formatarTooltip(tooltipItem: any): string {
    const valor = tooltipItem.parsed;
    const label = tooltipItem.label ? tooltipItem.label + ': ' : '';
    return label + 'R$ ' + this.decimalPipe.transform(valor, '1.2-2');
  }
}